<template>
  <article class="check">
    <svg
      class="check__line"
      width="210px"
      viewBox="0 0 210 5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 210,0"
        fill="none"
        stroke="#e2e3de"
        stroke-dasharray="3 3"
        stroke-width="10"
      />
    </svg>
    <div class="check__info">
      <span>Заявка на услуги моечного комплекса ООО «Агропромтранс»</span>
    </div>
    <h4 class="check__title">Предварительный заявка</h4>
    <a-skeleton v-if="!isStoreNotEmpty" />
    <ul class="check__list">
      <li v-show="checkStore.carNumber" class="check__item" id="carNumber">
        <span class="check__label">Номер автомобиля</span>
        <span class="check__value">{{ checkStore.carNumber }}</span>
      </li>
      <li v-show="checkStore.carBrand" class="check__item" id="carBrand">
        <span class="check__label">Бренд автомобиля</span>
        <span class="check__value">{{ checkStore.carBrand }}</span>
      </li>
      <li v-show="checkStore.carrier.label" class="check__item" id="carrier">
        <span class="check__label">Перевозчик</span>
        <span class="check__value">{{ checkStore.carrier.label }}</span>
      </li>
      <li v-show="checkStore.washServise.label" class="check__wash" id="washServise">
        <div class="check__item">
          <span class="check__label">Мойка</span>
          <a-tooltip>
            <template #title>{{ checkStore.washServise.label }}</template>
            <span class="check__value check__value--ellipsis">{{ checkStore.washServise.label }}</span>
          </a-tooltip>
        </div>
        <span v-if="checkStore.withFoam" class="check__wash-text">Мойка будет с пеной</span>
      </li>
      <li v-show="checkStore.disenfactionServise.label" class="check__item" id="disenfactionServise">
        <span class="check__label">Дезинфекция</span>
        <a-tooltip>
          <template #title>{{ checkStore.disenfactionServise.label }}</template>
          <span class="check__value check__value--ellipsis">{{ checkStore.disenfactionServise.label }}</span>
        </a-tooltip>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { useCheckStore } from "../models";
import { watch, onMounted, computed } from 'vue';
import { gsap } from 'gsap';

const checkStore = useCheckStore();

const animateElement = (selector) => {
  const element = document.getElementById(selector);
  if (element) {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
  }
};

const isStoreNotEmpty = computed(() => {
  const carrier = Object.keys(checkStore.carrier).length === 0;
  const wash = Object.keys(checkStore.washServise).length === 0;
  const disinfaction = Object.keys(checkStore.disenfactionServise).length === 0;
  return checkStore.carNumber || checkStore.carBrand || !carrier || !wash || !disinfaction;
});

const elementsToWatch = [
  { key: 'carNumber', id: 'carNumber' },
  { key: 'carBrand', id: 'carBrand' },
  { key: 'carrier.label', id: 'carrier' },
  { key: 'washServise.label', id: 'washServise' },
  { key: 'disenfactionServise.label', id: 'disenfactionServise' }
];

onMounted(() => {
  elementsToWatch.forEach(({ key, id }) => {
    watch(
      () => key.split('.').reduce((obj, prop) => obj[prop], checkStore),
      (newValue, oldValue) => {
        if ((newValue && !oldValue) || (!newValue && oldValue)) {
          animateElement(id);
        }
      }
    );
  });
});
</script>

<style lang="scss">
@import "styles.module.scss";
</style>
