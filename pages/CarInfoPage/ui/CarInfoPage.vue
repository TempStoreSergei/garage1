<template>
  <div class="box">
    <a-form :model="formState" layout="vertical" ref="formRef">
      <a-form-item
        v-if="disableCarName"
        label="Название бренда"
        name="carName"
        :rules="CarBranRules"
      >
        <a-input
          v-model:value="formState.carName"
          @input="handlerChangeName"
          placeholder="Название бренда"
          size="large"
        />
      </a-form-item>
      <a-form-item
        label="Выберите перевозчика"
        name="carrier"
        :rules="[{ required: true, message: 'Please select a carrier!' }]"
      >
        <a-select
          v-model:value="formState.carrier"
          show-search
          placeholder="Выберите перевозчика"
          size="large"
          :field-names="{ label: 'nameperevoz', value: 'id' }"
          :options="carrierOptions"
          :filter-option="filterOption"
          @change="handlerChangeCarrier({id: $event, label: carrierOptions[$event - 1].nameperevoz })"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useCheckStore } from "../../../entities/check/models";
import { API } from "~/shared/api";
import { message } from 'ant-design-vue';
import { useNavigationStore } from "../../../entities/navigation/models";
const navigatiionStore = useNavigationStore();

const checkStore = useCheckStore();
const formRef = ref(null);

const formState = reactive({
  carName: checkStore.carBrand.label,
  carrier: checkStore.carrier.label,
});

const disableCarName = ref(false);

const handlerChangeName = (inputEvent) => {
  checkStore.setCarBrand(inputEvent.target.value);
};

const handlerChangeCarrier = (data) => {
  checkStore.setCarrier(data);
};

const handleSubmit = () => {
  // Handle form submission
};


const handleNextAvailable = () => {
  navigatiionStore.handleNextAvalible();
};

const handleNextDisable = () => {
  navigatiionStore.handleNextDisable();
};

const CarBranRules = [
  {
    required: true,
    message: "Пожалуйста, введите марку автомобиля!",
  },
  {
    max: 15,
    message: "Назваине бренда должно состоять из менее 15 символов",
    trigger: 'blur'
  },
];

const carrierOptions = ref([]);

const filterOption = (input, option) => {
  return option.nameperevoz.toLowerCase().includes(input.toLowerCase());
};

const fetchCarCarrier = async () => {
  try {
    const { data } = await API.get("get_all_perevoz");
    carrierOptions.value = data;
  } catch (error) {
    console.error("Error fetching carrier options:", error);
  }
};

const fetchCarDetails = async (carNumber) => {
  try {
    const { data } = await API.post("get_user_auto", { numberauto: carNumber });
    if (data.fail !== "yes") {
      disableCarName.value = false;
      message.success("Номер автомобиля найден в базе! Информация подставиться автоматический");
      const infoCarrier = {
        label: data.nameperevoz,
        id: data.id
      }
      console.log(infoCarrier)
      formState.carrier = data.nameperevoz;
      checkStore.setCarBrand(data.nameauto);
      handlerChangeCarrier(infoCarrier);
    } else {
      disableCarName.value = true;
      formState.carName = "";
      formState.carrier = "";
      checkStore.setCarBrand("");
      handlerChangeCarrier({});
    }
  } catch (error) {
    console.error("Error fetching car details:", error);
  }
};

onMounted(() => {
  fetchCarCarrier();
  fetchCarDetails(checkStore.carNumber);
});

// Watchers to validate form fields
watch(
  () => [formState.carName, formState.carrier],
  async () => {
    try {
      const valid = await formRef.value.validate();
      if(valid) {
        handleNextAvailable();
      } else {
        handleNextDisable();
      }

    } catch (error) {
      console.error("Validation failed:", error);
    }
  },
);
</script>
