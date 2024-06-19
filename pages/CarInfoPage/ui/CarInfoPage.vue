<template>
  <div class="box">
    <a-form
      :model="formState"
      @submit.prevent="handleSubmit"
      layout="vertical"
      class="add-car-info-form"
    >
      <a-form-item
        label="Номер машины"
        name="carNumber"
        :rules="[ { required: true, message: 'Please input car number!' } ]"
      >
        <a-input v-model:value="formState.carNumber" disabled size="large" />
      </a-form-item>

      <a-form-item
        label="Название машины"
        name="carName"
        :rules="[ { required: true, message: 'Please input car name!' } ]"
      >
        <a-input v-model:value="formState.carName" placeholder="Название машины" size="large" />
      </a-form-item>

      <a-form-item
        label="Выберите перевозчика"
        name="carrier"
        :rules="[ { required: true, message: 'Please select a carrier!' } ]"
      >
        <a-select v-model:value="formState.carrier" placeholder="Выберите перевозчика" size="large">
          <a-select-option value="carrier1">Carrier 1</a-select-option>
          <a-select-option value="carrier2">Carrier 2</a-select-option>
          <a-select-option value="carrier3">Carrier 3</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();
const nextRoute = ref();
const previousRoute = ref();

const formState = reactive({
  carNumber: route.query.carNumber || '',
  carName: '',
  carrier: ''
});

const handleSubmit = () => {
  if (formState.carName && formState.carrier) {
    message.success('Car information added successfully!');
    router.push('/select-service');
  } else {
    message.error('Please fill in all required fields!');
  }
};

// Update the next and previous routes in the layout
nextRoute.value = '/select-service';
previousRoute.value = '/register-car';
</script>

<style>
.add-car-info-form {
  width: 100%;
}
</style>
