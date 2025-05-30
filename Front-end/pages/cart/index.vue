<template>
    <div class="cart-page">
        <h1>ตะกร้าของฉัน</h1>

        <table v-if="items.length">
            <thead>
                <tr>
                    <th>สินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                    <th>ลบ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="it in items" :key="it.id">
                    <td>{{ it.product.name }}</td>
                    <td>฿{{ it.product.price }}</td>
                    <td>
                        <button @click="updateItem(it.id, it.quantity - 1)" :disabled="it.quantity <= 1">−</button>
                        {{ it.quantity }}
                        <button @click="updateItem(it.id, it.quantity + 1)">＋</button>
                    </td>
                    <td>฿{{ (it.product.price * it.quantity).toFixed(2) }}</td>
                    <td>
                        <button @click="removeItem(it.id)">🗑️</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else>ตะกร้าว่างเปล่า</p>

        <div v-if="items.length" class="cart-actions">
            <p>ราคารวมทั้งหมด: ฿{{ grandTotal.toFixed(2) }}</p>
            <NuxtLink to="/checkout" class="btn-checkout">สั่งซื้อ (Checkout)</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useCart } from '@/composables/useCart'

const { items, fetchCart, updateItem, removeItem } = useCart()

onMounted(fetchCart)

const grandTotal = computed(() =>
    items.value.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
)
</script>

<style scoped>
.cart-page {
    max-width: 800px;
    margin: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 0.5em;
    border: 1px solid #ccc;
    text-align: center;
}

button {
    cursor: pointer;
}

.cart-actions {
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-checkout {
    background: #4caf50;
    color: white;
    padding: 0.6em 1.2em;
    text-decoration: none;
    border-radius: 4px;
}
</style>
