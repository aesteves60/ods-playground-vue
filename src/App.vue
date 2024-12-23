<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue';
import Sidenav from './components/Sidenav.vue';
import { Routes } from './router/route';
import { computed } from 'vue';
import { useSessionStore } from './stores/modules/session';

const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()

const isNotSignInPage = computed(() => route && route.name !== Routes.SIGN_IN)

const signOut = async() => {
  await sessionStore.signOut()
  await router.push({ name: Routes.SIGN_IN })
}
</script>

<template>
  <Header v-if="isNotSignInPage" class="app__header" @signOut="signOut"></Header>
  <div class="app__body" :class="{ 'app__body--sign-in': !isNotSignInPage }">
    <Sidenav v-if="isNotSignInPage"></Sidenav>

    <div class="app__body__content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
$header-height: 40px;
.app {
  &__header {
    position: fixed;
    right: 0;
    left: 0;
    height: $header-height;
  }

  &__body {
    display: grid;
    grid-template-columns: 220px 1fr;
    padding-top: $header-height;

    &--sign-in {
      grid-template-columns: 1fr;

    }

    &__content {
      position: relative;
      padding: 2rem;
      height: calc(100vh - #{$header-height});
      overflow-y: auto;
    }
  }
}
</style>
