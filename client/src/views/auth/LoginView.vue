<template>
  <h2 class="auth__block--subtitle">Login to your account</h2>
  <form class="auth__block--form" @submit.prevent="submitHandler">
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="email"
        required
        id="email"
        v-model="inputValues.email"
      />
      <label for="email">Email</label>
    </FloatLabel>
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="password"
        required
        id="password"
        v-model="inputValues.password"
      />
      <label for="password">Password</label>
    </FloatLabel>
    <button type="submit" class="btn btn--primary min-w-[180px]">Submit</button>
  </form>
  <div class="auth__block--text">
    Don't you have an account? <RouterLink to="/register">Register</RouterLink>
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
    window.location.reload()
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: err?.response?.data?.error,
      life: 3000
    })
  }
}
</script>
