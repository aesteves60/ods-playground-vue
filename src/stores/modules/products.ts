import { defineStore } from 'pinia'
import { ref } from 'vue'
import { list, count as countReq, fetch, update, create, deleteProduct as deleteProductReq } from '../services/products';
import { ACTION_STATUS } from '@/constants/action';
import type { Product } from '@/models/product';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const productsCount = ref(0)
  const productsListStatus = ref(ACTION_STATUS.idle);
  async function getProducts(page = 0, perPage = 10) {
    productsListStatus.value = ACTION_STATUS.pending
    const { products: productsAPI, count } = await list(page, perPage);
    products.value = productsAPI;
    productsCount.value = count;
    productsListStatus.value = ACTION_STATUS.succeeded
  }

  const count = ref(0)
  const countStatus = ref(ACTION_STATUS.idle);
  async function getCount() {
    countStatus.value = ACTION_STATUS.pending
    count.value = await countReq();
    countStatus.value = ACTION_STATUS.succeeded
  }

  const product = ref<Product>({} as Product)
  const productStatus = ref(ACTION_STATUS.idle);
  async function getProduct(id: number) {
    productStatus.value = ACTION_STATUS.pending
    product.value = await fetch(id);
    productStatus.value = ACTION_STATUS.succeeded
  }

  const updateProductStatus = ref(ACTION_STATUS.idle);
  async function updateProduct(productToUpdate: Product) {
    updateProductStatus.value = ACTION_STATUS.pending
    await update(productToUpdate)
    product.value = productToUpdate
    products.value = products.value.map((product) => (
      product.id === productToUpdate.id ? productToUpdate : product
    ))
    console.log('products.value', products.value)
    updateProductStatus.value = ACTION_STATUS.succeeded
  }

  const createProductStatus = ref(ACTION_STATUS.idle)
  async function createProduct(productToCreate: Product) {
    createProductStatus.value = ACTION_STATUS.pending
    await create(productToCreate)
    product.value = productToCreate
    products.value = products.value.concat([productToCreate])
    createProductStatus.value = ACTION_STATUS.succeeded
  }

  const deleteProductStatus = ref(ACTION_STATUS.idle)
  async function deleteProduct(productToDelete: Product) {
    deleteProductStatus.value = ACTION_STATUS.pending
    await deleteProductReq(productToDelete.id)
    products.value = products.value.filter((product) => product.id !== productToDelete.id)
    deleteProductStatus.value = ACTION_STATUS.succeeded
  }

  return {
    products,
    productsCount,
    productsCountStatus: countStatus,
    getProducts,

    count,
    countStatus,
    getCount,

    product,
    productStatus,
    getProduct,

    updateProductStatus,
    updateProduct,

    createProductStatus,
    createProduct,

    deleteProductStatus,
    deleteProduct,
  }
});
