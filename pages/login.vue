<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({
  layout: 'noNav'
})

interface LoginFormState {
  email: string
  password: string
}

const form = reactive<LoginFormState>({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const handleSubmit = async () => {
  error.value = null

  if (!validateEmail(form.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  loading.value = true

  try {
    // Simulate async login (replace with your real logic, like useAuth)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Logging in with:', form)
    // Redirect or do something with auth here
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Login to your account</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            autocomplete="email"
            required
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            autocomplete="current-password"
            required
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          />
        </div>

        <div v-if="error" class="text-sm text-red-500">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            :disabled="loading"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>