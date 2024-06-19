import { defineStore } from 'pinia';
import { navigationConfigs } from '../lib';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    showPrevious: false,
    showNext: true,
    previousDisabled: true,
    nextDisabled: false,
    showCloseModal: false,
    nextRoute: 'add-car-info',
    previousRoute: '/',
    closeRoute: '/',
  }),
  actions: {
    setNavigationConfig(config) {
      console.log(config);
      this.showPrevious = config.showPrevious ?? false;
      this.showNext = config.showNext ?? true;
      this.previousDisabled = config.previousDisabled ?? true;
      this.nextDisabled = config.nextDisabled ?? false;
      this.nextRoute = config.nextRoute ?? '';
      this.previousRoute = config.previousRoute ?? '';
    },
    handleNext(router) {
      router.push(this.nextRoute);
    },
    getNavigationConfig(step: number) {
      return navigationConfigs[step];
    },
    handlePrevious(router) {
      router.push(this.previousRoute);
    },
    handleClose(router) {
      this.$reset();
      router.push(this.closeRoute);
    },
    toggleCloseModal() {
      this.showCloseModal = !this.showCloseModal;
    },
  },
});
