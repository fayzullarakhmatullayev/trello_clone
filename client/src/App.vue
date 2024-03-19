<template>
  <div class="flex flex-col h-screen">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
  <Toast />
</template>

<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'

export default {
  components: {
    MainLayout,
    AuthLayout,
    Toast
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => `${route.meta.layout || 'auth'}-layout`)

    return {
      layout
    }
  }
}
</script>
