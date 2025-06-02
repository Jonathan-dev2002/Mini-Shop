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
                <!-- สถานะ Loading -->
                <tr v-if="isLoading">
                    <td colspan="9">Loading…</td>
                </tr>
                <!-- สถานะ Error -->
                <tr v-else-if="loadError">
                    <td colspan="9" class="text-error">Failed to load</td>
                </tr>
                <!-- แสดงข้อมูลสินค้าเมื่อพร้อม -->
                <tr v-else v-for="item in products" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.updatedAt }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>
                        <button @click="openEditModal(item)" class="btn-sm">Edit</button>
                        <button @click="openDeleteModal(item.id)" class="btn-sm text-error">Delete</button>
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
                        <option v-for="c in categories" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </label>
                <div class="modal-actions">
                    <button @click="confirmCreate" class="btn-primary">Save</button>
                    <button @click="closeCreateModal">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="modal-overlay">
            <div class="modal">
                <h2>Edit Product</h2>
                <input v-model="modalName" placeholder="Enter Name" />
                <input v-model="modalDescription" placeholder="Enter description" />
                <input v-model="modalPrice" placeholder="Enter Price" />
                <input v-model="modalStock" placeholder="Enter Stock" />
                <label>
                    Category:
                    <select v-model="modalCate">
                        <option v-for="c in categories" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </label>
                <div class="modal-actions">
                    <button @click="confirmEdit" class="btn-primary">Update</button>
                    <button @click="closeEditModal">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Delete Confirm Modal -->
        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete?</p>
                <div class="modal-actions">
                    <button @click="confirmDelete" class="btn-primary text-error">Yes</button>
                    <button @click="closeDeleteModal">No</button>
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
import { onMounted } from 'vue'
import { useProduct } from '~/composables/useProduct'
import { useCategory } from '~/composables/useCategory'

// เรียก Composable สินค้า
const {
    products,
    isLoading,
    loadError,
    showCreateModal,
    showEditModal,
    showDeleteModal,
    modalName,
    modalDescription,
    modalPrice,
    modalStock,
    modalCate,
    toasts,
    fetchProducts,
    openCreateModal,
    closeCreateModal,
    confirmCreate,
    openEditModal,
    closeEditModal,
    confirmEdit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
} = useProduct()

// เรียก Composable หมวดหมู่
const {
    categories,
    loadError: cateError,
    fetchCategories
} = useCategory()

onMounted(async () => {
    await fetchCategories()
    await fetchProducts()
})
</script>

<style scoped>
/* (Copy มาจากเดิม) */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    padding: 0.5rem;
    border: 1px solid #ccc;
}

.btn-primary {
    background: #4caf50;
    color: white;
    padding: 0.4rem 0.8rem;
    border: none;
    cursor: pointer;
}

.btn-sm {
    padding: 0.2rem 0.5rem;
    cursor: pointer;
}

.text-error {
    color: #c00;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 300px;
}

.modal-actions {
    margin-top: 1rem;
    text-align: right;
}

.modal-actions button {
    margin-left: 0.5rem;
}

.toast-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.toast {
    background: #333;
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>