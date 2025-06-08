<template>
    <section class="h-[100vh]">
        <!-- Cart Header -->
        <div class="max-w-6xl mx-auto px-6 py-5 border-b border-orange-200">
            <div class="flex items-center space-x-4">
                <div
                    class="w-12 h-12 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">ตะกร้าสินค้าของคุณ</h1>
                    <p class="text-gray-500">จัดการสินค้าที่คุณเลือกไว้</p>
                </div>
            </div>
        </div>

        <!-- Cart Content -->
        <div class="max-w-6xl mx-auto px-6 py-5">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Cart Items -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-800">สินค้าในตะกร้า (<span id="total-items">{{
                                    totalCount }}</span>
                                รายการ)</h2>
                        </div>

                        <div v-if="items.length" id="cart-items" class="divide-y divide-gray-200">
                            <!-- Cart Item 1 -->
                            <div v-for="it in items" :key="it.id" class="cart-item p-6 animate-slideUp" data-price="290"
                                data-quantity="2">
                                <div class="flex items-center space-x-4">
                                    <!-- Product Image -->
                                    <div
                                        class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex-shrink-0">
                                        <div class="w-full h-full rounded-xl bg-gray-200"></div>
                                    </div>

                                    <!-- Product Details -->
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-gray-800 mb-1">{{ it.product.name }}</h3>
                                        <div class="flex items-center space-x-2">
                                            <span class="text-lg font-bold text-orange-500">฿{{ (it.product.price *
                                                1).toFixed(2) }}</span>
                                            <!-- <span class="text-sm text-gray-400 line-through">฿580</span> -->
                                            <!-- <span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">-50%</span> -->
                                        </div>
                                    </div>

                                    <!-- Quantity Controls -->
                                    <div class="flex items-center space-x-3">

                                        <div class="flex items-center space-x-4">
                                            <div
                                                class="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                                                <button
                                                    class="quantity-btn w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                    @click="updateItem(it.id, it.quantity - 1)"
                                                    :disabled="it.quantity <= 1">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M20 12H4"></path>
                                                    </svg>
                                                </button>
                                                <input type="number"
                                                    class="w-10 h-12 text-center font-bold text-gray-800 border-none focus:outline-none">{{
                                                        it.quantity }}
                                                <button
                                                    class="quantity-btn w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600"
                                                    @click="updateItem(it.id, it.quantity + 1)"
                                                    :disabled="it.quantity >= it.product.stock">
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M12 4v16m8-8H4"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <span class="text-gray-500">ชิ้น</span>
                                        </div>

                                        <!-- Item Total -->
                                        <div class="text-right min-w-[80px]">
                                            <div class="font-bold text-gray-800 item-total">฿{{ (it.product.price *
                                                it.quantity).toFixed(2) }}</div>
                                        </div>

                                        <!-- Remove Button -->
                                        <button @click="removeItem(it.id)"
                                            class="remove-item text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Empty Cart Message (Hidden by default) -->
                        <div v-else class="p-12 text-center">
                            <div
                                class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">ตะกร้าของคุณว่างเปล่า</h3>
                            <p class="text-gray-500 mb-6">เริ่มช้อปปิ้งเพื่อเพิ่มสินค้าลงในตะกร้า</p>
                            <NuxtLink to="/"
                                class="bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                                เริ่มช้อปปิ้ง
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-6">
                        <div class="p-6 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-800">สรุปคำสั่งซื้อ</h2>
                        </div>

                        <div class="p-6 space-y-4">
                            <!-- Subtotal -->
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">ยอดรวมสินค้า</span>
                                <span class="font-semibold" id="subtotal">฿{{ grandTotal.toFixed(2) }}</span>
                            </div>

                            <!-- Shipping -->
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">ค่าจัดส่ง</span>
                                <div class="text-right">
                                    <span class="font-semibold text-green-600" id="shipping">ฟรี</span>

                                </div>
                            </div>



                            <!-- Divider -->
                            <hr class="border-gray-200">

                            <!-- Total -->
                            <div class="flex justify-between items-center text-lg">
                                <span class="font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
                                <span class="font-bold text-orange-500 text-xl" id="total">฿{{ grandTotal.toFixed(2)
                                }}</span>
                            </div>

                            <!-- Coupon Code -->
                            <div class="bg-gray-50 rounded-xl p-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">รหัสคูปอง</label>
                                <div class="flex space-x-2">
                                    <input type="text" placeholder="กรอกรหัสคูปอง"
                                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500">
                                    <button
                                        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                                        ใช้
                                    </button>
                                </div>
                            </div>

                            <!-- Checkout Button 
                                animate-pulse-custom 
                            -->
                            <div class="w-full flex">
                                <NuxtLink to="/checkout"
                                    class="w-full  bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white py-4   rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]  text-center">
                                    สั่งซื้อตอนนี้
                                </NuxtLink>
                            </div>
                            

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useCart } from '@/composables/useCart'

const { items, fetchCart, updateItem, removeItem, totalCount } = useCart()


definePageMeta({ middleware: 'auth' })

onMounted(fetchCart)

const grandTotal = computed(() =>
    items.value.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
)
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

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(20px);
    }
}

.animate-slideUp {
    animation: slideUp 0.8s ease-out;
}

.animate-pulse-custom {
    animation: pulse 2s infinite;
}

.animate-fadeOut {
    animation: fadeOut 0.3s ease-out forwards;
}

.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.04);
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

.quantity-input {
    -moz-appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
