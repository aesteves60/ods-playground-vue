<template>
  <div class="loading-mask">
    <OdsSpinner class="loading-mask__spinner" />
  </div>
</template>
<script setup lang="ts">
import { OdsSpinner } from '@ovhcloud/ods-components/vue'
</script>

<style scoped lang="scss">
.loading-mask {
  position: absolute;
  inset: 0;

  &__spinner {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
    text-align: center;
  }
}

</style>
