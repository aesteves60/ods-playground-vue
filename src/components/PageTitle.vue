<template>
   <OdsText class="page-title"
            :preset="ODS_TEXT_PRESET.heading2">
      {{ props.label }}
    </OdsText>
</template>
<script setup lang="ts">
import { OdsText } from '@ovhcloud/ods-components/vue'
import { ODS_TEXT_PRESET } from '@ovhcloud/ods-components'

const props = defineProps<{ label: string }>()
</script>
<style scoped>
.page-title {
  text-align: center;
}
</style>
