<template>
  <div class="max-w-[272px] min-w-[272px] flex flex-col flex-1 card">
    <CardHeader :card="card" />
    <div class="flex-1 overflow-y-auto list" ref="cardListRef">
      <draggable
        :list="card.tasks"
        group="cards"
        class="flex flex-col gap-3 overflow-y-auto card__list"
        itemKey="id"
      >
        <template #item="{ element: task }">
          <CardItem :task="task" />
        </template>
      </draggable>
    </div>

    <CardFooter @addCard="addTask" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import draggable from 'vuedraggable'

import CardHeader from '@/components/card/CardHeader.vue'
import CardItem from '@/components/card/CardItem.vue'
import CardFooter from '@/components/card/CardFooter.vue'
import type { ICard } from '@/services/dto/card.dto'

import { postCardTask } from '@/services/taskService'
import { useCardStore } from '@/stores/card'
import { sleep } from '@/utils'

const props = defineProps<{ card: ICard }>()
const cardListRef = ref()
const store = useCardStore()

const addTask = async (text: string) => {
  await postCardTask({
    text,
    card_id: props.card.card_id,
    position: props.card.tasks.length
  })
  store.triggerCardLoad = true
  nextTick(async () => {
    await sleep(50)
    const cardList = cardListRef.value.querySelector('.card__list')
    cardList.scrollIntoView({ block: 'end' })
  })
}
</script>

<style lang="scss">
.card {
  height: fit-content;
  max-height: 82vh;
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
  svg {
    color: #abb6c1;
    width: 16px;
    height: 16px;
  }
  &:active,
  &:hover {
    background-color: #a6c5e229;
  }
  &--primary {
    background: #0c66e4;
    color: #fff;
    &:active,
    &:hover {
      background-color: #0153c5;
    }
  }
}
.card__list {
  background-color: #101204;
  padding: 3px 10px;
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
