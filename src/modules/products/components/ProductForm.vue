<template>
  <form v-if="!isLoading"
        class="product-form"
        @submit.prevent="onFormSubmit">
    <OdsFormField :error="error?.title">
      <label class="product-form__fields__label">
        Title:
      </label>

      <OdsInput :defaultValue="product?.title"
                :isRequired="true"
                name="title"
                @odsInvalid="(e: CustomEvent) => updateError(e, 'title')"
                :type="ODS_INPUT_TYPE.text" />
    </OdsFormField>

    <OdsFormField :error="error?.price">
      <label class="product-form__fields__label">
        Price:
      </label>

      <div class="product-form__fields__price">
        <OdsInput :defaultValue="product?.price"
                  :isRequired="true"
                  :min="0"
                  name="price"
                  @odsInvalid="(e: CustomEvent) => updateError(e, 'price')"
                  step="any"
                  :type="ODS_INPUT_TYPE.number" />

        <span class="product-form__fields__price__currency">
          €
        </span>
      </div>
    </OdsFormField>

    <OdsFormField :error="error?.description">
      <label class="product-form__fields__label">
        Description:
      </label>

      <OdsTextarea :defaultValue="product?.description"
                    :isRequired="true"
                    name="description"
                    @odsInvalid="(e: CustomEvent) => updateError(e, 'description')" />
    </OdsFormField>

    <OdsFormField :error="error?.hasReturnPolicy">
      <label class="product-form__fields__label">
        Return policy:
      </label>

      <div class="product-form__fields__return-policy">
        <div class="product-form__fields__return-policy__option">
          <OdsCheckbox inputId="has-return-policy"
                        :isChecked="product?.hasReturnPolicy"
                        name="hasReturnPolicy"
                        @odsInvalid="(e: CustomEvent) => updateError(e, 'hasReturnPolicy')" />
          <label htmlFor="has-return-policy">Product can be returned up to 30 days</label>
        </div>
      </div>
    </OdsFormField>

    <OdsFormField :error="error?.stock">
      <div class="product-form__fields__stock">
        <label class="product-form__fields__label">
          Stock quantity:
        </label>

        <OdsQuantity :defaultValue="product?.stock"
                      :isRequired="true"
                      :min="0"
                      name="stock"
                      @odsInvalid="(e: CustomEvent) => updateError(e, 'stock')" />
      </div>
    </OdsFormField>

    <OdsFormField :error="error?.restockTime">
      <label class="product-form__fields__label">
        Restock time:
      </label>

      <OdsTimepicker :defaultValue="product?.restockTime"
                      :isRequired="true"
                      name="restockTime"
                      @odsInvalid="(e: CustomEvent) => updateError(e, 'restockTime')"
                      timezones="all" />
    </OdsFormField>

    <OdsFormField :error="error?.minimumOrderQuantity">
      <label class="product-form__fields__label">
        Minimum order quantity:
      </label>

      <div>
        <OdsRange :defaultValue="product?.minimumOrderQuantity"
                  :isRequired="true"
                  name="minimumOrderQuantity"
                  @odsInvalid="(e: CustomEvent) => updateError(e, 'minimumOrderQuantity')" />
      </div>
    </OdsFormField>

    <OdsFormField :error="error?.category">
      <label class="product-form__fields__label">
        Category:
      </label>

      <div class="product-form__fields__category">
        <div class="product-form__fields__category__option">
          <OdsRadio :isChecked="product?.category === 'beauty'"
                    :isRequired="true"
                    inputId="category-beauty"
                    name="category"
                    @odsInvalid="(e: CustomEvent) => updateError(e, 'category')"
                    value="beauty" />
          <label htmlFor="category-beauty">Beauty</label>
        </div>

        <div class="product-form__fields__category__option">
          <OdsRadio :isChecked="product?.category === 'fragrances'"
                    :isRequired="true"
                    inputId="category-fragrances"
                    name="category"
                    @odsInvalid="(e: CustomEvent) => updateError(e, 'category')"
                    value="fragrances" />
          <label htmlFor="category-fragrances">Fragrances</label>
        </div>

        <div class="product-form__fields__category__option">
          <OdsRadio :isChecked="product?.category === 'furniture'"
                    :isRequired="true"
                    inputId="category-furniture"
                    name="category"
                    @odsInvalid="(e: CustomEvent) => updateError(e, 'category')"
                    value="furniture" />
          <label htmlFor="category-furniture">Furniture</label>
        </div>

        <div class="product-form__fields__category__option">
          <OdsRadio :isChecked="product?.category === 'groceries'"
                    :isRequired="true"
                    inputId="category-groceries"
                    name="category"
                    @odsInvalid="(e: CustomEvent) => updateError(e, 'category')"
                    value="groceries" />
          <label htmlFor="category-groceries">Groceries</label>
        </div>
      </div>
    </OdsFormField>

    <div class="product-form__actions">
      <OdsButton label="Cancel"
                 @click="onCancel"
                 type="button"
                 :variant="ODS_BUTTON_VARIANT.outline" />

      <OdsButton :isLoading="isLoading"
                 :label="!!product ? 'Update' : 'Create'"
                 type="submit" />
    </div>
  </form>

  <LoadingMask v-else></LoadingMask>
</template>
<script setup lang="ts">
import type { Product } from '@/models/product';
import { OdsButton, OdsFormField, OdsInput, OdsRadio, OdsCheckbox, OdsRange, OdsTimepicker, OdsQuantity, OdsTextarea } from '@ovhcloud/ods-components/vue'
import { ODS_BUTTON_VARIANT, ODS_INPUT_TYPE, type OdsFormElement } from '@ovhcloud/ods-components';
import { ref } from 'vue';
import LoadingMask from '@/components/LoadingMask.vue';

const { isLoading, product} = defineProps<{ isLoading: boolean, product?: Product }>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'submit', product: Product): void
}>()
const error = ref<Record<string, string>>({})

function onFormSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  emit('submit', {
    ...Object.fromEntries(formData.entries()),
    id: product?.id,
  } as Product)
}

function onCancel() {
  emit('cancel')
}

async function updateError(e: CustomEvent, field: string): Promise<void> {
    if (e.detail) {
      const errorMessage = await (e.target as HTMLElement & OdsFormElement).getValidationMessage()

      if (errorMessage) {
        error.value = {
          ...error.value,
          [field]: errorMessage,
        }
      }
    } else {
      error.value = {
        ...error.value,
        [field]: '',
      }
    }
  }
</script>

<style lang="scss">
@import '@ovhcloud/ods-components/style';

.product-form {
  display: flex;
  flex-flow: column;
  grid-row-gap: 1rem;
  &__info {
    align-self: center;
  }

  &__fields {
    &__label {
      @include ods-text-label();
    }

    &__price {
      display: flex;
      column-gap: .5rem;
      align-items: center;

      &__currency {
        color: var(--ods-color-primary-500);
      }
    }

    &__stock {
      display: flex;
      column-gap: 1rem;
      align-items: center;
    }

    &__category,
    &__return-policy {
      display: flex;
      column-gap: 1rem;
      align-items: center;

      &__option {
        display: flex;
        column-gap: .5rem;
        align-items: center;
      }
    }
  }

  &__actions {
    display: flex;
    flex-flow: row;
    column-gap: .5rem;
    justify-content: flex-end;
  }
}
</style>
