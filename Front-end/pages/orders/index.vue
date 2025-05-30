<template>
    <div class="orders-page">
        <h1>ประวัติการสั่งซื้อ</h1>
        <table v-if="orders.length">
            <thead>
                <tr>
                    <th>#</th>
                    <th>วันที่</th>
                    <th>ยอดรวม</th>
                    <th>สถานะ</th>
                    <th>ดูรายละเอียด</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="o in orders" :key="o.id">
                    <td>{{ o.id }}</td>
                    <td>{{ new Date(o.createdAt).toLocaleString() }}</td>
                    <td>฿{{o.items.reduce((s, i) => s + i.product.price * i.quantity, 0).toFixed(2)}}</td>
                    <td>{{ o.status }}</td>
                    <td>
                        <NuxtLink :to="`/orders/${o.id}`">รายละเอียด</NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>คุณยังไม่มีคำสั่งซื้อใด ๆ</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrder } from '~/composables/useOrder'

const { orders, fetchOrders } = useOrder()
onMounted(fetchOrders)
</script>

<style scoped>
.orders-page {
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
</style>
