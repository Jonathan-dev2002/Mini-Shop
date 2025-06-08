<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Main Login Section -->
    <main class="flex-1 flex items-center justify-center py-12 px-6 relative">

      <div class="w-full max-w-md relative z-10">
        <!-- Login Card -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 animate-slideUp">
          <!-- Logo Section -->
          <div class="text-center mb-8">
            <div
              class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center shadow-lg animate-pulse-custom">
              <span class="text-3xl font-bold text-white">S</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">สมัครสมาชิก</h2>
            <p class="text-gray-600">เริ่มต้นช้อปปิ้งกับเราวันนี้</p>
          </div>

          <!-- reg Form -->
          <form @submit.prevent="submitRegister" class="space-y-6" id="loginForm">
            <!-- name Field -->
            <div class="space-y-2">
              <label for="firstName" class="block text-sm font-medium text-gray-700">ชื่อ</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input id="firstName" v-model="firstName" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 input-focus"
                  placeholder="กรอกชื่อของคุณ">
              </div>
            </div>

            <!-- name Field -->
            <div class="space-y-2">
              <label for="lastName" class="block text-sm font-medium text-gray-700">นามสกุล</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input id="lastName" v-model="lastName" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 input-focus"
                  placeholder="กรอกนามสกุลของคุณ">
              </div>
            </div>

            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">อีเมล</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input id="email" type="email" v-model="email" required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 input-focus"
                  placeholder="กรอกอีเมลของคุณ">
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input type="password" id="password" v-model="password" required
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 input-focus"
                  placeholder="กรอกรหัสผ่านของคุณ">
                <div id="togglePassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5" id="eyeIcon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- confirm Password Field -->
            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 input-focus"
                  placeholder="ยืนยันรหัสผ่านของคุณ">
                <div id="toggleConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5" id="eyeIcon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- ข้อตกลงและเงื่อนไข -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember" name="remember" type="checkbox"
                  class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                <label for="terms" class="ml-3 block text-sm text-gray-700">
                  ฉันยอมรับ <a href="#"
                    class="text-orange-600 hover:text-orange-500 font-medium hover:underline">ข้อตกลงและเงื่อนไข</a>
                  และ <a href="#"
                    class="text-orange-600 hover:text-orange-500 font-medium hover:underline">นโยบายความเป็นส่วนตัว</a>
                </label>
              </div>
            </div>

            <!-- reg Button -->
            <button type="submit"
              class="w-full bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 btn-hover group">
              <span class="flex items-center justify-center">
                สมัครสมาชิก
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>

            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
            <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
          </form>

          <!-- Sign in Link -->
          <div class="text-center mt-8 pt-6 border-t border-gray-200">
            <p class="text-gray-600">
              มีบัญชีอยู่แล้ว?
              <NuxtLink to="/login" class="text-orange-600 hover:text-orange-500 font-medium hover:underline">
                เข้าสู่ระบบ</NuxtLink>
            </p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()
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

import { onMounted } from 'vue';

// onMounted จะสั่งให้โค้ดข้างในทั้งหมดเริ่มทำงาน
// ก็ต่อเมื่อหน้าเว็บแสดงผลบนเบราว์เซอร์ของผู้ใช้เรียบร้อยแล้ว
onMounted(() => {

  // --- Toggle Password Visibility ---
  const togglePasswordBtn = document.getElementById('togglePassword');

  // เพิ่มการตรวจสอบว่ามีปุ่มนี้ในหน้าจริงหรือไม่ ก่อนจะเพิ่ม event listener
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function () {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');

      // เพิ่มการตรวจสอบว่า element ของ input และ icon มีอยู่จริง
      if (passwordInput && eyeIcon) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
          `;
        } else {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          `;
        }
      }
    });
  }

  // --- Add CSS for ripple animation ---
  // การสร้าง style tag แบบนี้จะทำงานได้เมื่ออยู่ใน onMounted
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
  `;
  document.head.appendChild(style);

});

onMounted(() => {

  // --- Toggle Confirm Password Visibility ---
  const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

  if (toggleConfirmPasswordBtn) {
    toggleConfirmPasswordBtn.addEventListener('click', function () {
      const passwordInput = document.getElementById('confirmPassword');

      // แก้ไข #1: ค้นหา eyeIcon ที่อยู่ "ข้างใน" ปุ่มที่ถูกคลิกโดยตรง
      // เพื่อแก้ปัญหาการมี id ซ้ำกัน
      const eyeIcon = this.querySelector('svg'); // 'this' ในที่นี้คือตัวปุ่มที่ถูกคลิก

      if (passwordInput && eyeIcon) {

        // แก้ไข #2: ตรวจสอบ type ที่ถูกต้องคือ "password"
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
          `;
        } else {
          // แก้ไข #3: กำหนด type กลับไปเป็น "password"
          passwordInput.type = 'password';
          eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          `;
        }
      }
    });
  }

  // --- Add CSS for ripple animation ---
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
  `;
  document.head.appendChild(style);

});
</script>

<style scoped>
/* Custom animations */
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-pulse-custom {
  animation: pulse 2s infinite;
}

.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

.gradient-text {
  background: linear-gradient(135deg, #F53D2D, #FF6633, #FFB84D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.input-focus {
  transition: all 0.3s ease;
}

.input-focus:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(245, 61, 45, 0.2);
}

.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(245, 61, 45, 0.4);
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.floating-shapes::before,
.floating-shapes::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(245, 61, 45, 0.1), rgba(255, 102, 51, 0.1));
  animation: float 6s ease-in-out infinite;
}

.floating-shapes::before {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.floating-shapes::after {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
  animation-delay: 3s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>