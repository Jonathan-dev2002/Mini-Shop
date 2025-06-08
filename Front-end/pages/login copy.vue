<template>
    <h1>login</h1>
    <form @submit.prevent="submit">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
        </div>

        <button type="submit">Login</button>

        <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const { login } = useAuth()

const submit = async () => {
  errorMessage.value = ''
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (e) {
    console.error(e)
    errorMessage.value = 'เข้าสู่ระบบไม่สำเร็จ'
  }
}
</script>

<style scoped></style>