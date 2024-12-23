<template>
  <div class="sign-in">
    <OdsText class="sign-in__title" :preset="ODS_TEXT_PRESET.heading1">
        Welcome to the ODS Vue Playground App
    </OdsText>

    <form class="sign-in__form" @submit.prevent="onFormSubmit">
      <OdsFormField :error="error.username">
        <label>
          Username:
        </label>

        <OdsInput class="sign-in__form__username"
                  :hasError="!!error.username"
                  name="username"
                  @onOdsBlur="validateField($event, 'username')"
                  :type="ODS_INPUT_TYPE.text" />
      </OdsFormField>

      <OdsFormField :error="error.password">
        <label>
          Password:
        </label>

        <OdsPassword class="sign-in__form__password"
                     :hasError="!!error.password"
                     name="password"
                     @onOdsBlur="validateField($event, 'password')" />
      </OdsFormField>

      <OdsButton class="sign-in__form__submit"
                 :color="ODS_BUTTON_COLOR.primary"
                 :isLoading="isLoading"
                 label="Sign In"
                 type="submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { OdsText, OdsInput, OdsButton, OdsFormField, OdsPassword } from '@ovhcloud/ods-components/vue';
import { ODS_BUTTON_COLOR, ODS_INPUT_TYPE, ODS_TEXT_PRESET } from '@ovhcloud/ods-components';
import { ref, watch } from 'vue';
import * as yup from 'yup'
import { useSessionStore } from '@/stores/modules/session';
import { useToast } from 'vue-toast-notification';
import { ACTION_STATUS } from '@/constants/action';
import { useRouter } from 'vue-router';
import { Routes } from '@/router/route';

const validationSchema = yup.object({
  password: yup.string().required('Password has to be set'),
  username: yup.string().required('Username has to be set'),
})

const error = ref<Record<string, string>>({})
const isLoading = ref(false)
const sessionStore = useSessionStore()
const toast = useToast({ position: 'bottom-left' })
const router = useRouter()

watch(() => sessionStore.signInStatus,
  () => {
    if (sessionStore.signInStatus === ACTION_STATUS.failed) {
      toast.error('Something went wrong while signing in')
    } else if (sessionStore.signInStatus === ACTION_STATUS.succeeded) {
      router.push({ name: Routes.DASHBOARD })
    }
  }
)

async function onFormSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const formObj = Object.fromEntries(formData.entries())

  try {
    if (await validationSchema.isValid(formObj)) {
      error.value = {}
      isLoading.value = true;
      sessionStore.signIn(formData.get('username') as string, formData.get('password') as string)
      isLoading.value = false;
    } else {
      await validationSchema.validate(formObj, { abortEarly: false })
    }
  } catch(err) {
    error.value = ((err as yup.ValidationError).inner || []).reduce((res, error) => {
      if (error.path) {
        res[error.path] = error.message
      }
      return res
    }, {} as Record<string, string>)
  }
}

async function validateField(e: Event, fieldName: string) {
  try {
    await validationSchema.validateAt(fieldName, { [fieldName]: (e.target as HTMLInputElement).value })
    error.value = {
      ...error.value,
      [fieldName]: '',
    }
  } catch(err) {
    error.value = {
      ...error.value,
      [fieldName]: (err as yup.ValidationError).message,
    }
  }
}
</script>

<style lang="scss">
.sign-in {
  display: flex;
  flex-flow: column;
  grid-row-gap: 2rem;
  justify-content: center;
  margin: auto;
  width: 300px;
  height: 100%;

  &__title {
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-row-gap: 1rem;

    &__username, &__password, &__submit {
      display: grid;
    }
  }
}

</style>
