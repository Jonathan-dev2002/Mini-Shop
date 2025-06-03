<template>
    <div v-if="order" class="order-detail">
        <h1>Order #{{ order.id }}</h1>
        <p>วันที่: {{ new Date(order.createdAt).toLocaleString() }}</p>
        <p>ที่อยู่ส่ง: {{ order.shippingAddress }}</p>
        <p>เบอร์โทร: {{ order.phone }}</p>
        <p>สถานะ: {{ order.status }}</p>

        <h2>สินค้าในออร์เดอร์</h2>
        <table>
            <thead>
                <tr>
                    <th>สินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="it in order.items" :key="it.id">
                    <td>{{ it.product.name }}</td>
                    <td>฿{{ it.product.price }}</td>
                    <td>{{ it.quantity }}</td>
                    <td>฿{{ (it.product.price * it.quantity).toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
        <p>
            ยอดรวมทั้งหมด: ฿
            {{order.items.reduce((s, i) => s + i.product.price * i.quantity, 0).toFixed(2)}}
        </p>

        <div v-if="user.role === 'ADMIN'||'USER'">
            <button @click="onUpdateStatus('CANCELLED')" :disabled="order.status !== 'CONFIRMED'">
                ยกเลิก (Cancel)
            </button>
            <button @click="onUpdateStatus('COMPLETED')" :disabled="order.status !== 'CONFIRMED'">
                ได้รับสินค้าเเล้ว (Complete)
            </button>
        </div>
    </div>

    <div v-else class="loading">
        <p>Loading order…</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrder } from '~/composables/useOrder'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { current: order, fetchOrder, updateStatus } = useOrder()
const { user } = useAuth()

onMounted(() => {
    fetchOrder(route.params.id)
})

const onUpdateStatus = async (newStatus) => {
    await updateStatus(order.value.id, newStatus)
}
</script>

<style scoped>
.order-detail {
    max-width: 800px;
    margin: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
}

th,
td {
    padding: 0.5em;
    border: 1px solid #ccc;
    text-align: center;
}

button {
    margin-right: 0.5em;
}
</style>
