<template>
  <h2 class="auth__block--subtitle">Register a new account</h2>
  <form class="auth__block--form" @submit.prevent="submitHandler">
    <FloatLabel>
      <InputText
        class="auth__block--input"
        id="firstName"
        required
        v-model="inputValues.firstName"
      />
      <label for="firstName">First Name</label>
    </FloatLabel>
    <FloatLabel>
      <InputText class="auth__block--input" id="lastName" required v-model="inputValues.lastName" />
      <label for="lastName">Last Name</label>
    </FloatLabel>
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
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="password"
        required
        id="re-password"
        v-model="inputValues.rePassword"
      />
      <label for="re-password">Repeat password</label>
    </FloatLabel>
    <button type="submit" class="btn btn--primary min-w-[180px]">Register</button>
  </form>
  <div class="auth__block--text">
    Already have an account? <RouterLink to="/login">Login</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { useToast } from 'primevue/usetoast'

import { register } from '@/services/authServices'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const toast = useToast()

const inputValues = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: ''
})

const submitHandler = async () => {
  try {
    if (inputValues.password !== inputValues.rePassword) {
      toast.add({
        severity: 'error',
        summary: "The passwords don't match",
        life: 3000
      })
      return
    }
    const { rePassword, ...rest } = inputValues
    const { data } = await register(rest)
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
