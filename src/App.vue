<template>
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <app-modal />
</template>

<script setup>
import AppModal from './components/AuthComponent.vue'
import AppHeader from '@/components/HeaderComponent.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores'

const store = useAuthStore()

onMounted(() => {
  store.initLogin()
})
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
