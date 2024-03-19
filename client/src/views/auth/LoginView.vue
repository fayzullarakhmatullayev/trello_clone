<template>
  <h2 class="auth__block--subtitle">Вход в Trello Clone</h2>
  <form class="auth__block--form" @submit.prevent="submitHandler">
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="email"
        required
        id="email"
        v-model="inputValues.email"
      />
      <label for="email">Электронная почта</label>
    </FloatLabel>
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="password"
        required
        id="password"
        v-model="inputValues.password"
      />
      <label for="password">Пароль</label>
    </FloatLabel>
    <button type="submit" class="btn btn--primary">Вход в систему</button>
  </form>
  <div class="auth__block--text">
    У вас нет аккаунта? <RouterLink to="/register">Зарегистрируйтесь</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { useToast } from 'primevue/usetoast'

import { login } from '@/services/authServices'
import { useAuthStore } from '@/stores/auth'

const toast = useToast()

const inputValues = reactive({
  email: '',
  password: ''
})

const store = useAuthStore()

const submitHandler = async () => {
  try {
    const { data } = await login(inputValues)
    store.setStoreToken(data.token)
    store.setUser(data.user)
    toast.add({
      severity: 'success',
      summary: `Добро пожаловать, ${data.user?.firstName} ${data.user?.lastName}`,
      life: 3000
    })
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: err?.response?.data?.error,
      life: 3000
    })
  }
}
</script>
