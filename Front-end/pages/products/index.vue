<template>
    <div>
        <h1>Manage Products</h1>
        <button class="btn-primary" @click="openCreateModal">+ New Product</button>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Des</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="9">Loading…</td>
                </tr>
                <tr v-else-if="loadError">
                    <td colspan="9" class="text-error">Failed to load</td>
                </tr>
                <tr v-for="data in product" :key="data.id">

                    <th>{{ data.id }}</th>
                    <th>{{ data.name }}</th>
                    <th>{{ data.description }}</th>
                    <th>{{ data.price }}</th>
                    <th>{{ data.stock }}</th>
                    <th>{{ data.createdAt }}</th>
                    <th>{{ data.updatedAt }}</th>
                    <th>{{ data.category.name }}</th>
                    <td>
                        <button @click="openEditModal(data)" class="btn-sm">Edit</button>
                        <button @click="openDeleteModal(data.id)" class="btn-sm text-error">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Create Modal -->
        <div v-if="showCreateModal" class="modal-overlay">
            <div class="modal">
                <h2>Create Product</h2>
                <input v-model="modalName" placeholder="Enter Name" />
                <input v-model="modalDescription" placeholder="Enter description" />
                <input v-model="modalPrice" placeholder="Enter Price" />
                <input v-model="modalStock" placeholder="Enter Stock" />
                <label>
                    Category:
                    <select v-model="modalCate">
                        <option v-for="c in category" :key="c" :value="c">
                            {{ c }}
                        </option>
                    </select>
                </label>
                <div class="modal-actions">
                    <button @click="confirmCreate" class="btn-primary">Save</button>
                    <button @click="closeCreateModal">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Toast Container -->
        <div class="toast-container">
            <div v-for="(msg, i) in toasts" :key="i" class="toast">
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

const product = ref([])
const isLoading = ref(true)
const loadError = ref(false)

const showCreateModal = ref(false)
const modalName = ref('')
const modalDescription = ref('')
const modalPrice = ref('')
const modalStock = ref('')
const modalCate = ref('')
const cateList = computed(()=>{
    const uniq = new Set(product.value.map(c => c.role))
    return Array.from(uniq)
})

//Fetch
async function fetchAccounts() {
    isLoading.value = true
    loadError.value = false
    try {
        product.value = await $api('/products')
    } catch {
        loadError.value = true
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped></style>