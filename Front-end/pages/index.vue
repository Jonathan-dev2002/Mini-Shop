<template>
    <div>
        <template v-if="!token">
            <h1>please login</h1>
        </template>

        <template v-else>
            <h1 v-if="user?.role === 'ADMIN'">
                welcome Role, {{ user.firstName }}!
            </h1>
            <h1 v-else-if="user?.role === 'USER'">
                welcome Role, {{ user.firstName }}
            </h1>
        </template>
    </div>
    <div class="container">
        <div v-for="product in data">
            <div class="box">
                <h2>Name: {{ product.name }}</h2>
                <ul>
                    <li>Des: {{ product.description }}</li>
                    <li>Price: {{ product.price }}</li>
                    <li>Stock: {{ product.stock }}</li>
                    <li>Category: {{ product.category.name }}</li>

                </ul>
                <button @click="onAddToCart(product.id)" class="btn-add-cart">
                    🛒 เพิ่มลงตะกร้า
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { onMounted } from 'vue'
import { useCart } from '~/composables/useCart'

const { token, user, logout } = useAuth()
const { data: data } = await useFetch('http://localhost:3000/products')

const { addItem } = useCart()

const onAddToCart = (productId) => {
    addItem(productId.toString(),1)
}
// definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
.container {
    width: 1500px;
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
    background-color: rgb(231, 231, 231);
}

.btn-add-cart {
    background: #ff5722;
    color: white;
    padding: 0.5em 1em;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>