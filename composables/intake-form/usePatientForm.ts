import { ref, computed, reactive, watch, nextTick, type Ref } from "vue";
import {
  useCurrentFormStep,
  useFormSteps,
} from "~/composables/intake-form/useFormState";
// We now import the types from our central types file
import type {
  FormStep,
  FormAnswers,
  FormQuestion,
  QuizConfig,
} from "~/types/intake-form/form";
// We import the quiz configuration instead of just form steps
import {
  glp1WeightLossQuiz,
  getProgressStepForFormStep,
} from "~/data/intake-form/quizConfigs";
// Import the text interpolation utility
import { interpolateFormStep } from "~/utils/intake-form/textInterpolation";
// Import form persistence
import { useFormPersistence } from "~/composables/intake-form/useFormPersistence";
// Import the new conditional rendering rules engine
import { shouldRenderStep } from "~/lib/quiz/conditionEvaluator";

// This is the main composable function that encapsulates all form logic
export function usePatientForm(quizConfigRef: Ref<QuizConfig | null> | string = "glp1-weight-loss") {
  // --- STATE MANAGEMENT ---
  const currentProgressMarker = useCurrentFormStep();
  const currentStepIndex = useState("currentStepIndex", () => 0); // Shared state for step index
  const progressSteps = useFormSteps();
  const submissionError = ref<string | null>(null);
  const isLoading = ref(false);

  // --- QUIZ CONFIGURATION ---
  // Handle both reactive quiz config and string quiz ID
  const quizConfig = computed(() => {
    if (typeof quizConfigRef === 'string') {
      // Fallback to hardcoded quiz if string is provided
      return glp1WeightLossQuiz;
    }
    return quizConfigRef.value || glp1WeightLossQuiz;
  });

  // --- PERSISTENCE ---
  // Get quizId from config - use a ref that updates when quizConfig changes
  const currentQuizId = computed(() => quizConfig.value?.id || "glp1-weight-loss");
  
  // Create persistence instance - we'll need to recreate it when quizId changes
  // For now, use the initial quizId
  const persistence = useFormPersistence(currentQuizId.value);
  
  const {
    initializeFormData,
    restoreClientState,
    setupAutoSave,
    clearLocalStorage,
    lastCompletedStep,
    isStepComplete: isStepCompletePersistence,
  } = persistence;

  // --- FORM DATA ---
  const allStepsMaster = computed(() => quizConfig.value.steps);

  // --- INITIALIZATION ---
  // Create default form answers
  const defaultFormAnswers: FormAnswers = {};
  // Initialize form answers when quiz config is available
  watch(quizConfig, (newConfig) => {
    if (newConfig && newConfig.steps) {
      newConfig.steps
        .flatMap((step) => step.questions)
        .forEach((q) => {
          if (!defaultFormAnswers[q.id]) {
            defaultFormAnswers[q.id] = q.type === "MULTISELECT" ? [] : null;
          }
        });
    }
  }, { immediate: true });

  // Initialize form data with persistence
  const { formAnswers: initialFormAnswers, startingStep } = initializeFormData(
    allStepsMaster.value,
    defaultFormAnswers,
  );

  const formAnswers: FormAnswers = reactive(initialFormAnswers);
  // Only set the shared state if it hasn't been initialized yet
  if (currentStepIndex.value === 0) {
    currentStepIndex.value = startingStep;
  }

  // Setup auto-save and restore client state (only on client)
  if (process.client) {
    setupAutoSave(formAnswers, currentStepIndex);

    // Restore client state after initial render to avoid hydration mismatch
    nextTick(async () => {
      restoreClientState(allStepsMaster.value, formAnswers, currentStepIndex);
    });
  }

  // --- COMPUTED PROPERTIES ---
  const visibleSteps = computed(() => {
    return allStepsMaster.value.filter((step) => {
      if (step.renderCondition) {
        // Check if it's a function (legacy) or data object (new)
        if (typeof step.renderCondition === 'function') {
          // Legacy function-based conditional rendering
          return step.renderCondition(formAnswers);
        } else {
          // New data-driven conditional rendering using rules engine
          return shouldRenderStep(step.renderCondition, formAnswers);
        }
      }
      return true;
    });
  });

  const currentStepData = computed(() => {
    const step = visibleSteps.value[currentStepIndex.value];

    if (!step) return null;

    // Interpolate dynamic text with current form answers
    return interpolateFormStep(step, formAnswers);
  });

  const isLastStep = computed(
    () => currentStepIndex.value === visibleSteps.value.length - 1,
  );

  // Use the step completion logic from persistence, but add validation
  const isStepComplete = computed(() => {
    if (!currentStepData.value) {
      return false;
    }

    // First check basic completion using persistence logic
    const persistenceComplete = isStepCompletePersistence(
      currentStepData.value,
      formAnswers,
    );

    if (!persistenceComplete) {
      return false;
    }

    // Then check validation rules if they exist
    const validationComplete = currentStepData.value.questions.every(
      (question) => {
        if (question.type === "MARKETING") {
          return true;
        }
        if (!question.required) {
          return true;
        }

        const answer = formAnswers[question.id];

        // If question has validation rules, validate against them
        if ("validation" in question && question.validation) {
          // The validation utilities were removed, so this part of the logic is now
          // effectively a placeholder or will need to be re-implemented if specific
          // validation is required. For now, we'll assume it's valid if no rules.
          return true;
        }

        return true;
      },
    );

    return validationComplete;
  });

  // --- API SUBMISSION WRAPPER ---
  const handleFormSubmission = () => {
    // The submitPatientForm utility was removed, so this function is now a placeholder.
    // In a real scenario, you would call an API here to submit the form data.
    // Example: axios.post('/api/submit-form', formAnswers);
  };

  // --- NAVIGATION FUNCTIONS ---
  const nextStep = async () => {
    if (!isStepComplete.value) {
      return;
    }

    if (isLastStep.value) {
      // Set loading state immediately to disable button
      isLoading.value = true;

      try {
        // Store quiz-specific completion state and form data
        if (process.client) {
          // Store the completed form answers
          localStorage.setItem(`quiz_${quizConfig.value.id}_completed_data`, JSON.stringify(formAnswers));
          
          // Set finished flag for this specific quiz config
          localStorage.setItem(`quiz_${quizConfig.value.id}_completed`, 'true');
          
          // Store completion timestamp
          localStorage.setItem(`quiz_${quizConfig.value.id}_completed_at`, new Date().toISOString());
        }
        
        // Navigate to checkout with productId from route
        const route = useRoute();
        const productId = route.query.productId as string;
        const checkoutUrl = productId ? `/checkout?productId=${productId}` : '/checkout';
        await navigateTo(checkoutUrl);
      } catch (error) {
        submissionError.value = "Failed to complete form. Please try again.";
      } finally {
        isLoading.value = false;
      }
    } else {
      currentStepIndex.value++;
    }
  };

  const prevStep = () => {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--;
    }
  };

  // --- WATCHER TO SYNC PROGRESS BAR ---
  watch(
    currentStepIndex,
    (newIndex) => {
      const currentId = visibleSteps.value[newIndex]?.id;
      if (!currentId) return;

      // Use the quiz configuration to determine progress step
      const progressStepId = getProgressStepForFormStep(
        quizConfig.value,
        currentId,
      );
      if (!progressStepId) return;

      // Find the index of the progress step in the quiz configuration
      const progressIndex = quizConfig.value.progressSteps.findIndex(
        (step) => step.id === progressStepId,
      );

      if (progressIndex !== -1) {
        currentProgressMarker.value = progressIndex;
      }
    },
    { immediate: true },
  );

  // --- WATCHER TO SCROLL TO TOP ON STEP CHANGE ---
  watch(
    currentStepIndex,
    () => {
      // Scroll to top when step changes (only on client)
      if (process.client) {
        nextTick(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    }
  );

  // --- WATCHER TO HANDLE CONDITIONAL STEPS ---
  // This ensures currentStepIndex stays valid when steps are conditionally hidden
  watch(visibleSteps, (newVisibleSteps) => {
    // If current step index is out of bounds, reset to 0
    if (currentStepIndex.value >= newVisibleSteps.length) {
      currentStepIndex.value = 0;
    }
  });

  // --- WATCHER TO UPDATE PROGRESS STEPS ---
  // Now dynamically updates based on quiz configuration
  watch(
    quizConfig,
    (newQuizConfig) => {
      progressSteps.value = newQuizConfig.progressSteps.map((step) => ({
        name: step.name,
        description: step.description,
        color: step.color,
      }));
    },
    { immediate: true, deep: true },
  );

  // --- UTILITY FUNCTIONS ---
  const clearFormAndRestart = () => {
    clearLocalStorage();
    
    // Clear quiz-specific completion flags
    if (process.client) {
    localStorage.removeItem(`quiz_${quizConfig.value.id}_completed`);
    localStorage.removeItem(`quiz_${quizConfig.value.id}_completed_data`);
    localStorage.removeItem(`quiz_${quizConfig.value.id}_completed_at`);
    }
    
    // Reset form answers to defaults
    Object.keys(formAnswers).forEach((key) => {
      formAnswers[key] = Array.isArray(defaultFormAnswers[key]) ? [] : null;
    });
    currentStepIndex.value = 0;
  };


  // --- QUIZ CONFIGURATION GETTERS ---
  const getCurrentProgressStep = computed(() => {
    const currentId = visibleSteps.value[currentStepIndex.value]?.id;
    if (!currentId) return null;

    const progressStepId = getProgressStepForFormStep(
      quizConfig.value,
      currentId,
    );
    return quizConfig.value.progressSteps.find(
      (step) => step.id === progressStepId,
    );
  });

  const getQuizMetadata = computed(() => quizConfig.value.metadata);

  // --- QUIZ COMPLETION UTILITIES ---
  // Function to check if a specific quiz has been completed
  const isQuizCompleted = (quizIdToCheck: string): boolean => {
    if (!process.client) return false;
    return localStorage.getItem(`quiz_${quizIdToCheck}_completed`) === 'true';
  };

  // Function to get all completed quiz IDs
  const getCompletedQuizIds = (): string[] => {
    if (!process.client) return [];
    
    const completedQuizzes: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('quiz_') && key.endsWith('_completed')) {
        const quizId = key.replace('quiz_', '').replace('_completed', '');
        completedQuizzes.push(quizId);
      }
    }
    return completedQuizzes;
  };

  // Function to get completed quiz data
  const getCompletedQuizData = (quizIdToCheck: string): FormAnswers | null => {
    if (!process.client) return null;
    
    try {
      const data = localStorage.getItem(`quiz_${quizIdToCheck}_completed_data`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn(`Failed to parse completed quiz data for ${quizIdToCheck}:`, error);
      return null;
    }
  };

  // Function to get completion timestamp
  const getQuizCompletionTimestamp = (quizIdToCheck: string): string | null => {
    if (!process.client) return null;
    return localStorage.getItem(`quiz_${quizIdToCheck}_completed_at`);
  };

  return {
    currentQuestionIndex: currentStepIndex,
    formAnswers,
    currentStepData,
    isLastQuestion: isLastStep,
    isStepComplete,
    nextStep,
    prevStep,
    submissionError,
    isLoading,
    clearFormAndRestart,
    lastCompletedStep,
    currentProgressMarker,
    isQuizCompleted,
    getCompletedQuizIds,
    getCompletedQuizData,
    getQuizCompletionTimestamp,
    quizId: computed(() => quizConfig.value.id),
  };
}
