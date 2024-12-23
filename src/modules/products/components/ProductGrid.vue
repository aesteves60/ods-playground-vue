<template>
  <OdsTable class="product-grid">
      <table>
        <thead>
          <tr>
            <th v-for="column in displayedColumns"
              :key="column.prop"
              scope="col">
              {{ column.label }}
            </th>

            <th scope="col">
              <OdsButton :icon="ODS_ICON_NAME.cog"
                         id="header-action-trigger"
                         label=""
                         :variant="ODS_BUTTON_VARIANT.ghost" />

              <OdsPopover triggerId="header-action-trigger">
                <div v-for="column in COLUMNS" class="product-grid__header__action__toggle"
                      :key="column.prop">
                  <OdsCheckbox :inputId="`header-action-toggle-${column.prop}`"
                                :isChecked="true"
                                :name="`toggle-${column.prop}`"
                                @odsChange="(e: OdsCheckboxChangeEvent) => onToggleColumn(e, column.prop)" />

                  <label :htmlFor="`header-action-toggle-${column.prop}`">
                    {{ column.label }}
                  </label>
                </div>
              </OdsPopover>
            </th>
          </tr>
        </thead>

        <tbody>
              <tr v-for="product in products" :key="product.id">
                <td v-for="column in displayedColumns" :class="column.class || ''"
                    :key="column.prop">
                    <OdsMedium
                    v-if="column.prop === 'thumbnail'"
                      :alt="product.title"
                      :height="60"
                      :src="product.thumbnail"
                      :width="60"></OdsMedium>
                  <span v-else>{{ product[column.prop] }}</span>
                </td>
                <td class="product-grid__row__actions">
                  <OdsButton :icon="ODS_ICON_NAME.pen"
                             label=""
                             @click="() => router.push({ params: { id:product.id }, name: Routes.PRODUCT_EDIT })"
                             :variant="ODS_BUTTON_VARIANT.ghost" />

                  <OdsButton :icon="ODS_ICON_NAME.trash"
                             label=""
                             @click="() => { onDeleteProduct(product) }"
                             :variant="ODS_BUTTON_VARIANT.ghost" />
                </td>
              </tr>
        </tbody>
      </table>
    </OdsTable>
</template>

<script setup lang="ts">
import type { Product, ProductProps } from '@/models/product';
import { ref } from 'vue';
import { ODS_ICON_NAME, ODS_BUTTON_VARIANT, type OdsCheckboxChangeEvent } from '@ovhcloud/ods-components';
import { OdsButton, OdsTable, OdsPopover, OdsCheckbox, OdsMedium } from '@ovhcloud/ods-components/vue';
import { useRouter } from 'vue-router';
import { Routes } from '@/router/route';

type Column = {
  class?: string,
  label: string,
  prop: keyof Omit<ProductProps, 'restockDate'>,
}
const COLUMNS: Column[] = [
  { label: 'ID', prop: 'id' },
  { label: 'Product', prop: 'title' },
  { label: 'Price', prop: 'price' },
  { class: 'product-grid__row__thumbnail', label: 'Thumbnail', prop: 'thumbnail' },
]
const { products } = defineProps<{ products: Product[] }>()
const emit = defineEmits<{
  (e: 'deleteProduct', product: Product): void
}>()
const router = useRouter()
const displayedColumns = ref(COLUMNS)

function onDeleteProduct(product: Product) {
  emit('deleteProduct', product)
}

function onToggleColumn(event: OdsCheckboxChangeEvent, prop: keyof Omit<ProductProps, 'restockDate'>) {
  if (event.detail.checked) {
      displayedColumns.value = COLUMNS.filter(column => {
        return column.prop === prop || displayedColumns.value.some((c) => c.prop === column.prop)
      })
    } else {
      displayedColumns.value = COLUMNS.filter((column) => column.prop !== prop)
    }
}
</script>

<style lang="scss">
.product-grid {
  width: 100%;
  overflow: auto;

  &__header {
    &__action {
      &__toggle {
        display: flex;
        flex-flow: row;
        column-gap: .5rem;
        align-items: center;

        & + & {
          margin-top: .5rem;
        }
      }
    }
  }

  &__row {
    &__actions,
    &__thumbnail {
      text-align: center;
    }
  }
}
</style>
