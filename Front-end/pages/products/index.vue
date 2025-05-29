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
                <tr v-for="data in products" :key="data.id">

                    <td>{{ data.id }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.description }}</td>
                    <td>{{ data.price }}</td>
                    <td>{{ data.stock }}</td>
                    <td>{{ data.createdAt }}</td>
                    <td>{{ data.updatedAt }}</td>
                    <td>{{ data.category.name }}</td>
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
                        <option v-for="c in cateList" :key="c.id" :value="c.id">
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
                <h2>Edit Account</h2>
                <input v-model="modalName" placeholder="Enter Name" />
                <input v-model="modalDescription" placeholder="Enter description" />
                <input v-model="modalPrice" placeholder="Enter Price" />
                <input v-model="modalStock" placeholder="Enter Stock" />
                <label>
                    Category:
                    <select v-model="modalCate">
                        <option v-for="c in cateList" :key="c.id" :value="c.id">
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
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

//state produuct
const products = ref([])
const isLoading = ref(true)
const loadError = ref(false)

//state create modal
const showCreateModal = ref(false)
const modalName = ref('')
const modalDescription = ref('')
const modalPrice = ref('')
const modalStock = ref('')
const modalCate = ref(null)

//state edit modal
const showEditModal = ref(false)
const editId = ref(null)

//state delete modal
const showDeleteModal = ref(false)
const deleteId = ref(null)

//state categort
const cateList = ref([])

//state toast
const toasts = ref([])


function pushToast(msg) {
    toasts.value.push(msg)
    setTimeout(() => {
        toasts.value.shift()
    }, 3000)
}

//Fetch product
async function fetchProducts() {
    isLoading.value = true
    loadError.value = false
    try {
        products.value = await $api('/products')
    } catch {
        loadError.value = true
    } finally {
        isLoading.value = false
    }
}

//fetch category
async function fetchCategories() {
    try {
        cateList.value = await $api('/categorys')
    } catch (e) {
        console.error('Failed fetch categories', e)
    }
}

//Create modal
const openCreateModal = () => {
    modalName.value = ''
    modalDescription.value = ''
    modalPrice.value = ''
    modalStock.value = ''
    modalCate.value = cateList.value[0]?.id || null
    showCreateModal.value = true
}
const closeCreateModal = () => {
    showCreateModal.value = false
}
const confirmCreate = async () => {
    if (
        !modalName.value.trim() ||
        !modalDescription.value.trim() ||
        !modalPrice.value ||
        !modalStock.value ||
        !modalCate.value
    ) return

    const payload = {
        name: modalName.value.trim(),
        description: modalDescription.value.trim(),
        price: Number(modalPrice.value),
        stock: Number(modalStock.value),
        categoryId: modalCate.value.toString().trim()
    }
    console.log('▶️ POST /products payload:', payload)
    try {
        await $api('/products',
            {
                method: 'POST',
                body: payload
            })
        closeCreateModal()
        await fetchProducts()
        pushToast('Product created!')

    } catch (e) {
        console.error('Create falied', e)
    }
}

//edit
const openEditModal = (data) => {
    editId.value = data.id
    modalName.value = data.name
    modalDescription.value = data.description
    modalPrice.value = data.price
    modalStock.value = data.stock
    modalCate.value = data.category.id
    showEditModal.value = true
}
const closeEditModal = () => {
    showEditModal.value = false
    editId.value = null
}
const confirmEdit = async () => {
    const payload = {}
    if (modalName.value.trim()) {
        payload.name = modalName.value.trim()
    }
    if (modalDescription.value.trim()) {
        payload.description = modalDescription.value.trim()
    }
    if (modalPrice.value != null) {
        payload.price = Number(modalPrice.value)
    }
    if (modalStock.value != null) {
        payload.stock = Number(modalStock.value)
    }
    if (modalCate.value !== null) {
        payload.categoryId = modalCate.value.toString()
    }
    if (!Object.keys(payload).length) {
        return
    }
    try {
        await $api(`/products/${editId.value}`, {
            method: 'PUT',
            body: payload
        })
        closeEditModal()
        await fetchProducts()
        pushToast('Product updated!')
    } catch (e) {
        console.error('Edit failed', e)
    }
}

//delete
const openDeleteModal = (data)=>{
    deleteId.value = data
    showDeleteModal.value = true
}
const closeDeleteModal = ()=>{
    showDeleteModal.value = false
}
const confirmDelete = async()=>{
    try{
        await $api(`products/${deleteId.value}`,{
            method: 'DELETE',
        })
        closeDeleteModal()
        await fetchProducts()
        pushToast('Product deleted!')
    }catch(e){
        console.error('Delete falied',e)
    }
}

onMounted(async () => {
    await fetchCategories()
    await fetchProducts()
})

</script>

<style scoped>
/* ตาราง */
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

/* Modal overlay & box */
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

/* Toast */
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