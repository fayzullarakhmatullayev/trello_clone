<template>
  <div class="flex flex-col h-screen">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/MainLayout.vue'
import { computed } from 'vue'
export default {
  components: {
    MainLayout,
    AuthLayout
  },
  setup() {
    const layout = computed(() => 'main-layout')

    return {
      layout
    }
  }
}
</script>
