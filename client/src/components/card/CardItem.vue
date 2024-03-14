<template>
  <div class="card__list--item" ref="cardListRef">
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      class="btn max-w-[24px] h-[24px] !rounded-full card__list--btn"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    <Textarea
      rows="1"
      autoResize
      class="resize-none"
      v-model="task.text"
      :disabled="isDisabled"
    ></Textarea>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import Textarea from 'primevue/textarea'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
defineProps<{ task: any }>()

const isDisabled = ref(true)
const cardListRef = ref()
const textareaEl = ref<HTMLTextAreaElement | null>(null)

const menu = ref()
const items = ref([
  {
    label: 'Refresh',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Export',
    icon: 'pi pi-upload'
  }
])

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const clickHandler = () => {
  isDisabled.value = false
  nextTick(() => {
    textareaEl.value?.focus()
  })
}

onMounted(() => {
  textareaEl.value = cardListRef.value.querySelector('.p-inputtextarea')
})
</script>

<style lang="scss">
.card__list {
  &--item {
    background-color: #22272b;
    border-radius: 6px;
    position: relative;

    font-size: 12px;
    user-select: none !important;

    textarea {
      width: 100%;
      background: transparent;
      padding: 8px;
      &:disabled {
        pointer-events: none;
      }
    }

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
  background: #101204;
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
  .p-menuitem-content {
    &:hover .p-menuitem-text {
      color: #101204 !important;
    }
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
  .p-menuitem-text {
    color: #abb6c1;
  }
}
</style>
