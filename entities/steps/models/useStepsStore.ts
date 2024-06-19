import { defineStore } from 'pinia';

export const useStepsStore = defineStore('steps', {
  state: () => ({
    currentStep: 0,
  }),
  actions: {
    setCurrentStep(step: number) {
      this.currentStep = step;
    },
    getCurrentStep() {
      return this.currentStep;
    },
  },
});
