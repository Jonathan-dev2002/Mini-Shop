<template>
  <div class="product-detail">
    <div v-if="pending">กำลังโหลด…</div>
    <div v-else-if="error">โหลดสินค้าไม่สำเร็จ</div>
    <div v-else>
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>ราคา: ฿{{ product.price }}</p>
      <p>คงเหลือ: {{ product.stock }}</p>
      <p>หมวดหมู่: {{ product.category.name }}</p>

      <button
        class="btn-add-cart"
        @click="addItem(product.id)"
        :disabled="product.stock <= 0"
      >🛒 ใส่ตะกร้า</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'

// อ่านพารามจาก route
const route = useRoute()
const { data: product, pending, error } = await useFetch(
  `/products/${route.params.id}`,
  { key: `product-${route.params.id}` }
)

const { addItem } = useCart()
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #fafafa;
  border-radius: 4px;
}
.btn-add-cart {
  margin-top: 1rem;
  padding: 0.5em 1em;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-add-cart:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
