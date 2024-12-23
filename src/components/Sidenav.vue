<template>
  <ul class="side-menu">
    <li class="side-menu__item">
      <OdsIcon name="home" class="side-menu__item__icon"></OdsIcon>
      <Link label="Dashboard" :route="Routes.DASHBOARD" class="side-menu__item__link">
      </Link>
    </li>
    <li class="side-menu__item">
      <OdsIcon name="user" class="side-menu__item__icon"></OdsIcon>
      <Link label="Users" :route="Routes.USER" class="side-menu__item__link">
      </Link>
    </li>
    <li class="side-menu__item">
      <OdsIcon name="store" class="side-menu__item__icon"></OdsIcon>
      <Link label="Products" :route="Routes.PRODUCT" class="side-menu__item__link">
      </Link>
    </li>
    <li class="side-menu__item">
      <OdsIcon name="store" class="side-menu__item__icon"></OdsIcon>
      <Link label="FAQ" :route="Routes.FAQ" class="side-menu__item__link">
      </Link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { OdsIcon } from '@ovhcloud/ods-components/vue'
import { Routes } from '@/router/route';
import Link from './Link.vue';
</script>

<style scoped lang="scss">
.side-menu {
  background-color: var(--ods-color-neutral-100);
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;

  &__item {
    padding: 1rem;

    &__icon {
      color: var(--ods-color-text);
    }

    &__link ods-link::part(link) {
      color: var(--ods-color-text);
    }
  }
}
</style>
