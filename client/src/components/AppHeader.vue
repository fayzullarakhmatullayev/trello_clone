<template>
  <header class="header">
    <div class="flex justify-between items-center gap-4">
      <RouterLink class="font-extrabold flex items-center gap-2" to="/">
        <img src="@/assets/icon.ico" width="24" height="24" alt="icon" /> Trello Clone</RouterLink
      >
      <div class="header__user flex items-center gap-2">
        <div class="header__user--name">
          Welcome, <span>{{ store.user?.firstName }} {{ store.user?.lastName }}</span>
        </div>
        <button
          class="header__user--avatar"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        >
          {{ store.user?.firstName.slice(0, 1) }}{{ store.user?.lastName.slice(0, 1) }}
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
  </header>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Menu from 'primevue/menu'
import { useAuthStore } from '@/stores/auth'
const items = ref([
  {
    label: 'Logout',
    icon: 'pi pi-sign-out'
  }
])

const menu = ref()

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const store = useAuthStore()

const logout = () => {
  store.removeStoreToken()
}
</script>

<style lang="scss">
.header {
  background-color: #0a142b;
  padding: 16px 20px;
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
      text-transform: uppercase;
    }
  }
}
</style>
