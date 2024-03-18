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

const inputValues = reactive({
  email: '',
  password: ''
})

const submitHandler = () => {
  console.log(inputValues)
}
</script>
