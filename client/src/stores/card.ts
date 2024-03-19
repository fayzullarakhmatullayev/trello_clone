import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const triggerCardLoad = ref(false)

  return {
    triggerCardLoad
  }
})
