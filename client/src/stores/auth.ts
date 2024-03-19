import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const TOKEN_KEY = 'access_token'
  const token = ref(localStorage.getItem(TOKEN_KEY) || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  const setUser = (payload: any) => {
    localStorage.setItem('user', JSON.stringify(payload))
    user.value = payload
  }

  const removeUser = () => {
    localStorage.removeItem('user')
    user.value = null
  }

  const setStoreToken = (payload: string) => {
    localStorage.setItem(TOKEN_KEY, payload)
    token.value = payload
    router.push({ name: 'main' })
  }

  const removeStoreToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    token.value = null
    router.push({ name: 'login' })
    removeUser()
  }

  return {
    token,
    isAuthenticated,
    setStoreToken,
    removeStoreToken,
    user,
    setUser
  }
})
