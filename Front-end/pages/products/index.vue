<template>
    <div>
        <h1>Manage Products</h1>
        <button class="btn-primary" @click="openCreateModal">+ New Product</button>
        <div v-if="isLoading && products.length === 0" style="margin: 1rem 0; font-style: italic; color: #555;">
            Processing...
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
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
                <tr v-if="isLoading && products.length === 0">
                    <td :colspan="8">Loading products…</td>
                </tr>
                <tr v-else-if="loadError">
                    <td :colspan="8" class="text-error">Failed to load products</td>
                </tr>
                <tr v-else-if="!isLoading && products.length === 0">
                    <td :colspan="8">No products found.</td>
                </tr>
                <tr v-else v-for="item in products" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>
                        <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name"
                            style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
                        <span v-else style="font-size: 0.8em; color: #777;">No Image</span>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description && item.description.length > 50 ? item.description.substring(0, 50) + '...'
                        : item.description }}</td>
                    <td>{{ item.price?.toFixed(2) }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
                    <td>{{ new Date(item.updatedAt).toLocaleString() }}</td>
                    <td>{{ item.category?.name || 'N/A' }}</td>
                    <td>
                        <button @click="openEditModal(item)" class="btn-sm">Edit</button>
                        <button @click="openDeleteModal(item.id)" class="btn-sm text-error">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Create Modal -->
        <div v-if="showCreateModal" class="modal-overlay">
            <div class="modal" style="width: 500px;">
                <h2>Create Product</h2>
                <div>
                    <label>Name:</label>
                    <input v-model="modalName" placeholder="Product Name" />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea v-model="modalDescription" placeholder="Product Description" rows="3"></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input v-model.number="modalPrice" type="number" placeholder="0.00" step="0.01" />
                </div>
                <div>
                    <label>Stock:</label>
                    <input v-model.number="modalStock" type="number" placeholder="0" />
                </div>
                <div>
                    <label>Category:</label>
                    <select v-model="modalCate">
                        <option :value="null" disabled>-- Select Category --</option>
                        <option v-for="c in categories" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" @change="handleProductFileChange" accept="image/*" />
                </div>
                <div v-if="modalFilePreview" style="margin-top: 0.5rem; text-align: center;">
                    <p>Preview:</p>
                    <img :src="modalFilePreview" alt="Image preview"
                        style="max-width: 200px; max-height: 200px; border: 1px solid #ddd; margin-top: .3rem;" />
                </div>
                <div class="modal-actions">
                    <button @click="confirmCreate" class="btn-primary" :disabled="isLoading">Save</button>
                    <button type="button" @click="closeCreateModal" :disabled="isLoading">Cancel</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="modal-overlay">
            <div class="modal" style="width: 500px;">
                <h2>Edit Product (ID: {{ editId }})</h2>
                <div>
                    <label>Name:</label>
                    <input v-model="modalName" />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea v-model="modalDescription" rows="3"></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input v-model.number="modalPrice" type="number" step="0.01" />
                </div>
                <div>
                    <label>Stock:</label>
                    <input v-model.number="modalStock" type="number" />
                </div>
                <div>
                    <label>Category:</label>
                    <select v-model="modalCate">
                        <option :value="null" disabled>-- Select Category --</option>
                        <option v-for="c in categories" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label>Current Image:</label>
                    <div v-if="currentEditProductImageUrl" style="text-align: center;">
                        <img :src="currentEditProductImageUrl" alt="Current product image"
                            style="max-width: 150px; max-height: 150px; border: 1px solid #ddd; margin-top: .3rem;" />
                    </div>
                    <span v-else style="font-size: 0.8em; color: #777;">No current image</span>
                </div>
                <div>
                    <label>New Image (optional):</label>
                    <input type="file" @change="handleProductFileChange" accept="image/*" />
                </div>
                <div v-if="modalFilePreview" style="margin-top: 0.5rem; text-align: center;">
                    <p>New Image Preview:</p>
                    <img :src="modalFilePreview" alt="New image preview"
                        style="max-width: 200px; max-height: 200px; border: 1px solid #ddd; margin-top: .3rem;" />
                </div>
                <div class="modal-actions">
                    <button @click="confirmEdit" class="btn-primary" :disabled="isLoading">Update</button>
                    <button type="button" @click="closeEditModal" :disabled="isLoading">Cancel</button>
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
            <div v-for="(msg, i) in toasts" :key="i" class="toast"
                :class="{ 'toast-error': msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('error') }">
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
    modalFilePreview,
    currentEditProductImageUrl,
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
    confirmDelete,
    handleProductFileChange
} = useProduct()

// เรียก Composable หมวดหมู่
const {
    categories,
    fetchCategories
} = useCategory()

onMounted(async () => {
    await fetchCategories()
    await fetchProducts()
})
</script>

<style scoped>
/* CSS เหมือนกับหน้า Category Management ที่คุณชอบได้เลยครับ */
/* สามารถคัดลอก CSS จาก pages/categorys/index.vue ที่ปรับแก้ล่าสุดมาใช้ได้เลย */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    padding: 0.5rem;
    border: 1px solid #ccc;
    text-align: left;
}

th:first-child,
td:first-child {
    /* ID */
    width: 5%;
    text-align: center;
}

td:nth-child(2) {
    /* Image */
    width: 70px;
    /* Fixed width for image column */
    text-align: center;
}

th:last-child,
td:last-child {
    /* Actions */
    width: 12%;
    /* Adjust as needed */
    text-align: center;
}

.btn-primary {
    background: #4caf50;
    color: white;
    padding: 0.4rem 0.8rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.btn-sm {
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    border-radius: 3px;
    margin-right: 5px;
}

.btn-sm:hover {
    background-color: #e0e0e0;
}

.text-error {
    color: #c00 !important;
}

.btn-sm.text-error {
    /* Delete button in table */
    background-color: #dc3545;
    border-color: #dc3545;
    color: white !important;
}

.btn-sm.text-error:hover {
    background-color: #c82333;
    border-color: #bd2130;
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
    z-index: 1040;
}

.modal {
    background: white;
    padding: 1.5rem 2rem;
    border-radius: 8px;
    /* width: 500px; /* กำหนด inline style ไปแล้ว */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
}

.modal div:not(.modal-actions) {
    margin-bottom: 1rem;
}

.modal label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

.modal input[type="text"],
.modal input[type="number"],
.modal input[type="file"],
.modal textarea,
.modal select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.modal textarea {
    resize: vertical;
    /* Allow vertical resize */
}

.modal-actions {
    margin-top: 1.5rem;
    text-align: right;
}

.modal-actions button {
    margin-left: 0.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    /* Default for cancel */
    cursor: pointer;
}

.modal-actions button.btn-primary {
    /* Override for save/update */
    border: none;
}

.modal-actions button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.toast-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1050;
}

.toast {
    background: #333;
    color: #fff;
    padding: 0.8rem 1.2rem;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    opacity: 0.95;
}

.toast.toast-error {
    background-color: #c00;
}
</style>