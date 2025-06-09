<template>
    <div class="bg-gray-50 min-h-screen">

        <div v-if="pending" class="flex items-center justify-center h-screen">
            <p class="text-xl text-gray-600">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
        </div>

        <div v-else-if="error || !order" class="flex items-center justify-center h-screen">
            <div class="text-center">
                <h2 class="text-2xl font-bold text-red-600 mb-2">เกิดข้อผิดพลาด</h2>
                <p class="text-gray-500">ไม่พบข้อมูลคำสั่งซื้อ หรือไม่สามารถโหลดข้อมูลได้</p>
                <NuxtLink to="/orders" class="mt-4 inline-block text-blue-500 hover:underline">
                    กลับไปที่ประวัติการสั่งซื้อ</NuxtLink>
            </div>
        </div>

        <div v-else>
            <div class="max-w-6xl mx-auto px-6 py-5 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div
                        class="w-12 h-12 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">รายละเอียดคำสั่งซื้อ</h1>
                        <p class="text-gray-500">คำสั่งซื้อ #{{ order.id }}</p>
                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto px-6 py-8">
                <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 animate-slideUp">
                    <div class="p-6">
                        <div class="flex flex-wrap gap-4 justify-between items-center mb-4">
                            <div>
                                <h2 class="text-xl font-bold text-gray-800">สถานะคำสั่งซื้อ</h2>
                                <p class="text-sm text-gray-500">วันที่สั่งซื้อ: {{ new
                                    Date(order.createdAt).toLocaleString('th-TH') }}</p>
                            </div>
                            <span :class="getStatusClass(order.status)"
                                class="text-sm font-medium px-4 py-2 rounded-full status-badge">
                                {{ order.status }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 animate-slideUp"
                    style="animation-delay: 0.1s">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">ที่อยู่จัดส่ง</h3>
                        <div class="space-y-1 text-gray-600">
                            <p v-for="(line, index) in order.shippingAddress.split(', ')" :key="index">{{ line }}</p>
                            <p>เบอร์โทร: {{ order.phone }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm overflow-hidden animate-slideUp"
                    style="animation-delay: 0.2s">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">รายการสินค้า ({{ order.items.length }} รายการ)</h3>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div v-for="item in order.items" :key="item.id" class="p-6">
                            <div class="flex items-center space-x-4">
                                <div
                                    class="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
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
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span class="text-gray-500">ราคา:</span>
                                            <span class="text-orange-500 font-semibold ml-1">฿{{
                                                item.unitPrice.toFixed(2) }}</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">จำนวน:</span>
                                            <span class="font-medium ml-1">{{ item.quantity }}</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">ยอดรวม:</span>
                                            <span class="font-bold text-gray-800 ml-1">฿{{ (item.unitPrice *
                                                item.quantity).toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 bg-gray-50 border-t border-gray-200">
                        <div class="flex flex-col space-y-3 items-end">
                            <div class="flex justify-between w-full max-w-sm text-sm">
                                <span class="text-gray-600">ราคาสินค้า:</span>
                                <span class="font-medium">฿{{ totalAmount.toFixed(2) }}</span>
                            </div>
                            <div class="border-t border-gray-300 pt-3 mt-3 w-full max-w-sm">
                                <div class="flex justify-between items-center">
                                    <span class="text-lg font-bold text-gray-800">ยอดรวมทั้งหมด:</span>
                                    <span class="text-2xl font-bold text-orange-500">฿{{ totalAmount.toFixed(2)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="user && (user.role === 'ADMIN' || user.role === 'USER')"
                    class="mt-6 flex flex-col sm:flex-row gap-4 animate-slideUp" style="animation-delay: 0.3s">

                    <button @click="onUpdateStatus('CANCELLED')" :disabled="order.status !== 'CONFIRMED' || isUpdating"
                        class="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isUpdating ? 'กำลังอัปเดต...' : 'ยกเลิกคำสั่งซื้อ' }}
                    </button>

                    <button @click="onUpdateStatus('COMPLETED')" :disabled="order.status !== 'CONFIRMED' || isUpdating"
                        class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isUpdating ? 'กำลังอัปเดต...' : 'ได้รับสินค้าแล้ว' }}
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrder } from '~/composables/useOrder';
import { useAuth } from '~/composables/useAuth';

const route = useRoute();
const isUpdating = ref(false); // Add a loading state for update actions

// Assuming useOrder() returns pending and error states for fetchOrder
const { current: order, fetchOrder, updateStatus, pending, error } = useOrder();
const { user } = useAuth();

definePageMeta({ middleware: 'auth' });

onMounted(() => {
    fetchOrder(route.params.id);
});

// Calculate total from items array for consistency with other pages
const totalAmount = computed(() => {
    if (!order.value || !order.value.items) return 0;
    return order.value.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    // Note: It's better to use order.totalAmount directly if the API provides it.
    // return order.value.totalAmount;
});

const onUpdateStatus = async (newStatus) => {
    if (isUpdating.value) return; // Prevent double-clicking
    isUpdating.value = true;
    try {
        await updateStatus(order.value.id, newStatus);
        // The useOrder composable should handle re-fetching the order, so the UI updates automatically.
    } catch (err) {
        console.error('Failed to update status:', err);
        alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    } finally {
        isUpdating.value = false;
    }
};

// Helper function to get color classes for status badges
function getStatusClass(status) {
    switch (status) {
        case 'COMPLETED': return 'bg-green-100 text-green-800';
        case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
        case 'CANCELLED': return 'bg-red-100 text-red-800';
        case 'PENDING': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}
</script>

<style scoped>
/* Custom animations */
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

.status-badge {
    transition: all 0.3s ease;
}

.status-badge:hover {
    transform: scale(1.05);
}

.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>