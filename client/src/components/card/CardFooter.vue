<template>
  <div class="card__footer">
    <button class="btn w-full" @click="isFormVisible = true" v-if="!isFormVisible">
      <PlusIcon />
      <span>Добавить карточку</span>
    </button>
    <CardForm
      v-else
      placeholder="Ввести заголовок для этой карточки"
      btnTitle="Добавить карточку"
      rows="3"
      @closeForm="isFormVisible = false"
      @submitHandler="submitHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
const emit = defineEmits(['addCard'])

import Button from 'primevue/button'
import CardForm from '@/components/card/CardForm.vue'

const isFormVisible = ref(false)

const submitHandler = (text: string) => {
  emit('addCard', text)
}
</script>

<style lang="scss">
.card {
  &__footer {
    padding: 5px 10px;
    background-color: #101204;
    border-radius: 0 0 12px 12px;
    &--form {
      textarea {
        width: 100%;
        font-size: 12px;
        resize: none;
        padding: 6px 10px;
        margin-bottom: 6px;
      }
    }
    &--wrapper {
      display: flex;
      gap: 5px;
      .btn--primary {
        width: fit-content;
        white-space: nowrap;
        padding: 5px 10px;
      }
    }
  }
}
</style>
