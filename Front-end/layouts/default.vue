<template>
  <div>
    <header>
      <nav>
        <h1 class="logo">Shop</h1>
        <NuxtLink to="/">หน้าแรก</NuxtLink>
        <NuxtLink to="/cart" class="cart-icon">
          🛒 <span v-if="totalCount">{{ totalCount }}</span>
        </NuxtLink>


        <template v-if="!token">
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/register" style="margin-left: 1em;">Register</NuxtLink>
        </template>

        <template v-else-if="user && user.role === 'ADMIN'">
          <NuxtLink to="/products">Products</NuxtLink>
          <NuxtLink to="/categorys">Categorys</NuxtLink>
          <NuxtLink to="/manageAcc">Manage Accout</NuxtLink>
          <span>{{ user.firstName }}</span>
          <button @click="logout" style="margin-left: 1em;">Logout</button>
        </template>
        
        <template v-else-if="user && user.role === 'USER'">
          <span>{{ user.firstName }}</span>
          <button @click="logout" style="margin-left: 1em;">Logout</button>
        </template>
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

</script>

<style>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgb(124, 124, 124);
  padding: 1em;


  a,
  span {
    text-decoration: none;
    color: white
  }

  .logo {
    margin-right: auto;
    color: white
  }
}

.cart-icon {
  position: relative;
  font-size: 1.5em;
}

.cart-icon span {
  position: absolute;
  top: -6px;
  right: -10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75em;
}
</style>