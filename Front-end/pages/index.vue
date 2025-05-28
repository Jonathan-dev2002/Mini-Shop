<template>
    <div>

        <template v-if="!token">
            <h1>please login</h1>
        </template>

        <template v-else>
            <h1 v-if="user?.role === 'ADMIN'">
                welcome admin, {{ user.firstName }}!
            </h1>
            <h1 v-else-if="user?.role === 'USER'">
                welcome user, {{ user.firstName }}
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
const { token, user, logout } = useAuth()
const { data: data } = await useFetch('http://localhost:3000/products')


// definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
    .container{ 
        width: 1500px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
    .box{
        padding: 1em;
        background-color: rgb(231, 231, 231);
    }
</style>