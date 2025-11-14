import type {
  FormAnswers,
  FormStep,
  FormQuestion,
} from "~/types/intake-form/form";
import { calculatePaceValues } from "~/utils/intake-form/calculations";

/**
 * Interpolates dynamic text by replacing placeholders with form values
 * @param text - The text containing placeholders like {{goalWeight}} or {{currentWeight-goalWeight}}
 * @param formAnswers - The current form answers object
 * @returns The interpolated text with placeholders replaced
 */
export function interpolateText(
  text: string,
  formAnswers: FormAnswers,
): string {
  if (!text) return text;

  // Replace placeholders like {{goalWeight}} or {{currentWeight-goalWeight}} with actual values
  return text.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
    // Handle special calculated values
    if (
      expression === "weeklyLossRange" ||
      expression === "timeToGoal" ||
      expression === "nrOfWeeks"
    ) {
      const currentWeight = formAnswers.weight;
      const goalWeight = formAnswers.goalWeight;

      if (currentWeight && goalWeight) {
        const paceValues = calculatePaceValues(currentWeight, goalWeight);
        if (expression === "nrOfWeeks") {
          return paceValues.timeToGoal;
        }
        return paceValues[expression as keyof typeof paceValues];
      }
      return match; // Keep placeholder if values missing
    }

    // Check if it's a simple variable or a mathematical expression
    if (
      expression.includes("-") ||
      expression.includes("+") ||
      expression.includes("*") ||
      expression.includes("/")
    ) {
      // Handle mathematical expressions
      try {
        // Replace variables in the expression with their values
        let evaluatedExpression = expression;

        // Find all variable names in the expression
        const variables = expression.match(/\b\w+\b/g) || [];

        for (const variable of variables) {
          const value = formAnswers[variable];
          if (value !== null && value !== undefined) {
            // Replace the variable with its numeric value
            const regex = new RegExp(`\\b${variable}\\b`, "g");
            evaluatedExpression = evaluatedExpression.replace(
              regex,
              value.toString(),
            );
          } else {
            // If any variable is missing, return the original placeholder
            return match;
          }
        }

        // Evaluate the mathematical expression
        const result = eval(evaluatedExpression);
        return Math.abs(result).toString(); // Return absolute value as string
      } catch (error) {
        // If evaluation fails, return the original placeholder
        return match;
      }
    } else {
      // Handle simple variable replacement
      const value = formAnswers[expression];

      // Handle different value types
      if (value === null || value === undefined) {
        return match; // Keep the placeholder if value doesn't exist
      }

      if (typeof value === "number") {
        return value.toString();
      }

      if (typeof value === "string") {
        return value;
      }

      if (Array.isArray(value)) {
        return value.join(", ");
      }

      // For other types, convert to string
      return String(value);
    }
  });
}

/**
 * Interpolates all dynamic text in a form step
 * @param step - The form step object
 * @param formAnswers - The current form answers
 * @returns A new step object with interpolated text
 */
export function interpolateFormStep(
  step: FormStep,
  formAnswers: FormAnswers,
): FormStep {
  const interpolatedStep = { ...step };

  // Interpolate step-level text
  if (step.title) {
    interpolatedStep.title = interpolateText(step.title, formAnswers);
  }
  if (step.dynamicTitle) {
    interpolatedStep.title = interpolateText(step.dynamicTitle, formAnswers);
  }
  if (step.heading) {
    interpolatedStep.heading = interpolateText(step.heading, formAnswers);
  }
  if (step.dynamicHeading) {
    interpolatedStep.heading = interpolateText(
      step.dynamicHeading,
      formAnswers,
    );
  }
  if (step.subtext) {
    interpolatedStep.subtext = interpolateText(step.subtext, formAnswers);
  }
  if (step.dynamicSubtext) {
    interpolatedStep.subtext = interpolateText(
      step.dynamicSubtext,
      formAnswers,
    );
  }

  // Interpolate question-level text
  if (step.questions) {
    interpolatedStep.questions = step.questions.map(
      (question: FormQuestion) => {
        const interpolatedQuestion = { ...question };

        if ("dynamicText" in question && question.dynamicText) {
          interpolatedQuestion.question = interpolateText(
            question.dynamicText,
            formAnswers,
          );
        }

        // Handle dynamicSubtext for PERFECT questions
        if ("dynamicSubtext" in question && question.dynamicSubtext) {
          (interpolatedQuestion as any).dynamicSubtext = interpolateText(
            question.dynamicSubtext,
            formAnswers,
          );
        }

        return interpolatedQuestion;
      },
    );
  }

  return interpolatedStep;
}
