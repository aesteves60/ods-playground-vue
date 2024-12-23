<template>
  <PageTitle label="New product" />
  <ProductForm :isLoading="productsStore.createProductStatus === ACTION_STATUS.pending"
                @cancel="onCancel"
                @submit="onSubmit" />
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/modules/products';
import ProductForm from './components/ProductForm.vue'
import PageTitle from '../../components/PageTitle.vue'
import { ACTION_STATUS } from '@/constants/action';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';
import { Routes } from '@/router/route';
import { Product, type ProductProps } from '@/models/product';
import { watch } from 'vue';

const productsStore = useProductsStore()
const toast = useToast({ position: 'bottom-left' })
const router = useRouter()

watch(() => productsStore.createProductStatus,
  () => {
    if (productsStore.createProductStatus === ACTION_STATUS.succeeded) {
      router.push({ name: Routes.PRODUCT })
      toast.success('Product successfully created')
    } else if(productsStore.createProductStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while creating the product')
    }
  }
)

function onCancel() {
  router.push({ name: Routes.PRODUCT })
}

async function onSubmit(productToCreate: ProductProps) {
  await productsStore.createProduct(new Product(productToCreate));
}
</script>
<style>

</style>
