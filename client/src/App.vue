<template>
  <div class="flex flex-col h-screen">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    MainLayout,
    AuthLayout
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
