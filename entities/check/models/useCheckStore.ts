import { defineStore } from 'pinia';

export const useCheckStore = defineStore('check', {
  state: () => ({
    carNumber: '',
    carBrand: '',
    carrier: '',
    services: [],
    withFoam: false,
  }),
  actions: {
    updateCarDetails({ carNumber, carBrand, carrier }) {
      this.carNumber = carNumber;
      this.carBrand = carBrand;
      this.carrier = carrier;
    },
    toggleFoam() {
      this.withFoam = !this.withFoam;
    },
    addService(category, items) {
      this.services.push({ category, items });
    },
    clearServices() {
      this.services = [];
    },
  },
});
