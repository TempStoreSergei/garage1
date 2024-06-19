<template>
  <div class="check">
    <svg class="check__line" width="210px" viewBox="0 0 210 5" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 210,0" fill="none" stroke="#e2e3de" stroke-dasharray="3 3" stroke-width="10"/>
    </svg>

    <div class="check__info">
      <span>Заявка на услуги моечного комплекса ООО «Агропромтранс»</span>
    </div>
    <h4 class="check__title">Предварительный талон</h4>
    <ul class="check__list">
      <li class="check__item"><span class="check__label">Номер автомобиля</span><span class="check__value">{{ checkStore.carNumber || 'unknown' }}</span></li>
      <li class="check__item"><span class="check__label">Марка автомобиля</span><span class="check__value">{{ checkStore.carBrand || 'unknown' }}</span></li>
      <li class="check__item"><span class="check__label">Перевозчик</span><span class="check__value">{{ checkStore.carrier || 'unknown' }}</span></li>
      <li class="check__item"><span class="check__label">Услуги:</span><span v-if="checkStore.services.length === 0" class="check__value">{{ 'unknown' }}</span></li>
    </ul>

    <a-collapse accordion v-if="checkStore.services.length > 0" class="check__services">
      <a-collapse-panel v-for="(service, index) in checkStore.services" :key="index" :header="service.category" class="check__service">
        <ul class="check__service-list">
          <li v-for="(item, i) in service.items" :key="i" class="check__service-item">{{ item }}</li>
        </ul>
      </a-collapse-panel>
    </a-collapse>

    <ul class="check__list">
      <li class="check__item"><span class="check__label">С пеной</span><span class="check__value">{{ checkStore.withFoam ? 'Да' : 'Нет' }}</span></li>
    </ul>

  </div>
</template>

<script setup>
import { useCheckStore } from '../models';

const checkStore = useCheckStore();

</script>

<style lang="scss">
 @import 'styles.module.scss'
</style>
