<template>
  <div class="card__list--item" ref="cardListRef">
    <template v-if="!isFormOpen">
      <Button
        type="button"
        icon="pi pi-ellipsis-v"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        class="btn max-w-[24px] h-[24px] !rounded-full card__list--btn"
      />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
        <template #item="{ item, props }">
          <a class="flex align-items-center" v-bind="props.action" @click="clickHandler(item)">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
      <div class="card__list--text" v-html="task.text" />
    </template>
    <div class="w-full p-1" v-else>
      <CardForm
        rows="1"
        btnTitle="Сохранить"
        :textAreaValue="task.text"
        @close-form="isFormOpen = false"
        @submit-handler="submitHandler"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Menu from 'primevue/menu'
import Button from 'primevue/button'
import CardForm from '@/components/card/CardForm.vue'

import type { ITask } from '@/services/dto/task.dto'
const props = defineProps<{ task: ITask }>()

const cardListRef = ref()
const isFormOpen = ref(false)

const menu = ref()
const items = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    name: 'edit'
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    name: 'delete'
  }
])

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const clickHandler = (item: any) => {
  if (item.name === 'edit') {
    isFormOpen.value = true
  }
}
const submitHandler = (text: string) => {
  props.task.text = text
}
</script>

<style lang="scss">
.card__list {
  &--text {
    width: 100%;
    background: transparent;
    padding: 8px;
    outline: 1px solid transparent;
    transition: all 0.3s ease;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      outline: 1px solid #60a5fa;
    }
  }
  &--item {
    background-color: #22272b;
    border-radius: 6px;
    position: relative;

    font-size: 12px;
    user-select: none !important;

    .p-button .p-button-label {
      display: none;
    }

    &:hover {
      .card__list--btn {
        opacity: 1;
      }
    }
  }
  &--btn {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s ease;
    background: rgba($color: #101204, $alpha: 0.8);
    &:hover {
      background: rgba($color: #101204, $alpha: 0.8) !important;
    }
  }
}
.p-menu {
  padding: 4px;
  border-radius: 6px;
  min-width: 100px;

  .p-menu-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    width: 100%;
  }

  .p-menuitem {
    width: 100%;
    margin: 0 !important;
  }
  .p-menuitem-link {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    cursor: pointer;
    padding: 4px;
    cursor: pointer;
    background: transparent;
    border-radius: 4px;
    transition: all 0.3s ease;
    line-height: 1.1;
    font-size: 12px;
  }
}
</style>
