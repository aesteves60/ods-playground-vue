<template>
  <div class="dashboard">
      <PageTitle label="Overview of your playground resources" />

      <div class="dashboard__tiles">
        <OdsCard class="dashboard__tiles__tile">
          <span class="dashboard__tiles__tile__title">
            Users
          </span>

          <OdsDivider />

          <LoadingContent :is-loading="usersStore.countStatus === ACTION_STATUS.pending">
            <span>
              You have {{ usersStore.count }} users registered
            </span>
          </LoadingContent>

          <Link label="Manage users"
                :route="Routes.USER" />
        </OdsCard>

        <OdsCard class="dashboard__tiles__tile">
          <span class="dashboard__tiles__tile__title">
            Products
          </span>

          <OdsDivider class="dashboard__tiles__tile__divider"/>

          <LoadingContent :is-loading="productsStore.countStatus === ACTION_STATUS.pending">
            <span>
              You have {{ productsStore.count }} products registered
            </span>
          </LoadingContent>

          <Link label="Manage products"
                :route="Routes.PRODUCT" />
        </OdsCard>
      </div>
    </div>
</template>

<script setup lang="ts">
import LoadingContent from '@/components/LoadingContent.vue';
import Link from '@/components/Link.vue';
import { Routes } from '@/router/route';
import { OdsCard, OdsDivider } from '@ovhcloud/ods-components/vue';
import { useProductsStore } from '@/stores/modules/products';
import { ACTION_STATUS } from '@/constants/action';
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/modules/users';
import PageTitle from '@/components/PageTitle.vue';

const productsStore = useProductsStore()
const usersStore = useUsersStore()

onMounted(async() => {
  await Promise.all([
    productsStore.getCount(),
    usersStore.getCount(),
  ])
})
</script>

<style lang="scss">
@import '@ovhcloud/ods-components/style';

.dashboard {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-row-gap: 2rem;
  padding: 2rem 0;

  &__tiles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    align-self: flex-start;

    &__tile {
      display: flex;
      flex-flow: column;
      row-gap: 1rem;
      padding: 1rem;

      &__title {
        color: var(--ods-color-primary-500);
        font-size: px-to-rem(18px);
        font-weight: 700;
      }

      &__divider {
        &::part(divider) {
          background-color: var(--ods-color-primary-200);
        }
      }
    }
  }
}
</style>
