<template>
  <div class="header">
    <span class="header__title">ODS Vue Playground</span>
    <OdsLink @click="emit('signOut')" class="header__sign-out" label="Sign Out" icon="shutdown">
    </OdsLink>
  </div>
</template>

<script setup lang="ts">
import { OdsLink } from '@ovhcloud/ods-components/vue';

const emit = defineEmits<{
  (e: 'signOut'): void
}>()
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  background-color: var(--ods-color-primary-500);
  height: 100%;
  padding: 0 15px;

  &__title {
    color: var(--ods-color-neutral-000);
    font-weight: 600;
  }

  &__sign-out {
    &::part(link) {
      color: var(--ods-color-neutral-000);
    }
  }
}
</style>
