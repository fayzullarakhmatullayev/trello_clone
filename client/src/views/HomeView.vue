<template>
  <div class="wrapper flex items-start gap-4">
    <draggable :list="cardItems" class="flex gap-4 flex-1" itemKey="card_id">
      <template #item="{ element: card }">
        <Card :card="card" />
      </template>
    </draggable>
    <div class="add__more--wrapper">
      <button class="add__more" @click="isFormOpen = true" v-if="!isFormOpen">
        <PlusIcon />
        <span>Добавьте еще одну колонку</span>
      </button>
      <div class="add__more--form" v-else>
        <CardForm
          placeholder="Ввести заголовок списка"
          btnTitle="Добавить список"
          rows="1"
          @closeForm="isFormOpen = false"
          @submitHandler="addMoreHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useToast } from 'primevue/usetoast'

import type { ICard } from '@/services/dto/card.dto'
import { getAllCards, postCard } from '@/services/cardService'
import { useCardStore } from '@/stores/card'

import Card from '@/components/card/Card.vue'
import CardForm from '@/components/card/CardForm.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const toast = useToast()
const store = useCardStore()
const cardItems = ref<ICard[]>([])
const isFormOpen = ref(false)

const fetchAllCards = async () => {
  try {
    const { data } = await getAllCards()
    cardItems.value = data
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: err?.response?.data?.error,
      life: 3000
    })
  }
}

const addMoreHandler = async (title: string) => {
  try {
    await postCard({ title, position: cardItems.value.length })
  } finally {
    await fetchAllCards()
    isFormOpen.value = false
  }
}

watch(
  () => store.triggerCardLoad,
  async () => {
    if (store.triggerCardLoad) {
      await fetchAllCards()
      store.triggerCardLoad = false
    }
  }
)

fetchAllCards()

onBeforeUnmount(() => {
  cardItems.value = []
})
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
  width: 100%;
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

  &--wrapper {
    width: 272px;
  }
  &--form {
    width: 100%;
    background-color: #101204;
    border-radius: 12px;
    padding: 5px;
  }
}
</style>
