<template>
  <div class="box">
    <h2>Выберите услугу автомойки</h2>

    <div class="select-service">
      <a-tabs @change="handleTabChange">
        <a-tab-pane key="1" tab="Дезинфекция">
          <div class="tab-content" ref="tabContent1">
            <div class="service-cards">
              <div
                v-for="service in disinfection"
                :key="service.id"
                :class="[
                  'service-card',
                  {selected: checkStore.disenfactionServise.id === service.id },
                ]"
                @click="selectServiceDisenfection(service)"
              >
                <div class="card-title">{{ service.namedesinfect }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Мойка">
          <div class="tab-content" ref="tabContent2">
            <div class="service-cards">
              <div
                v-for="service in carWash"
                :key="service.id"
                :class="[
                  'service-card',
                  { selected: checkStore.washServise.id === service.id },
                ]"
                @click="selectServiceWash(service)"
              >
                <div class="card-title">{{ service.nameservice }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div class="action">
        <a-button
          type="default"
          @click="handlePrevious"
          class="nav-button"
          size="large"
          shape="round"
          :icon="h(ArrowUpOutlined)"
          :disabled="currentArrivedState.top"
        />
        <a-button
          type="default"
          @click="handleNext"
          class="nav-button"
          size="large"
          shape="round"
          :icon="h(ArrowDownOutlined)"
          :disabled="currentArrivedState.bottom"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScroll } from "@vueuse/core";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
import { useCheckStore } from "../../../entities/check/models";
import { API } from "~/shared/api";

const checkStore = useCheckStore();

const carWash = ref([]);
const disinfection = ref([]);

const tabContent1 = ref<HTMLElement | null>(null);
const tabContent2 = ref<HTMLElement | null>(null);
const activeTab = ref<string>("1");

const scrollY1 = ref(0);
const arrivedState1 = ref({ top: true, bottom: false });
const scrollY2 = ref(0);
const arrivedState2 = ref({ top: true, bottom: false });

const currentArrivedState = computed(() =>
  activeTab.value === "1" ? arrivedState1.value : arrivedState2.value
);

const selectServiceWash = (service) => {
  checkStore.addServiceWash({
    id: service.id,
    label: service.nameservice,
  });
};
const selectServiceDisenfection = (service) => {
  checkStore.addServiceDisenfaction({
    id: service.id,
    label: service.namedesinfect,
  });
};

const initializeScroll = () => {
  if (activeTab.value === "1" && tabContent1.value) {
    const { y, arrivedState } = useScroll(tabContent1);
    scrollY1.value = y;
    arrivedState1.value = arrivedState;
  } else if (activeTab.value === "2" && tabContent2.value) {
    const { y, arrivedState } = useScroll(tabContent2);
    scrollY2.value = y;
    arrivedState2.value = arrivedState;
  }
};

const handleTabChange = (key: string) => {
  activeTab.value = key;
  initializeScroll();
};

onMounted(() => {
  initializeScroll();
  fetchServiceList();
});

const fetchServiceList = async () => {
  const privelage = checkStore.carrier === "АГРОПРОМТРАНС";
  if (privelage) {
    const { data: wahingList } = await API.get("get_our_service");
    const { data: disinfectList } = await API.get("get_our_desinfect");
    carWash.value = wahingList;
    disinfection.value = disinfectList;
  } else {
    const { data: wahingList } = await API.get("get_enemy_service");
    const { data: disinfectList } = await API.get("get_enemy_desinfect");
    carWash.value = wahingList;
    disinfection.value = disinfectList;
  }
};

const handlePrevious = () => {
  if (
    activeTab.value === "1" &&
    tabContent1.value &&
    !arrivedState1.value.top
  ) {
    tabContent1.value.scrollTo({
      top: tabContent1.value.scrollTop - tabContent1.value.clientHeight,
      behavior: "smooth",
    });
  } else if (
    activeTab.value === "2" &&
    tabContent2.value &&
    !arrivedState2.value.top
  ) {
    tabContent2.value.scrollTo({
      top: tabContent2.value.scrollTop - tabContent2.value.clientHeight,
      behavior: "smooth",
    });
  }
};

const handleNext = () => {
  if (
    activeTab.value === "1" &&
    tabContent1.value &&
    !arrivedState1.value.bottom
  ) {
    tabContent1.value.scrollTo({
      top: tabContent1.value.scrollTop + tabContent1.value.clientHeight,
      behavior: "smooth",
    });
  } else if (
    activeTab.value === "2" &&
    tabContent2.value &&
    !arrivedState2.value.bottom
  ) {
    tabContent2.value.scrollTo({
      top: tabContent2.value.scrollTop + tabContent2.value.clientHeight,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
}

.action {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.select-service {
  display: flex;
  gap: 20px;
  align-items: center;
}

.category {
  margin-bottom: 20px;
}

.tab-content {
  max-height: 240px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.service-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.service-card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
}

.service-card.selected {
  background-color: #e6f7ff;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.tab-content::-webkit-scrollbar {
  display: none;
}
</style>
