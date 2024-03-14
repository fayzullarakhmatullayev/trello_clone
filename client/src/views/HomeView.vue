<template>
  <div class="wrapper flex flex-col">
    <draggable :list="cardItems" class="flex gap-4 flex-1" itemKey="id">
      <template #item="{ element: card }">
        <CardItem :card="card" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

import CardItem from '@/components/CardItem.vue'
import { cards } from '@/dummy'

const cardItems = ref(cards)
</script>

<style lang="scss">
.lists {
  @apply flex gap-6;
}
.wrapper {
  padding: 20px;
  user-select: none;
  flex: 1;
}
</style>
