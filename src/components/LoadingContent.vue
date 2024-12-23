<template>
  <OdsSkeleton v-if="props.isLoading"/>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { OdsSkeleton } from '@ovhcloud/ods-components/vue';

const props = defineProps<{
  isLoading?: boolean
}>()
</script>
