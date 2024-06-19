<template>
  <div class="box">
    <div class="logo">
      <img src="@/shared/assets/car.svg" alt="Car Logo" />
    </div>
    <h1>Введите госномер</h1>
    <a-form :model="formState" @submit.prevent="handleSubmit" layout="vertical" class="register-car-form">
      <a-row align="middle">
        <a-col :span="11">
          <a-form-item label="Российский" name="russianCarNumber" :rules="russianCarNumberRules">
            <a-input
              v-model:value="formState.russianCarNumber"
              @focus="onFocus('russian')"
              @blur="onBlur('russian')"
              allow-clear
              placeholder="Введите номер автомобиля в России"
              size="large"
              :disabled="disableRussianInput"
            />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <div class="or-text">или</div>
          <div class="line"></div>
        </a-col>
        <a-col :span="11">
          <a-form-item label="Иностранный" name="foreignCarNumber" :rules="foreignCarNumberRules">
            <a-input
              v-model:value="formState.foreignCarNumber"
              @focus="onFocus('foreign')"
              @blur="onBlur('foreign')"
              placeholder="Введите иностранный номер автомобиля"
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
import { message } from 'ant-design-vue';

const formState = reactive({
  russianCarNumber: '',
  foreignCarNumber: ''
});

const disableRussianInput = ref(false);
const disableForeignInput = ref(false);

const router = useRouter();

const russianCarNumberRules = [
  { required: true, message: 'Пожалуйста, введите номер автомобиля в России!' },
  {
    pattern: /^[А-Я]{1}\d{3}[А-Я]{2}\d{2,3}$/,
    message: 'Пожалуйста, введите правильный номер автомобиля в России (например, A123BC45).'
  }
];

const foreignCarNumberRules = [
  { required: true, message: 'Пожалуйста, введите иностранный номер автомобиля!' }
];

const handleSubmit = () => {

};

// Watchers to disable inputs
watch(() => formState.russianCarNumber, (newVal) => {
  disableForeignInput.value = !!newVal;
});

watch(() => formState.foreignCarNumber, (newVal) => {
  disableRussianInput.value = !!newVal;
});

// Focus and blur handlers
const onFocus = (field) => {
  if (field === 'russian') {
    disableForeignInput.value = true;
  } else if (field === 'foreign') {
    disableRussianInput.value = true;
  }
};

const onBlur = (field) => {
  setTimeout(() => {
    if (field === 'russian' && !formState.russianCarNumber) {
      disableForeignInput.value = false;
    } else if (field === 'foreign' && !formState.foreignCarNumber) {
      disableRussianInput.value = false;
    }
  }, 100); // Timeout to wait for any possible value change before deciding
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
