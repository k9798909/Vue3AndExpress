<script setup lang="ts">
import axios from '@/axios'
import { useRouterStore } from '@/stores/routerStore'
import { AxiosError } from 'axios'
import { inject, provide, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
const loginForm: Ref<{
  account: string
  password: string
}> = ref({
  account: '',
  password: ''
})
const loginClick = async () => {
  try {
    const res = await axios.post('/api/auth/login', loginForm.value)
    sessionStorage.setItem('token', res.data.token)
    const store = useRouterStore()
    const beforeTo: string = store.getBeforeRoute()!
    router.push(beforeTo)
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      alert(error.response?.data)
    }
  }
}
</script>

<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="loginForm.account"
        density="compact"
        placeholder="address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        v-model="loginForm.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn @click="loginClick" class="mb-8" color="blue" size="large" variant="tonal" block>
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<style></style>
