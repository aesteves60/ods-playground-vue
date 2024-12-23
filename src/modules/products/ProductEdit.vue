<template>
  <PageTitle label="Edit product" />
  <ProductForm :isLoading="productsStore.productStatus === ACTION_STATUS.pending"
               :product="productsStore.product"
               @cancel="onCancel"
               @submit="onSubmit" />
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/modules/products';
import ProductForm from './components/ProductForm.vue'
import PageTitle from '../../components/PageTitle.vue'
import { ACTION_STATUS } from '@/constants/action';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Product, type ProductProps } from '@/models/product';
import { Routes } from '@/router/route';
import { useToast } from 'vue-toast-notification';

const productsStore = useProductsStore()
const toast = useToast({ position: 'bottom-left' })
const route = useRoute()
const router = useRouter()

onMounted(async() => {
  const id = route.params.id
  await productsStore.getProduct(Number(id));
})

watch(() => productsStore.updateProductStatus,
  () => {
    if (productsStore.updateProductStatus === ACTION_STATUS.succeeded) {
      router.push({ name: Routes.PRODUCT })
      toast.success('Product successfully updated')
    } else if(productsStore.updateProductStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while updating the product')
    }
  }
)

function onCancel() {
  router.push({ name: Routes.PRODUCT })
}

async function onSubmit(productToUpdate: ProductProps) {
  await productsStore.updateProduct(new Product(productToUpdate));
}
</script>

<style lang="scss">

</style>
