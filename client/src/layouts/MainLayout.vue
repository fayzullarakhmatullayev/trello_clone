<template>
  <div class="flex-1 flex flex-col overflow-y-hidden overflow-x-auto w-screen">
    <AppHeader />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang="scss">
.header {
  background-color: #1d2125;
  padding: 16px;
}
</style>
