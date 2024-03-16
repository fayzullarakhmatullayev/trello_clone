<template>
  <div class="card__header">
    <Textarea autoResize rows="1" v-model="card.name" />
    <button
      class="btn max-w-[28px] h-[28px]"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="top__menu"
    >
      <MenuIcon />
    </button>
    <Menu ref="menu" id="top__menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Textarea from 'primevue/textarea'
import Menu from 'primevue/menu'
import MenuIcon from '@/components/icons/MenuIcon.vue'
defineProps<{ card: any }>()

const menu = ref()
const items = ref([{ label: 'Удалить', icon: 'pi pi-trash' }])

const toggle = (event: any) => {
  menu.value.toggle(event)
}
</script>

<style lang="scss">
.card {
  &__header {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    background-color: #101204;
    border-radius: 12px 12px 0 0;
    gap: 16px;

    textarea {
      &:not(:focus) {
        background: transparent;
        color: #abb6c1;
      }
      cursor: pointer;
      border-radius: 5px;
      resize: none;
      padding: 3px 5px;
      font-size: 14px;
      width: 100%;
    }
  }
}
</style>
