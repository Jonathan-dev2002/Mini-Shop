<template>
    <div>
        <template v-if="!token">
            <h1>Please login</h1>
        </template>
        <template v-else>
            <h1 v-if="user?.role === 'ADMIN'">
                Welcome Admin, {{ user.firstName }}!
            </h1>
            <h1 v-else-if="user?.role === 'USER'">
                Welcome User, {{ user.firstName }}
            </h1>
        </template>
    </div>

    <div class="category-section">
        <h2>หมวดหมู่สินค้า</h2>
        <div v-if="categoryLoading">กำลังโหลดหมวดหมู่...</div>
        <div v-else-if="categoryError">เกิดข้อผิดพลาดในการโหลดหมวดหมู่</div>
        <ul v-else class="category-list">
            <li v-for="category in categories" :key="category.id">
                <NuxtLink :to="`/categorys/${category.id}`" class="category-link">
                    {{ category.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>

    <hr />
    <div class="container">
        <div v-if="productsPending">กำลังโหลดสินค้า...</div>
        <div v-else-if="productsError || !allProducts">ไม่พบสินค้า</div>
        <div v-else v-for="product in allProducts" :key="product.id">
            <NuxtLink :to="`/products/${product.id}`" class="box">
                <h2>Name: {{ product.name }}</h2>
                <ul>
                    <li>Des: {{ product.description }}</li>
                    <li>Price: {{ product.price }}</li>
                    <li>Stock: {{ product.stock }}</li>
                    <li v-if="product.category">Category: {{ product.category.name }}</li>
                </ul>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'

const { token, user } = useAuth()
const { data: allProducts, pending: productsPending, error: productsError } = await useFetch('http://localhost:3000/products')

const categories = ref([])
const categoryLoading = ref(false)
const categoryError = ref(null)

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

onMounted(async () => {
    await fetchCategoriesData()
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