<template>
    <div>
        <table border="1">
            <tr>
                <th>Checkbox</th>
                <th>#</th>
                <th>Name</th>
                <th>Des</th>
                <th>Price</th>
                <th>Stock</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            <tr v-for="product in data">
                <th></th>
                <th>{{ product.id }}</th>
                <th>{{ product.name }}</th>
                <th>{{ product.description }}</th>
                <th>{{ product.price }}</th>
                <th>{{ product.stock }}</th>
                <th>{{ product.createdAt }}</th>
                <th>{{ product.updatedAt }}</th>
                <th>{{ product.category.name }}</th>
                <th>{{  }}</th>
                <th>{{  }}</th>
            </tr>
        </table>
    </div>
</template>

<script setup>
const { data: data } = await useFetch('http://localhost:3000/products')

</script>

<style scoped></style>