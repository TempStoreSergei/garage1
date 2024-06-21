<template>
  <a-steps :current="1" class="global-steps" :items="steps"></a-steps>
</template>

<script setup>
import { useStepsStore } from '../models';
import { steps } from '../lib';

const stepsStore = useStepsStore();

// Ensure step is a reactive computed property
import { computed } from 'vue';
const step = computed(() => stepsStore.currentStep);
</script>

<style lang="scss">
@import './styles.module.scss';
</style>
