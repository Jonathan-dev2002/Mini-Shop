<template>
    <div>
        <h1>Category List</h1>

        <NuxtLink to="/categorys/create" class="btn-create">
            + New Category
        </NuxtLink>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="5">Loading…</td>
                </tr>
                <tr v-else-if="loadError">
                    <td colspan="5" style="color:red">Failed to load</td>
                </tr>
                <tr v-else v-for="cat in categories" :key="cat.id">
                    <td>{{ cat.id }}</td>
                    <td>{{ cat.name }}</td>
                    <td>{{ cat.createdAt }}</td>
                    <td>{{ cat.updatedAt }}</td>
                    <td>
                        <NuxtLink :to="`/categorys/${cat.id}/edit`">Edit</NuxtLink>
                        |
                        <button @click="deleteCategory(cat.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

const categories = ref([])
const isLoading = ref(true)
const loadError = ref(false)

async function fetchCategories() {
    isLoading.value = true
    loadError.value = false
    try {
        categories.value = await $api('/categorys')
    } catch {
        loadError.value = true
    } finally {
        isLoading.value = false
    }
}

async function deleteCategory(id) {
    if (!confirm('Delete this category?')) return
    await $api(`/categorys/${id}`, { method: 'DELETE' })
    await fetchCategories()
}

onMounted(fetchCategories)
</script>

<style scoped>
.btn-create {
    display: inline-block;
    margin-bottom: 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 0.5rem;
    border: 1px solid #ccc;
}

button {
    margin-left: 0.5rem;
}
</style>