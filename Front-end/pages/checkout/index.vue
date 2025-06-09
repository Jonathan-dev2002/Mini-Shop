<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="max-w-6xl mx-auto px-6 py-5 border-b border-gray-200">
            <div class="flex items-center space-x-4">
                <div
                    class="w-12 h-12 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">ชำระเงิน</h1>
                    <p class="text-gray-500">ตรวจสอบข้อมูลและยืนยันการสั่งซื้อ</p>
                </div>
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-6 py-5">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden animate-slideUp">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-800">ที่อยู่จัดส่ง</h2>
                        </div>
                        <div class="p-6">
                            <div class="bg-gray-50 rounded-xl p-4">
                                <div v-if="addrLoading">กำลังโหลดที่อยู่...</div>
                                <div v-else-if="currentAddress" class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <div class="flex items-center mb-2">
                                            <span class="font-semibold text-gray-800 mr-2">{{
                                                currentAddress.recipientName }}</span>
                                            <span v-if="currentAddress.isDefault"
                                                class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">ค่าเริ่มต้น</span>
                                        </div>
                                        <p class="text-gray-600 text-sm mb-1">{{ currentAddress.label }}: {{
                                            currentAddress.street }}</p>
                                        <p class="text-gray-600 text-sm mb-1">{{ currentAddress.city }}, {{
                                            currentAddress.province }} {{ currentAddress.postalCode }}</p>
                                        <p class="text-gray-600 text-sm">โทร: {{ currentAddress.phone }}</p>
                                    </div>
                                    <button @click="openAddressModal"
                                        class="text-orange-500 cursor-pointer hover:text-orange-700 font-medium text-sm px-4 py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                                        เปลี่ยนที่อยู่
                                    </button>
                                </div>
                                <div v-else class="flex justify-between items-center">
                                    <p class="font-semibold text-gray-800">คุณยังไม่มีที่อยู่จัดส่ง กรุณาเพิ่มที่อยู่
                                    </p>
                                    <button @click="openAddressModal"
                                        class="text-orange-500 hover:text-orange-700 font-medium text-sm px-4 py-2 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                                        เพิ่ม / จัดการที่อยู่
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden animate-slideUp"
                        style="animation-delay: 0.1s">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-800">สรุปรายการสินค้า ({{ items.length }} รายการ)
                            </h2>
                        </div>
                        <div v-if="items && items.length > 0" class="divide-y divide-gray-200">
                            <div v-for="it in items" :key="it.id" class="p-6">
                                <div class="flex items-center space-x-4">
                                    <div class="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0">
                                        <img v-if="it.product.imageUrl" :src="it.product.imageUrl"
                                            :alt="it.product.name" class="w-full h-full object-cover rounded-xl">
                                        <div v-else class="w-full h-full rounded-xl bg-gray-200"></div>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-gray-800 mb-1">{{ it.product.name }}</h3>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-2">
                                                <span class="text-orange-500 font-semibold">฿{{
                                                    it.product.price.toFixed(2) }}</span>
                                                <span class="text-gray-400 text-sm">x {{ it.quantity }}</span>
                                            </div>
                                            <span class="font-bold text-gray-800">฿{{ (it.product.price *
                                                it.quantity).toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="p-6 text-center text-gray-500">ตะกร้าของคุณว่างเปล่า</div>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-6 animate-slideUp"
                        style="animation-delay: 0.2s">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-800">สรุปการชำระเงิน</h2>
                        </div>
                        <div class="p-6 space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">ยอดรวมสินค้า</span>
                                <span class="font-semibold">฿{{ grandTotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">ค่าจัดส่ง</span>
                                <span class="font-semibold text-green-600">ฟรี</span>
                            </div>
                            <hr class="border-gray-200">
                            <div class="flex justify-between items-center text-lg">
                                <span class="font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
                                <span class="font-bold text-orange-500 text-xl">฿{{ grandTotal.toFixed(2) }}</span>
                            </div>
                            <div class="bg-gray-50 rounded-xl p-4 mt-6">
                                <h3 class="font-medium text-gray-700 mb-3">วิธีการชำระเงิน</h3>
                                <div class="space-y-2">
                                    <label class="flex items-center space-x-3 cursor-pointer">
                                        <input type="radio" name="payment" value="cod"
                                            class="text-orange-500 focus:ring-orange-500" checked>
                                        <span class="text-sm text-gray-700">ชำระเงินปลายทาง (COD)</span>
                                    </label>
                                </div>
                            </div>
                            <button @click="onSubmitOrder" :disabled="!selectedAddressId || !items.length"
                                class="w-full cursor-pointer bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none transition-all duration-300 transform hover:scale-[1.02] mt-6">
                                ยืนยันสั่งซื้อ
                            </button>
                            <p class="text-xs text-gray-500 text-center mt-4">
                                การคลิก "ยืนยันสั่งซื้อ" หมายความว่าคุณยอมรับ
                                <a href="#" class="text-orange-500 hover:underline">เงื่อนไขการใช้งาน</a> และ
                                <a href="#" class="text-orange-500 hover:underline">นโยบายความเป็นส่วนตัว</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AddressModal :show="showAddressModal" :addresses="addresses" :defaultAddress="defaultAddress"
            :loading="addrLoading" :error="addrError" @close="closeAddressModal" @confirm-select="onConfirmSelect"
            @add-new="onSubmitNew" @edit-address="onSubmitEdit" @delete-address="onDeleteAddress"
            @set-default="onSetDefault" />
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useCheckout } from "~/composables/useCheckout";
import AddressModal from "~/components/AddressModal.vue";
// CartSummary component is no longer needed here as summary is built-in

const {
    items,
    addresses,
    defaultAddress,
    currentAddress,
    showAddressModal,
    selectedAddressId,
    addrLoading, // <-- destructure the new properties
    addrError,   // <-- destructure the new properties
    init,
    openAddressModal,
    closeAddressModal,
    onConfirmSelect,
    onSubmitNew,
    onSubmitEdit,
    onDeleteAddress,
    onSetDefault,
    onSubmitOrder,
} = useCheckout();

// We need to calculate grandTotal here for the Payment Summary
const grandTotal = computed(() => {
    if (!items.value || items.value.length === 0) return 0;
    return items.value.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
});

definePageMeta({ middleware: 'auth' });

onMounted(init);
</script>

<style scoped>
/* Custom animations - No changes needed here */
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
    animation: slideUp 0.8s ease-out;
}
</style>