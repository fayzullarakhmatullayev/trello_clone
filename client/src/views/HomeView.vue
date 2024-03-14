<template>
  <div class="wrapper flex items-start gap-4">
    <draggable :list="cardItems" class="flex gap-4 flex-1" itemKey="id">
      <template #item="{ element: card }">
        <Card :card="card" />
      </template>
    </draggable>
    <button class="add__more">
      <PlusIcon />
      <span>Добавьте еще одну колонку</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

import Card from '@/components/card/Card.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
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
  width: fit-content;
}
.add__more {
  background-color: rgba($color: #ffffff, $alpha: 0.1);
  width: 272px;
  cursor: pointer;
  font-size: 12px;
  padding: 10px 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    color: #101204;
    svg {
      fill: #101204;
    }
  }
  svg {
    max-width: 20px;
    width: 100%;
    height: 20px;
  }
}
</style>
