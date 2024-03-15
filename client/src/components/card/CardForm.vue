<template>
  <form
    class="card__footer--form"
    v-on-click-outside="() => emit('closeForm')"
    ref="cardFormRef"
    @submit.prevent="submitHandler"
  >
    <Textarea
      :placeholder="placeholder"
      autoResize
      :rows="rows"
      v-model="textAreaValue"
      @keydown.enter.prevent="submitOnEnter($event)"
      @keydown.alt.enter.prevent="insertNewLine($event)"
    />
    <div class="card__footer--wrapper">
      <button class="btn btn--primary" type="submit">{{ btnTitle }}</button>
      <button class="btn max-w-[28px]" type="button" @click="emit('closeForm')">
        <i class="pi pi-times text-sm"></i>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import Textarea from 'primevue/textarea'
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
  btnTitle: string
  rows: string
  placeholder?: string
  textAreaValue?: string
}>()
const emit = defineEmits(['closeForm', 'submitHandler'])
const cardFormRef = ref()

const textAreaValue = ref(props.textAreaValue || '')

const submitHandler = () => {
  if (textAreaValue.value) {
    emit('submitHandler', textAreaValue.value)
    emit('closeForm')
  }
}

const submitOnEnter = (event: any) => {
  if (!event.altKey) {
    submitHandler()
  }
}

const insertNewLine = (event: any) => {
  if (event.altKey) {
    const textArea = event.target
    const selectionStart = textArea.selectionStart
    const selectionEnd = textArea.selectionEnd
    const textBefore = textAreaValue.value.substring(0, selectionStart)
    const textAfter = textAreaValue.value.substring(selectionEnd)
    textAreaValue.value = textBefore + '\n' + textAfter
    nextTick(() => {
      textArea.selectionStart = textArea.selectionEnd = selectionStart + 1
    })
  }
}

onMounted(() => {
  const textarea = cardFormRef.value.querySelector('.p-inputtextarea')
  textarea && textarea.focus()
})
</script>
