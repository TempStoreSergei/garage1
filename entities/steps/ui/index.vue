<template>
    <a-steps :current="stepsStore.currentStep" class="global-steps">
      <a-step v-for="(index, step) in steps" :key="step" :title="index" />
    </a-steps>
  </template>
  
  <script setup>
  import { useStepsStore } from '../models';
  import { steps } from '../lib';
  
  const stepsStore = useStepsStore();
 
  </script>
  
  <style lang="scss">
    @import './styles.module.scss';
  </style>
  