<template>
  <div class="card__header">
    <Textarea autoResize rows="1" v-model="cardTitle" />
    <button
      class="btn max-w-[28px] h-[28px]"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="top__menu"
    >
      <MenuIcon />
    </button>
    <Menu ref="menu" id="top__menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <a
          class="flex align-items-center"
          v-bind="props.action"
          @click="removeCardHandler(card.card_id)"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { removeCard, updateCard } from '@/services/cardService'
import { useCardStore } from '@/stores/card'
import { useDebounce } from '@/utils'

import Textarea from 'primevue/textarea'
import Menu from 'primevue/menu'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import type { ICard } from '@/services/dto/card.dto'

const props = defineProps<{ card: ICard }>()

const store = useCardStore()
const menu = ref()
const items = ref([{ label: 'Delete', icon: 'pi pi-trash' }])

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const cardTitle = ref(props.card.title)

const updateCardTitle = async () => {
  if (!cardTitle.value) return
  const payload = { card_id: props.card.card_id, title: cardTitle.value }
  await updateCard(payload)
}

const removeCardHandler = async (card_id: number) => {
  await removeCard(card_id)
  store.triggerCardLoad = true
}

const debouncedUpdate = useDebounce(updateCardTitle, 500)

watch(() => cardTitle.value, debouncedUpdate)
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
