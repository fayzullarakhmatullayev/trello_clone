<template>
  <div class="auth">
    <div class="auth__block">
      <h1 class="auth__block--title">
        <img src="@/assets/icon.ico" width="32" height="32" alt="icon" />
        Trello Clone
      </h1>
      <slot />
    </div>
    <div class="auth__img">
      <img src="@/assets/auth-img-one.svg" alt="auth-img-one" />
      <img src="@/assets/auth-img-two.svg" alt="auth-img-two" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  &__img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    img {
      max-width: 400px;
      width: 100%;
    }
  }

  &__block {
    background-color: white;
    box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.15);
    max-width: 350px;
    width: 100%;
    padding: 24px;
    border-radius: 12px;
    z-index: 20;
    position: relative;
    &--title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    &--subtitle {
      text-align: center;
      font-size: 16px;
      margin-bottom: 24px;
      font-weight: 500;
    }
    &--form {
      display: flex;
      flex-direction: column;
      gap: 22px;
      .btn {
        padding: 10px 12px;
        width: fit-content;
        display: block;
        margin: 0 auto 16px;
      }
      label {
        font-size: 14px;
      }
    }
    &--input {
      width: 100%;
      display: block;
      padding: 10px 12px;
      background-color: #f1f1f1;
      font-size: 16px;
    }
    &--text {
      font-size: 12px;
      text-align: center;
      a {
        color: #0c66e4;
        text-decoration: underline;
      }
    }
  }
}
</style>
