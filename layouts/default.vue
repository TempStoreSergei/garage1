<template>
  <div class="layout-container">
    <Steps class="global-steps" />
    <main class="panel">
      <section class="content">
        <Check />
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="slide">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
      <NavigationBar />
    </main>
  </div>
</template>

<script setup>
import { Check } from "@/entities/check";
import { NavigationBar } from "@/entities/navigation";
import { Steps } from "@/entities/steps";
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #e2e2e2, #c6c6c6);
  min-height: 100vh;
}

.global-steps {
  margin-bottom: 40px;
  max-width: 900px;
}

.content {
  width: 100%;
  display: flex;
  background: white;
  padding: 40px;
  height: 480px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.slide-leave-active {
  animation: zoomOut 0.5s;
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

</style>
