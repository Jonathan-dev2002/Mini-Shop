<template>

    <HeroSection />

    <!-- Categories Section -->
    <!-- <section class="bg-white pb-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">หมวดหมู่สินค้า</h2>

            <div v-if="categoryLoading" class="text-center text-gray-500 py-4">กำลังโหลดหมวดหมู่...</div>
            <div v-else-if="categoryError" class="text-center text-red-500 py-4">เกิดข้อผิดพลาดในการโหลดหมวดหมู่</div>
            <div v-else-if="!categories || categories.length === 0" class="text-center text-gray-500 py-4">
                ไม่พบข้อมูลหมวดหมู่</div>

            <div v-else class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">

                <NuxtLink v-for="(category, index) in categories" :key="category.id" :to="`/categorys/${category.id}`"
                    class="text-center group cursor-pointer">

                    <div :class="[
                        'w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg',
                        colorClasses[index % colorClasses.length]
                    ]">
                        <img v-if="category.imageUrl" :src="category.imageUrl" :alt="category.name" class="w-8 h-8" />
                    </div>

                    <p class="text-sm font-medium text-gray-700  transition-colors">{{
                        category.name }}</p>

                </NuxtLink>
            </div>
        </div>
    </section> -->

    <!-- Categories Section -->
    <section class="bg-white pb-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">หมวดหมู่สินค้า</h2>

            <div v-if="categoryLoading" class="text-center text-gray-500 py-4">กำลังโหลดหมวดหมู่...</div>
            <div v-else-if="categoryError" class="text-center text-red-500 py-4">เกิดข้อผิดพลาดในการโหลดหมวดหมู่</div>
            <div v-else-if="!categories || categories.length === 0" class="text-center text-gray-500 py-4">
                ไม่พบข้อมูลหมวดหมู่
            </div>

            <div v-else>
                <div v-if="categories.length <= 8"
                    class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-center">
                    <NuxtLink v-for="(category, index) in categories" :key="category.id"
                        :to="`/categorys/${category.id}`" class="text-center group cursor-pointer">
                        <div
                            :class="['w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg', colorClasses[index % colorClasses.length]]">
                            <img v-if="category.imageUrl" :src="category.imageUrl" :alt="category.name"
                                class="w-8 h-8" />
                            
                        </div>
                        <p class="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{{
                            category.name }}</p>
                    </NuxtLink>
                </div>

                <div v-else class="relative">
                    <swiper :modules="[SwiperNavigation]" :slides-per-view="8" :space-between="16" :navigation="{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }" :breakpoints="{
                        320: { slidesPerView: 3, spaceBetween: 10 },
                        640: { slidesPerView: 4, spaceBetween: 16 },
                        768: { slidesPerView: 6, spaceBetween: 16 },
                        1024: { slidesPerView: 8, spaceBetween: 16 },
                    }">
                        <swiper-slide v-for="(category, index) in categories" :key="category.id">
                            <NuxtLink :to="`/categorys/${category.id}`"
                                class="text-center group cursor-pointer block py-2">
                                <div
                                    :class="['w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg', colorClasses[index % colorClasses.length]]">
                                    <img v-if="category.imageUrl" :src="category.imageUrl" :alt="category.name"
                                        class="w-8 h-8" />
                                    
                                </div>
                                <p
                                    class="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                                    {{ category.name }}</p>
                            </NuxtLink>
                        </swiper-slide>
                    </swiper>

                    <div class="swiper-button-prev-custom">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div class="swiper-button-next-custom">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="bg-gray-50 py-12">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl font-bold text-gray-800">สินค้าแนะนำ</h2>
                <NuxtLink to="/productAll" class="text-orange-500 hover:text-orange-600 font-medium">ดูทั้งหมด →
                </NuxtLink>
            </div>
            <div v-if="productsPending">กำลังโหลดสินค้า...</div>
            <div v-else-if="productsError || !allProducts">ไม่พบสินค้า</div>
            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                <!-- Product Card -->
                <NuxtLink v-for="product in featuredProducts" :key="product.id" :to="`/products/${product.id}`"
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

    <FlashDeal />
    <Newsletter />


</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

import HeroSection from "~/components/HeroSection.vue"
import FlashDeal from "~/components/FlashDeal.vue"
import Newsletter from "~/components/Newsletter.vue"

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation } from 'swiper/modules'; // Renamed to avoid conflict

// 2. Import Swiper's CSS
import 'swiper/css';
import 'swiper/css/navigation';

const { token, user } = useAuth()

const allProducts = ref([])
const productsPending = ref(false)
const productsError = ref(null)

const categories = ref([])
const categoryLoading = ref(false)
const categoryError = ref(null)

const featuredProducts = ref([])

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

const colorClasses = [
    'bg-gradient-to-br from-red-400 to-pink-500',
    'bg-gradient-to-br from-blue-400 to-purple-500',
    'bg-gradient-to-br from-green-400 to-teal-500',
    'bg-gradient-to-br from-yellow-400 to-orange-500',
    'bg-gradient-to-br from-purple-400 to-indigo-500',
    'bg-gradient-to-br from-pink-400 to-red-500',
    'bg-gradient-to-br from-teal-400 to-cyan-500',
    'bg-gradient-to-r from-orange-400 to-red-500'
];

watch(allProducts, (newProducts) => {
    if (newProducts && newProducts.length > 0) {
        const shuffled = [...newProducts].sort(() => 0.5 - Math.random());
        featuredProducts.value = shuffled.slice(0, 4);
    }
}, { immediate: true });

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

/* Custom Swiper Navigation Buttons */
.swiper-button-prev-custom,
.swiper-button-next-custom {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4B5563;
    /* gray-600 */
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
}

.swiper-button-prev-custom:hover,
.swiper-button-next-custom:hover {
    background-color: #f3f4f6;
    /* gray-100 */
    color: #1f2937;
    /* gray-800 */
}

/* ถ้า Swiper อยู่ชิดขอบซ้าย-ขวา ปุ่มอาจจะล้นออกไป ให้ใช้ค่าติดลบ */
.swiper-button-prev-custom {
    left: -22px;
}

.swiper-button-next-custom {
    right: -22px;
}

/* ถ้าอยู่ในหน้าจอขนาดเล็ก ให้ปุ่มอยู่ข้างในแทน */
@media (max-width: 768px) {
    .swiper-button-prev-custom {
        left: 5px;
    }

    .swiper-button-next-custom {
        right: 5px;
    }
}

/* Swiper.js adds a "swiper-button-disabled" class when at the beginning/end */
.swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
}
</style>