<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form @submit="onSubmit" :validationSchema="validationSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useAuthStore } from '@/stores'

const login_in_submission = ref(false)
const login_show_alert = ref(false)
const login_alert_variant = ref('bg-blue-500')
const login_alert_msg = ref('Please wait! we are logging you in.')
const store = useAuthStore()

const validationSchema = object({
  email: string().email().required(),
  password: string().min(3).max(32).required()
})

const { handleSubmit, defineField } = useForm({
  validationSchema
})

const onSubmit = handleSubmit(async (values) => {
  login_in_submission.value = true
  login_show_alert.value = true
  login_alert_variant.value = 'bg-blue-500'
  login_alert_msg.value = 'Please wait! We are logging you in.'

  try {
    console.log(values)
    const { email, password } = values
    await store.login(email, password)
    await new Promise((resolve) => {
      setTimeout(() => resolve(values), 3000)
    })
  } catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'bg-red-500'
    login_alert_msg.value = 'Invalid login details.'
    return
  }

  login_alert_variant.value = 'bg-green-500'
  login_alert_msg.value = 'Success! You are now logged in.'
  window.location.reload()
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
</script>
