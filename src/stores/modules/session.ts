import { defineStore } from 'pinia';
import { signIn as signInReq, signOut as signOutReq } from '../services/session';
import { ref } from 'vue';
import { ACTION_STATUS } from '@/constants/action';

export const useSessionStore = defineStore('session', () => {
  const signInStatus = ref(ACTION_STATUS.idle)
  const signOutStatus = ref(ACTION_STATUS.idle)

  async function signIn(username: string, password: string) {
    try {
      signInStatus.value = ACTION_STATUS.pending
      await signInReq(username, password);
      signInStatus.value = ACTION_STATUS.succeeded
      signOutStatus.value = ACTION_STATUS.idle
    } catch {
      signInStatus.value = ACTION_STATUS.failed
    }
  }

  async function signOut() {
    try {
      signOutStatus.value = ACTION_STATUS.pending
      await signOutReq();
      signInStatus.value = ACTION_STATUS.idle
      signOutStatus.value = ACTION_STATUS.succeeded
    } catch {
      signOutStatus.value = ACTION_STATUS.failed
    }
  }

  return {
    signIn,
    signOut,
    signInStatus,
    signOutStatus,
  }
})
