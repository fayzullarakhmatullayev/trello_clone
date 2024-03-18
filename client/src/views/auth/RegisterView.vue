<template>
  <h2 class="auth__block--subtitle">Зарегистрироваться в Trello Clone</h2>
  <form class="auth__block--form" @submit.prevent="submitHandler">
    <FloatLabel>
      <InputText
        class="auth__block--input"
        id="firstName"
        required
        v-model="inputValues.firstName"
      />
      <label for="firstName">Имя</label>
    </FloatLabel>
    <FloatLabel>
      <InputText class="auth__block--input" id="lastName" required v-model="inputValues.lastName" />
      <label for="lastName">Фамилия</label>
    </FloatLabel>
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
    <FloatLabel>
      <InputText
        class="auth__block--input"
        type="password"
        required
        id="re-password"
        v-model="inputValues.rePassword"
      />
      <label for="re-password">Введите пароль повторно</label>
    </FloatLabel>
    <button type="submit" class="btn btn--primary">Зарегистрироваться</button>
  </form>
  <div class="auth__block--text">
    У вас уже есть аккаунт? <RouterLink to="/login">Войдите</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const inputValues = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: ''
})

const submitHandler = () => {
  console.log(inputValues)
}
</script>
