<template>
  <div>
    <!-- Header -->
    <header class="bg-gradient-to-r from-[#F53D2D] via-[#FF6633] to-[#FFB84D] shadow-lg relative ">
      <div class="absolute inset-0 bg-black/10"></div>
      <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-20 relative z-10">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold gradient-text">S</span>
          </div>
          <h1 class="text-2xl font-bold text-white">ShopThai</h1>
        </NuxtLink>

        <!-- Search Bar -->
        <form class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <div
              class="flex items-center overflow-hidden rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm focus-within:border-white focus-within:shadow-lg transition-all duration-300">
              <input type="search"
                class="block h-12 w-full bg-transparent px-6 text-gray-800 placeholder-gray-500 focus:outline-none text-sm"
                placeholder="ค้นหาสินค้าและร้านค้า กว่า 10,000 รายการ" />

              <button type="submit"
                class="flex h-12 items-center justify-center bg-gradient-to-r from-[#F53D2D] to-[#FF6633] px-6 text-white hover:shadow-lg transition-all duration-300 group">
                <svg class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 20 20"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <!-- Cart & User -->
        <div class="flex items-center space-x-6">
          <!-- Cart -->
          <NuxtLink to="/cart" class="relative group cursor-pointer">
            <div class="relative">
              <div v-if="totalCount"
                class="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse-custom">
                {{ totalCount }}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-7 w-7 text-white group-hover:scale-110 transition-transform">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
          </NuxtLink>


          <!-- User Profile -->
          <div v-if="!token" class="flex items-center space-x-3 text-white cursor-pointer group">
            <div
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <NuxtLink to="/register" class="text-sm font-medium hidden md:block">สมัครสมาชิก</NuxtLink>
            <span>|</span>
            <NuxtLink to="/login" class="text-sm font-medium hidden md:block">เข้าสู่ระบบ</NuxtLink>
          </div>

          <!-- ADMIN Menu with Dropdown -->
          <div v-else-if="user && user.role === 'ADMIN'" class="relative group">
            <!-- Main Button -->
            <div class="relative flex items-center space-x-3 text-white cursor-pointer group">
              <div
                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span class="text-sm font-medium hidden md:block">{{ user.firstName }}</span>
            </div>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <!-- Arrow -->
              <div class="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

              <!-- Menu Items -->
              <div class="py-2">
                <a href="#"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm font-medium">บัญชีของฉัน</span>
                </a>

                <NuxtLink to ="/orders"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span class="text-sm font-medium">การซื้อของฉัน</span>
                </NuxtLink>

                <div class="border-t border-gray-100 my-1"></div>

                <NuxtLink to="/products"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span class="text-sm font-medium">Products</span>
                </NuxtLink>

                <NuxtLink to="/categorys"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span class="text-sm font-medium">Categorys</span>
                </NuxtLink>
                <NuxtLink to="/manageAcc"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span class="text-sm font-medium">Manage Accout</span>
                </NuxtLink>

                <div class="border-t border-gray-100 my-1"></div>

                <button @click="logout"
                  class="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span class="text-sm font-medium">ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </div>

          <!-- USER Menu with Dropdown -->
          <div v-else-if="user && user.role === 'USER'" class="relative group">
            <!-- Main Button -->
            <div class="relative flex items-center space-x-3 text-white cursor-pointer group">
              <div
                class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span class="text-sm font-medium hidden md:block">{{ user.firstName }}</span>
            </div>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <!-- Arrow -->
              <div class="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

              <!-- Menu Items -->
              <div class="py-2">
                <a href="#"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm font-medium">บัญชีของฉัน</span>
                </a>

                <NuxtLink to ="/orders"
                  class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span class="text-sm font-medium">การซื้อของฉัน</span>
                </NuxtLink>

                <div class="border-t border-gray-100 my-1"></div>

                <button @click="logout"
                  class="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span class="text-sm font-medium">ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'
import { onMounted, watch } from 'vue'

const { token, user, logout } = useAuth()
const { totalCount, fetchCart, clearCart } = useCart()

onMounted(() => {
  if (token.value) fetchCart()
})

watch(token, (tok) => {
  if (tok) fetchCart()
  else clearCart()
})


onMounted(() => {
  // Add click effects to product cards
  const productCards = document.querySelectorAll('.card-hover');
  productCards.forEach(card => {
    card.addEventListener('click', function () {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Search bar animation
  const searchInput = document.querySelector('input[type="search"]');

  // เพิ่มการตรวจสอบเผื่อหน้านั้นไม่มีช่อง search
  if (searchInput) {
    searchInput.addEventListener('focus', function () {
      if (this.parentElement) {
        this.parentElement.style.transform = 'scale(1.02)';
      }
    });
    searchInput.addEventListener('blur', function () {
      if (this.parentElement) {
        this.parentElement.style.transform = 'scale(1)';
      }
    });
  }
});
</script>

<style>
.gradient-text {
  background: linear-gradient(135deg, #F53D2D, #FF6633, #FFB84D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes pulse-custom {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.animate-pulse-custom {
  animation: pulse-custom 2s infinite;
}
</style>