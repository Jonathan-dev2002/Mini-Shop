<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="max-w-6xl mx-auto px-6 py-5 border-b border-gray-200">
            <div class="flex items-center space-x-4">
                <div
                    class="w-12 h-12 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 17.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">ประวัติการสั่งซื้อ</h1>
                    <p class="text-gray-500">รายการคำสั่งซื้อทั้งหมดของคุณ</p>
                </div>
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-6 py-8">
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 animate-slideUp">
                <div class="p-6">
                    <div class="flex flex-wrap gap-4 items-center">
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium text-gray-700">สถานะ:</label>
                            <select
                                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500">
                                <option value="">ทั้งหมด</option>
                                <option value="COMPLETED">เสร็จสิ้น</option>
                                <option value="CONFIRMED">กำลังดำเนินการ</option>
                                <option value="CANCELLED">ยกเลิก</option>
                                <option value="PENDING">รอชำระเงิน</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="pending" class="text-center py-10">กำลังโหลดรายการสั่งซื้อ...</div>
            <div v-else-if="error" class="text-center py-10 text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>
            <div v-else-if="!orders || orders.length === 0" class="text-center py-10 text-gray-500">
                <p class="text-lg">คุณยังไม่มีคำสั่งซื้อใด ๆ</p>
            </div>

            <div v-else class="space-y-6">
                <div v-for="(o, index) in orders" :key="o.id"
                    class="bg-white rounded-2xl shadow-sm overflow-hidden animate-slideUp card-hover"
                    :style="{ animationDelay: `${index * 0.1}s` }">

                    <div class="p-6 border-b border-gray-200">
                        <div class="flex flex-wrap gap-2 justify-between items-center">
                            <div>
                                <h3 class="text-lg font-bold text-gray-800">คำสั่งซื้อ #{{ o.id }}</h3>
                                <p class="text-sm text-gray-500">วันที่สั่งซื้อ: {{ new
                                    Date(o.createdAt).toLocaleString('th-TH') }}</p>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span :class="getStatusClass(o.status)"
                                    class="text-sm font-medium px-3 py-1 rounded-full status-badge">
                                    {{ o.status }}
                                </span>
                                <span class="text-lg font-bold text-orange-500">฿{{ o.totalAmount.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="divide-y divide-gray-200">
                        <div v-for="item in o.items" :key="item.id" class="p-6">
                            <div class="flex items-center space-x-4">
                                <div
                                    class="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
                                    <img v-if="item.product && item.product.imageUrl" :src="item.product.imageUrl"
                                        :alt="item.product.name" class="w-full h-full object-cover rounded-xl">

                                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 mb-1">{{ item.product.name }}</h4>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-4">
                                            <span class="text-orange-500 font-semibold">฿{{ item.unitPrice.toFixed(2)
                                            }}</span>
                                            <span class="text-gray-500 text-sm">จำนวน: {{ item.quantity }}</span>
                                        </div>
                                        <span class="font-bold text-gray-800">฿{{ (item.unitPrice *
                                            item.quantity).toFixed(2) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-gray-50 border-t border-gray-200">
                        <div class="flex justify-end items-center">
                            <NuxtLink :to="`/orders/${o.id}`"
                                class="text-orange-500 hover:text-orange-700 font-medium text-sm px-4 py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                                ดูรายละเอียด
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrder } from '~/composables/useOrder'

definePageMeta({ middleware: 'auth' })

const { orders, fetchOrders, pending, error } = useOrder() // Assuming useOrder exposes pending/error states

onMounted(fetchOrders)

// Helper function to get color classes for status badges
function getStatusClass(status) {
    switch (status) {
        case 'COMPLETED':
            return 'bg-green-100 text-green-800';
        case 'CONFIRMED':
            return 'bg-blue-100 text-blue-800';
        case 'CANCELLED':
            return 'bg-red-100 text-red-800';
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
</script>

<style scoped>
/* Custom animations - No changes needed, they are in the template's style block already */
@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-slideUp {
    animation: slideUp 0.8s ease-out forwards;
    opacity: 0;
}

/* Forwards keeps the final state */

.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.04);
}

.status-badge {
    transition: all 0.3s ease;
}

.status-badge:hover {
    transform: scale(1.05);
}
</style>