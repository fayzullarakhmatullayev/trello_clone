<template>
  <div class="card__footer">
    <button class="btn w-full">
      <PlusIcon />
      <span>Добавить карточку</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import PlusIcon from '@/components/icons/PlusIcon.vue'
</script>

<style lang="scss">
.card {
  &__footer {
    padding: 5px 10px;
    background-color: #101204;
    border-radius: 0 0 12px 12px;
  }
}
</style>
