<template>
  <div class="register-form">

    <h1>Register</h1>
    <form @submit.prevent="submitRegister">
      <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="lastName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
    </form>

    <p>
      already have an account?
      <NuxtLink to="/login">Login here</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const email        = ref('')
const password     = ref('')
const confirmPassword= ref('')
const firstName    = ref('')
const lastName     = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router       = useRouter()
const { register } = useAuth()

const submitRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง'
    return
  }
  try {
    await register(
      email.value,
      password.value,
      firstName.value,
      lastName.value
    )
    successMessage.value = 'สมัครสมาชิกสำเร็จ กรุณาไปล็อกอิน'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    console.error(err)
    errorMessage.value = 'เกิดข้อผิดพลาดในการสมัคร กรุณาลองใหม่'
  }
}
</script>

<style scoped></style>