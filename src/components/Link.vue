<template>
  <RouterLink :to="{ name: route }">
    <OdsLink href="" :label="label" :icon="icon">
    </OdsLink>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Routes } from '@/router/route';
import type { OdsIconName } from '@ovhcloud/ods-components';
import { OdsLink } from '@ovhcloud/ods-components/vue';

const { route, label } = defineProps<{
  route: Routes;
  label?: string;
  icon?: OdsIconName;
}>()
</script>
