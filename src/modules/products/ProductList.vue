<template>
  <div class="list">
    <div class="list__header">
      <PageTitle label="List of products" />

      <OdsButton :icon="ODS_ICON_NAME.plus"
                  label="Create a new product"
                  @click="() => route.push({ name: Routes.PRODUCT_NEW })" />
    </div>

    <ProductGrid v-if="!!productsStore.products"
                  class="list__content__table"
                  @deleteProduct="onDeleteProductClick"
                  :products="productsStore.products" />
    <div v-else class="list__content__mask">
      <LoadingMask />
    </div>

    <OdsPagination v-if="!!productsStore.count"
                    @odsChange="onPaginationChange"
                    @odsItemPerPageChange="onPaginationPerPageChange"
                    :totalItems="productsStore.count" />

    <ProductDeleteModal :isOpen="!!productToDelete"
                        :isLoading="productsStore.deleteProductStatus === ACTION_STATUS.pending"
                        @cancel="onCancelDelete"
                        @submit="onDeleteProductSubmit"
                        :productTitle="productToDelete?.title || ''" />
  </div>
</template>

<script setup lang="ts">
import { Routes } from '@/router/route';
import { OdsButton, OdsPagination } from '@ovhcloud/ods-components/vue';
import { ODS_ICON_NAME, type OdsPaginationCurrentChangeEvent, type OdsPaginationItemPerPageChangedEvent } from '@ovhcloud/ods-components'
import PageTitle from '@/components/PageTitle.vue';
import LoadingMask from '@/components/LoadingMask.vue';
import { useProductsStore } from '@/stores/modules/products';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProductGrid from './components/ProductGrid.vue'
import ProductDeleteModal from './components/ProductDeleteModal.vue'
import type { Product } from '@/models/product';
import { ACTION_STATUS } from '@/constants/action';

const productsStore = useProductsStore()
const route = useRouter()
const productToDelete = ref<Product | null>(null)

onMounted(async() => {
  await Promise.all([
    productsStore.getCount(),
    productsStore.getProducts(1, 10),
  ])
})

function onCancelDelete() {
  productToDelete.value = null
}

function onDeleteProductClick(product: Product) {
  productToDelete.value = product
}

async function onDeleteProductSubmit() {
  if (productToDelete.value) {
    await productsStore.deleteProduct(productToDelete.value)
    productToDelete.value = null
  }
}

function onPaginationChange({ detail }: OdsPaginationCurrentChangeEvent) {
  productsStore.getProducts(detail.current, detail.itemPerPage)
}

function onPaginationPerPageChange({ detail }: OdsPaginationItemPerPageChangedEvent) {
  productsStore.getProducts(detail.currentPage, detail.current)
}
</script>

<style lang="scss">
.list {
  display: grid;
  justify-items: center;
  row-gap: 10px;
  height: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__mask {
    position: relative;
  }
}
</style>
