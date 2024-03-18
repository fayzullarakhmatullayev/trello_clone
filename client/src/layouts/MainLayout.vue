<template>
  <div class="flex-1 flex flex-col overflow-y-hidden overflow-x-auto">
    <AppHeader />

    <slot />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
</script>
