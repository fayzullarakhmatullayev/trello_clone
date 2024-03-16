<template>
  <header class="header">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <RouterLink class="font-extrabold" to="/">Trello Clone</RouterLink>
        <div class="header__user flex items-center gap-2">
          <div class="header__user--name">Добро пожаловать, <span>John Doe</span></div>
          <button
            class="header__user--avatar"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            JD
          </button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
            <template #item="{ item, props }">
              <a class="flex align-items-center" v-bind="props.action" @click="logout">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Menu from 'primevue/menu'
const items = ref([
  {
    label: 'Выход из системы',
    icon: 'pi pi-sign-out'
  }
])

const menu = ref()

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const logout = () => {
  console.log('logout')
}
</script>

<style lang="scss">
.header {
  background-color: #0a142b;
  padding: 16px;
  backdrop-filter: blur(5px);

  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  &__user {
    &--name {
      font-size: 14px;
      white-space: nowrap;
      span {
        font-weight: 700;
      }
    }
    &--avatar {
      min-width: 35px;
      width: 100%;
      height: 35px;
      border-radius: 50%;
      background-color: #00875a;
      display: block;
    }
  }
}
</style>
