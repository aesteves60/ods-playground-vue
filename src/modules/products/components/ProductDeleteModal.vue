<template>
  <OdsModal :isOpen="isOpen"
            @odsClose="onCancelDelete">
      <p>
        Are you sure you want to delete the product: {{ productTitle }}?
      </p>

      <OdsButton label="Cancel"
                 @click="onCancelDelete"
                 slot="actions"
                 :variant="ODS_BUTTON_VARIANT.outline" />

      <OdsButton :isLoading="isLoading"
                 label="Delete"
                 @click="onSubmitDelete"
                 slot="actions" />
    </OdsModal>
</template>

<script setup lang="ts">
import { ODS_BUTTON_VARIANT } from '@ovhcloud/ods-components';
import { OdsModal,OdsButton } from '@ovhcloud/ods-components/vue';

const { isOpen, isLoading, productTitle } = defineProps<{
  isOpen: boolean;
  isLoading: boolean;
  productTitle: string;
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit'): void
}>()

function onCancelDelete() {
  emit('cancel')
}

function onSubmitDelete() {
  emit('submit')
}
</script>

<style lang="scss">

</style>
