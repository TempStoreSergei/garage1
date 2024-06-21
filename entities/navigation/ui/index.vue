<template>
  <div class="navigation-bar">
    <div class="navigation-bar__buttons navigation-bar__buttons_left">
      <transition name="navigation-bar__button">
        <a-button
          v-if="navigationStore.showPrevious"
          type="primary"
          @click="handlePrevious"
          class="navigation-bar__button"
          size="large"
          :disabled="navigationStore.previousDisabled"
          shape="circle"
          :icon="h(LeftOutlined)"
        />
      </transition>
      <a-button
        type="dashed"
        @click="toggleCloseModal"
        danger
        class="navigation-bar__button"
        size="large"
      >
        Отмена
      </a-button>
    </div>
    <div class="navigation-bar__buttons">
      <transition name="navigation-bar__button">
        <a-button
          v-if="navigationStore.showNext"
          type="primary"
          @click="handleNext"
          class="navigation-bar__button"
          size="large"
          shape="circle"
          :disabled="navigationStore.nextDisabled"
          :icon="h(RightOutlined)"
        />
      </transition>
      <a-button
        type="primary"
        @click="printCheck"
        class="navigation-bar__button"
        size="large"
      >
        Печать
      </a-button>
    </div>
    <a-modal
      :open="navigationStore.showCloseModal"
      title="Подтвердить отмену"
      @ok="handleClose"
      @cancel="toggleCloseModal"
    >
      <p>Вы уверены, что хотите отменить заявку?</p>
    </a-modal>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { useNavigationStore } from "../models"; 
import { useStepsStore } from "../../steps/models";
import { useCheckStore } from "../../check/models";
import { API } from "~/shared/api";

const navigationStore = useNavigationStore();
const stepsStore = useStepsStore();
const store = useCheckStore();
const router = useRouter();

const step = computed(() => stepsStore.currentStep);

const handleNext = async () => {
  try {
    const currentStep = stepsStore.getCurrentStep();
    await navigationStore.handleNext(router);
    await updateStep(currentStep + 1);
  } catch (error) {
    console.error("Error handling next step:", error);
  }
};

const printCheck = async () => {
  try {
    API.post("print_checks", {
      usernumber: store.carNumber,
      userauto: store.carBrand,
      perevoz: store.carrier.label,
      wash_service: {
        id: store.washServise.id,
        pena: true,
      },
      disinfect_service: store.disenfactionServise.id,
    });
  } catch (error) {
    console.error("Error handling pring chek:", error);
  }
};

const handlePrevious = async () => {
  try {
    const currentStep = stepsStore.getCurrentStep();
    await navigationStore.handlePrevious(router);
    await updateStep(currentStep - 1);
  } catch (error) {
    console.error("Error handling previous step:", error);
  }
};

const handleClose = () => {
  try {
    navigationStore.handleClose(router);
  } catch (error) {
    console.error("Error handling close:", error);
  }
};

const toggleCloseModal = () => {
  try {
    navigationStore.toggleCloseModal();
  } catch (error) {
    console.error("Error toggling close modal:", error);
  }
};

const updateStep = async (step) => {
  try {
    const config = await navigationStore.getNavigationConfig(step);
    await navigationStore.setNavigationConfig(config);
    stepsStore.setCurrentStep(step);
  } catch (error) {
    console.error("Error updating step:", error);
  }
};
</script>

<style lang="scss">
@import "./styles.module.scss";
</style>
