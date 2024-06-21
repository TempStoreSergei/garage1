<template>
  <div class="box">
    <div class="logo">
      <img src="@/shared/assets/car.svg" alt="Car Logo" />
    </div>
    <h1>Введите госномер</h1>
    <a-form
      :model="formState"
      @submit.prevent="handleSubmit"
      layout="vertical"
      ref="formRef"
      class="register-car-form"
    >
      <a-row align="start">
        <a-col :span="11">
          <a-form-item
            label="Российский"
            name="russianCarNumber"
            :rules="russianCarNumberRules"
          >
            <a-input
              v-model:value="formState.russianCarNumber"
              @focus="onFocus('russian')"
              @blur="onBlur('russian')"
              allow-clear
              placeholder="А123ВС045"
              size="large"
              :disabled="disableRussianInput"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2" class="line-box">
          <div class="or-text">или</div>
          <div class="line"></div>
        </a-col>
        <a-col :span="11">
          <a-form-item
            label="Иностранный"
            name="foreignCarNumber"
            :rules="foreignCarNumberRules"
          >
            <a-input
              v-model:value="formState.foreignCarNumber"
              @focus="onFocus('foreign')"
              @blur="onBlur('foreign')"
              placeholder="АК6891-5"
              size="large"
              allow-clear
              :disabled="disableForeignInput"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCheckStore } from "../../../entities/check/models";
import { useNavigationStore } from "../../../entities/navigation/models";

// Reactive form state
const formState = reactive({
  russianCarNumber: "",
  foreignCarNumber: "",
});

const checkStore = useCheckStore();
const navigatiionStore = useNavigationStore();


// Refs for input disabling
const disableRussianInput = ref(false);
const disableForeignInput = ref(false);

// Router instance
const router = useRouter();

// Form validation rules
const russianCarNumberRules = [
  { required: true, message: "Пожалуйста, введите номер автомобиля в России!" },
  {
    pattern: /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu,
    message:
      "Пожалуйста, введите правильный номер автомобиля в России (например, А123ВС45).",
    trigger: 'change'
  },
];

const foreignCarNumberRules = [
  {
    required: true,
    message: "Пожалуйста, введите иностранный номер автомобиля!",
  },
  {
    min: 6,
    max: 10,
    message: "Длина номера должна быть от 6 до 10 символов",
    trigger: 'blur'
  },
];

const handleSubmit = () => {
  // Handle form submission
};

// Function to call when input is correct
const handleNextAvailable = () => {
  navigatiionStore.handleNextAvalible();
};

const handleNextDisable = () => {
  navigatiionStore.handleNextDisable();
};
// Initialize form state from store
onMounted(() => {
  if (checkStore.carNumber) {
    if (checkStore.carNumberType === 'russian') {
      formState.russianCarNumber = checkStore.carNumber;
      disableForeignInput.value = true;
    } else if (checkStore.carNumberType === 'foreign') {
      formState.foreignCarNumber = checkStore.carNumber;
      disableRussianInput.value = true;
    }
  }
});

// Watchers to update store and disable inputs
watch(
  () => formState.russianCarNumber,
  (newVal) => {
    if (newVal) {
      checkStore.setCarNumber(newVal);
      checkStore.setCarNumberType('russian');
      validateInput(newVal, 'russian');
    }
    disableForeignInput.value = !!newVal;
  }
);

watch(
  () => formState.foreignCarNumber,
  (newVal) => {
    if (newVal) {
      checkStore.setCarNumber(newVal);
      checkStore.setCarNumberType('foreign');
      validateInput(newVal, 'foreign');
    }
    disableRussianInput.value = !!newVal;
  }
);

// Focus and blur handlers
const onFocus = (field) => {
  if (field === "russian") {
    disableForeignInput.value = true;
  } else if (field === "foreign") {
    disableRussianInput.value = true;
  }
};

const onBlur = (field) => {
  setTimeout(() => {
    if (field === "russian" && !formState.russianCarNumber) {
      disableForeignInput.value = false;
    } else if (field === "foreign" && !formState.foreignCarNumber) {
      disableRussianInput.value = false;
    }
  }, 100); // Timeout to wait for any possible value change before deciding
};

const validateInput = (value, type) => {
  let isValid = false;
  if (type === 'russian') {
    isValid = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/iu.test(value) && value.length >= 6 && value.length <= 10;
  } else if (type === 'foreign') {
    isValid = value.length >= 6 && value.length <= 10;
  }
  if (isValid) {
    handleNextAvailable();
  } else {
    handleNextDisable();
  }
};
</script>

<style scoped>
.logo img {
  width: 150px;
}

h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.line-box {
  margin-top: 50px;
}

.register-car-form {
  width: 100%;
}

.or-text {
  text-align: center;
  color: #888;
  font-weight: bold;
}

.line {
  border-top: 1px solid #ccc;
  margin: 0 auto;
  width: 100%;
}
</style>
