<template>
    <div class="category-products-page">
        <div v-if="pendingCategory || pendingProducts">
            <p>กำลังโหลดข้อมูล...</p>
        </div>
        <div v-else-if="categoryError || productsError">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
            <pre v-if="categoryError">{{ categoryError }}</pre>
            <pre v-if="productsError">{{ productsError }}</pre>
        </div>
        <div v-else>
            <h1 v-if="categoryData">สินค้าในหมวดหมู่: {{ categoryData.name }}</h1>
            <h1 v-else>สินค้าในหมวดหมู่</h1>

            <div v-if="productsData && productsData.length > 0" class="products-grid">
                <div v-for="product in productsData" :key="product.id" class="product-card">
                    <NuxtLink :to="`/products/${product.id}`">
                        <h2>{{ product.name }}</h2>
                        <p>{{ product.description }}</p>
                        <p>ราคา: ฿{{ product.price.toFixed(2) }}</p>
                        <p>คงเหลือ: {{ product.stock }}</p>
                        </NuxtLink>
                     <button @click="handleAddToCart(product)" class="btn-add-to-cart" :disabled="product.stock <= 0">
                        🛒 เพิ่มลงตะกร้า
                    </button>
                </div>
            </div>
            <div v-else>
                <p>ไม่พบสินค้าในหมวดหมู่นี้</p>
            </div>
        </div>
        <NuxtLink to="/" class="back-link">กลับไปหน้าแรก</NuxtLink>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart' // ถ้าต้องการใช้ปุ่ม Add to cart

const route = useRoute()
const categoryId = route.params.id
const nuxtApp = useNuxtApp() // สำหรับการใช้ $api

// 1. ดึงข้อมูลของหมวดหมู่ปัจจุบัน (เพื่อให้รู้ชื่อหมวดหมู่)
const { data: categoryData, pending: pendingCategory, error: categoryError } = await useAsyncData(
    `category-${categoryId}`,
    () => nuxtApp.$api(`/categorys/${categoryId}`) // ใช้ $api หรือ $fetch
    // () => $fetch(`http://localhost:3000/categorys/${categoryId}`)
)

// 2. ดึงข้อมูลสินค้าที่อยู่ในหมวดหมู่นี้
// !!! Backend API Endpoint ที่สำคัญ !!!
// คุณจะต้องมี API สำหรับดึงสินค้าตาม categoryId
// ตัวอย่าง: GET http://localhost:3000/products?categoryId=[ID]
// หรือ GET http://localhost:3000/categorys/[ID]/products
const { data: productsData, pending: pendingProducts, error: productsError } = await useAsyncData(
    `products-in-category-${categoryId}`,
    () => nuxtApp.$api(`/products?categoryId=${categoryId}`) // << --- ปรับ endpoint นี้ให้ตรงกับ backend ของคุณ
    // () => $fetch(`http://localhost:3000/products?categoryId=${categoryId}`) // ตัวอย่างการใช้ $fetch โดยตรง
    // หรือถ้า backend return สินค้ามาพร้อมกับ category data ตอน fetch category (ไม่แนะนำสำหรับ REST)
    // ก็สามารถใช้ categoryData.value.products ได้เลย (ถ้ามี)
)

// ส่วนของการเพิ่มสินค้าลงตะกร้า (ถ้าต้องการ)
const { addItem, items: cartItems } = useCart() // สมมติว่า fetchCart ถูกเรียกใน layout หรือ onMounted ที่อื่นแล้ว

const handleAddToCart = (product) => {
    const token = useCookie('token').value
    if (!token) {
        return navigateTo('/login')
    }
    if (product && product.id) {
        // อาจจะมีการตรวจสอบ stock หรือ quantity ที่ซับซ้อนกว่านี้เหมือนในหน้า product/[id].vue
        addItem(product.id.toString(), 1)
        // อาจจะมี toast notification
        alert(`${product.name} ถูกเพิ่มลงในตะกร้าแล้ว!`)
    }
}

// ป้องกันการเข้าถึงหน้านี้หากไม่มี categoryId (อาจจะไม่จำเป็นถ้า routing จัดการดีแล้ว)
if (!categoryId) {
    // หรือ navigateTo('/') หรือแสดงข้อความ error
    console.warn('Category ID not found in route params.')
}

// ถ้าต้องการให้หน้านี้มีการ authentication
// definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
.category-products-page {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
}

.product-card a {
    text-decoration: none;
    color: inherit;
    flex-grow: 1; /* ทำให้ link ขยายเต็มพื้นที่ก่อนปุ่ม */
}

.product-card h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.product-card img { /* ถ้ามีรูปภาพ */
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 4px;
}

.btn-add-to-cart {
    background: #ff5722;
    color: white;
    padding: 8px 15px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9em;
    margin-top: 10px; /* เว้นระยะจาก content ด้านบน */
    transition: background-color 0.2s;
}
.btn-add-to-cart:hover {
    background: #e64a19;
}
.btn-add-to-cart:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.back-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
.back-link:hover {
    background-color: #5a6268;
}
</style>