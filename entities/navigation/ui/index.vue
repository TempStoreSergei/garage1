<template>
  <div class="navigation-bar">
    <div class="navigation-bar__buttons navigation-bar__buttons_left">
      <a-button v-if="navigationStore.showPrevious" type="primary" @click="handlePrevious" class="navigation-bar__button" size="large" :disabled="navigationStore.previousDisabled" shape="circle" :icon="h(LeftOutlined)" />
      <a-button type="dashed" @click="toggleCloseModal" danger class="navigation-bar__button" size="large">
        Очистить
      </a-button>
    </div>
    <div class="navigation-bar__buttons">
      <a-button v-if="navigationStore.showNext" type="primary" @click="handleNext" class="navigation-bar__button" size="large" shape="circle" :disabled="navigationStore.nextDisabled" :icon="h(RightOutlined)" />
    </div>
    <a-modal :open="navigationStore.showCloseModal" title="Подтвердить Закрытие" @ok="handleClose" @cancel="toggleCloseModal">
      <p>Вы уверены, что хотите закрыть сессию?</p>
    </a-modal>
  </div>
</template>

<script setup>
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { useNavigationStore } from '../models';
import { useStepsStore } from '../../steps/models';
import { useRouter } from 'vue-router';

const navigationStore = useNavigationStore();
const stepsStore = useStepsStore();
const router = useRouter();

const handleNext = () => {
  const currentStep = stepsStore.getCurrentStep();
  console.log(currentStep);
  navigationStore.handleNext(router);
  const nextStep = currentStep + 1;
  console.log(nextStep);
  const config = navigationStore.getNavigationConfig(nextStep);
  navigationStore.setNavigationConfig(config);
  stepsStore.setCurrentStep(nextStep);
};

const handlePrevious = () => {
  const currentStep = stepsStore.getCurrentStep();
  console.log(currentStep);
  navigationStore.handlePrevious(router);
  const previousStep = currentStep - 1;
  console.log(previousStep);
  const config = navigationStore.getNavigationConfig(previousStep);
  navigationStore.setNavigationConfig(config);
  stepsStore.setCurrentStep(previousStep);
};

const handleClose = () => {
  navigationStore.handleClose(router);
};

const toggleCloseModal = () => {
  navigationStore.toggleCloseModal();
};

</script>

<style lang="scss">
@import './styles.module.scss';
</style>
