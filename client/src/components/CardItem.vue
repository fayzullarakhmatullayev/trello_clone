<template>
  <div class="max-w-[272px] min-w-[272px] flex flex-col flex-1 card">
    <div class="card__header">
      <Textarea autoResize rows="1" v-model="card.name" />
      <button class="btn max-w-[28px]">
        <img src="@/assets/icons/menu.svg" alt="menu" />
      </button>
    </div>
    <div class="flex-1 overflow-y-auto list">
      <draggable
        :list="card.tasks"
        group="cards"
        tag="ul"
        class="flex flex-col gap-3 overflow-y-auto card__list"
        itemKey="id"
      >
        <template #item="{ element: task }">
          <li class="card__list--item">{{ task.text }} {{ task.id }}</li>
        </template>
      </draggable>
    </div>
    <div class="card__footer">
      <button class="btn w-full">
        <img src="@/assets/icons/plus.svg" alt="plus" />
        <span>Добавить карточку</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import Textarea from 'primevue/textarea'

defineProps<{ card: any }>()
</script>

<style lang="scss">
.card {
  height: fit-content;
  &__footer {
    padding: 5px 10px;
    background-color: #101204;
    border-radius: 0 0 12px 12px;
  }
  &__header {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #101204;
    border-radius: 12px 12px 0 0;
    gap: 16px;

    textarea {
      background: transparent;
      border-radius: 5px;
      resize: none;
      padding: 3px 5px;
      font-size: 14px;
      width: 100%;
      color: #abb6c1;
      &:focus {
        outline: none;
        background-color: rgba($color: #fff, $alpha: 0.35);
        box-shadow: inset 0 0 0 1px var(--ds-border-focused, #388bff);
      }
    }
  }
}

.btn {
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px;
  transition: all 0.3s;
  font-size: 12px;
  img {
    color: #abb6c1;
    width: 16px;
    height: 16px;
  }
  &:active,
  &:hover {
    background-color: #a6c5e229;
  }
}
.card__list {
  background-color: #101204;
  padding: 0 10px;
  &--item {
    background-color: #22272b;
    border-radius: 6px;
    padding: 8px;
    font-size: 12px;
  }
}
.list {
  max-height: 70vh;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #323b37;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #101204;
  }
}
</style>
