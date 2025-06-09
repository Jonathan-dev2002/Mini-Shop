<template>
    <!-- Featured Products -->
    <section class="bg-gray-50 py-12">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">สินค้าทั้งหมด</h2>

            <div v-if="productsPending">กำลังโหลดสินค้า...</div>
            <div v-else-if="productsError || !allProducts">ไม่พบสินค้า</div>
            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                <!-- Product Card -->
                <NuxtLink v-for="product in allProducts" :key="product.id" :to="`/products/${product.id}`"
                    class="block bg-white rounded-2xl shadow-sm card-hover overflow-hidden group cursor-pointer">

                    <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                        <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name"
                            class="w-full h-full object-cover">
                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            ไม่มีรูปภาพ
                        </div>
                        <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-medium text-gray-800 text-sm mb-2 line-clamp-2">{{ product.name }}
                        </h3>
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-orange-500 font-bold">฿{{ product.price }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

import HeroSection from "~/components/HeroSection.vue"
import FlashDeal from "~/components/FlashDeal.vue"
import Newsletter from "~/components/Newsletter.vue"


const { token, user } = useAuth()

const allProducts = ref([])
const productsPending = ref(false)
const productsError = ref(null)

const categories = ref([])
const categoryLoading = ref(false)
const categoryError = ref(null)

async function fetchProductsData() {
    productsPending.value = true
    productsError.value = null
    try {
        const nuxtApp = useNuxtApp()
        allProducts.value = await nuxtApp.$api('/products')
    } catch (e) {
        console.error('Failed to fetch products:', e)
        productsError.value = e
    } finally {
        productsPending.value = false
    }
}

async function fetchCategoriesData() {
    categoryLoading.value = true
    categoryError.value = null
    try {
        const nuxtApp = useNuxtApp()
        categories.value = await nuxtApp.$api('/categorys')
    } catch (e) {
        console.error('Failed to fetch categories:', e)
        categoryError.value = e
    } finally {
        categoryLoading.value = false
    }
}

onMounted(() => {
    // Add click effects to product cards
    const productCards = document.querySelectorAll('.card-hover');
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Search bar animation
    const searchInput = document.querySelector('input[type="search"]');

    // เพิ่มการตรวจสอบเผื่อหน้านั้นไม่มีช่อง search
    if (searchInput) {
        searchInput.addEventListener('focus', function () {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1.02)';
            }
        });
        searchInput.addEventListener('blur', function () {
            if (this.parentElement) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });
    }
});

onMounted(async () => {
    await Promise.all([
        fetchProductsData(),
        fetchCategoriesData()
    ])
})

// definePageMeta({ middleware: 'auth' }) // ถ้าหน้าแรกไม่จำเป็นต้อง login ให้เอาออก
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