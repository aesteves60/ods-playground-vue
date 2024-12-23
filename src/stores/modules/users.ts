import { defineStore } from 'pinia'
import { ref } from 'vue'
import { list, count as countReq, fetch, update, create } from '../services/users';
import { ACTION_STATUS } from '@/constants/action';
import type { User } from '@/models/user';

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const usersCount = ref(0)
  const usersListStatus = ref(ACTION_STATUS.idle);
  async function getUsers(page = 0, perPage = 10) {
    usersListStatus.value = ACTION_STATUS.pending
    const { users, count } = await list(page, perPage);
    users.value = users;
    usersCount.value = count;
    usersListStatus.value = ACTION_STATUS.succeeded
  }

  const count = ref(0)
  const countStatus = ref(ACTION_STATUS.idle);
  async function getCount() {
    countStatus.value = ACTION_STATUS.pending
    count.value = await countReq();
    countStatus.value = ACTION_STATUS.succeeded
  }

  const user = ref({})
  const userStatus = ref(ACTION_STATUS.idle);
  async function getProduct(id: number) {
    userStatus.value = ACTION_STATUS.pending
    user.value = await fetch(id);
    userStatus.value = ACTION_STATUS.succeeded
  }

  const updateUserStatus = ref(ACTION_STATUS.idle);
  async function updateUser(user: User) {
    updateUserStatus.value = ACTION_STATUS.pending
    await update(user);
    updateUserStatus.value = ACTION_STATUS.succeeded
  }

  const createUserStatus = ref(ACTION_STATUS.idle);
  async function createUser(user: User) {
    createUserStatus.value = ACTION_STATUS.pending
    await create(user);
    createUserStatus.value = ACTION_STATUS.succeeded
  }

  return {
    users,
    usersCount,
    usersCountStatus: countStatus,
    getUsers,

    count,
    countStatus,
    getCount,

    user,
    userStatus,
    getProduct,

    updateUserStatus,
    updateUser,

    createUserStatus,
    createUser,
  }
});
