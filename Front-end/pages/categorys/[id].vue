<template>
    <section class="bg-gray-50 py-12 min-h-screen">
        <div class="max-w-7xl mx-auto px-6">

            <div v-if="pendingCategory || pendingProducts" class="text-center py-10">
                <h2 class="text-2xl font-semibold text-gray-500">กำลังโหลดข้อมูล...</h2>
            </div>

            <div v-else-if="categoryError || productsError" class="text-center py-10">
                <h2 class="text-2xl font-bold text-red-500">เกิดข้อผิดพลาด</h2>
                <p class="text-gray-600 mt-2">ไม่สามารถโหลดข้อมูลได้ในขณะนี้</p>
                <NuxtLink to="/" class="mt-4 inline-block text-blue-500 hover:underline">กลับไปหน้าแรก</NuxtLink>
            </div>

            <div v-else>
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
                    <span v-if="categoryData">หมวดหมู่: {{ categoryData.name }}</span>
                    <span v-else>สินค้าทั้งหมด</span>
                </h2>

                <div v-if="!productsData || productsData.length === 0" class="text-center py-10 text-gray-500">
                    <p class="text-lg">ไม่พบสินค้าในหมวดหมู่นี้</p>
                </div>

                <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    <div v-for="product in productsData" :key="product.id"
                        class="bg-white rounded-2xl shadow-sm card-hover overflow-hidden group flex flex-col">
                        <NuxtLink :to="`/products/${product.id}`" class="block">
                            <div
                                class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                                <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                                <div v-else
                                    class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                    ไม่มีรูปภาพ
                                </div>
                                <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div class="p-4">
                                <h3 class="font-medium text-gray-800 text-sm mb-2 h-10 line-clamp-2">{{ product.name }}
                                </h3>
                                <div class="flex items-center space-x-2 mb-2">
                                    <span class="text-orange-500 font-bold">฿{{ product.price.toFixed(2) }}</span>
                                </div>
                            </div>
                        </NuxtLink>

                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const categoryId = route.params.id
const nuxtApp = useNuxtApp()


const { data: categoryData, pending: pendingCategory, error: categoryError } = await useAsyncData(
    `category-${categoryId}`,
    () => nuxtApp.$api(`/categorys/${categoryId}`)
)

const { data: productsData, pending: pendingProducts, error: productsError } = await useAsyncData(
    `products-in-category-${categoryId}`,
    () => nuxtApp.$api(`/products?categoryId=${categoryId}`)

)

const { addItem, items: cartItems } = useCart()

const handleAddToCart = (product) => {
    const token = useCookie('token').value
    if (!token) {
        return navigateTo('/login')
    }
    if (product && product.id) {
        addItem(product.id.toString(), 1)
        alert(`${product.name} ถูกเพิ่มลงในตะกร้าแล้ว!`)
    }
}


if (!categoryId) {
    console.warn('Category ID not found in route params.')
}
// definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
.category-section {
    margin: 20px auto;
    padding: 15px;
    max-width: 1200px;
    text-align: center;
}

.category-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.category-link {
    display: block;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
}

.category-link:hover {
    background-color: #007bff;
    color: white;
}

.container {
    width: 1500px;
    /* อาจจะต้องปรับตาม layout โดยรวม */
    margin: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2em;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    width: 400px;
    text-decoration: none;
    color: black;
    background-color: rgb(231, 231, 231);
    border-radius: 8px;
    /* เพิ่มความสวยงาม */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* เพิ่มเงา */
}

.box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    /* เงาเมื่อ hover */
}

.btn-add-cart {
    background: #ff5722;
    color: white;
    padding: 0.5em 1em;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-top: auto;
    /* ดันปุ่มไปด้านล่างสุดของ box */
}

hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, .1);
}
</style>