
import { defineStore } from 'pinia';

export const useCheckStore = defineStore('check', {
  state: () => ({
    carNumber: '',
    carBrand: '',
    carNumberType: '',
    carrier: {
      label: "",
      id: null
    },
    washServise: {
      label: "",
      id: null
    },
    disenfactionServise: {
      label: "",
      id: null
    },
    withFoam: true,
  }),
  actions: {
    setCarNumber(carNumber) {
      this.carNumber = carNumber;
    },
    setCarNumberType(carNumberType) {
      this.carNumberType = carNumberType;
    },
    setCarBrand(carBrand) {
      this.carBrand = carBrand;
    },
    setCarrier(carrier) {
      console.log(carrier)
      this.carrier.id = carrier.id;
      this.carrier.label = carrier.label;
    },
    toggleFoam() {
      this.withFoam = !this.withFoam;
    },
    addServiceWash(wash) {
      this.washServise.id = wash.id;
      this.washServise.label = wash.label;
    },
    addServiceDisenfaction(disenfaction) {
      this.disenfactionServise.id = disenfaction.id;
      this.disenfactionServise.label = disenfaction.label;
    },
    clearServices() {
      this.services = [];
    },
  },
});
