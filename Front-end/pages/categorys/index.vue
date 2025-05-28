<!-- Front-end/pages/categorys/index.vue -->
<template>
    <div>
        <h1>Category Management</h1>

        <!-- ฟอร์มสร้างใหม่ -->
        <div class="create-form">
            <input v-model="newName" placeholder="ชื่อหมวดหมู่ใหม่" @keyup.enter="createCategory" />
            <button @click="createCategory">Create</button>
        </div>

        <table border="1">
            <thead>
                <tr>
                    <th>Checkbox</th>
                    <th>#</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Loading / Error -->
                <tr v-if="isLoading">
                    <td colspan="6">Loading…</td>
                </tr>
                <tr v-else-if="loadError">
                    <td colspan="6" style="color: red">Failed to load</td>
                </tr>

                <!-- Data Rows -->
                <tr v-else v-for="cat in categories" :key="cat.id">
                    <td><input type="checkbox" /></td>
                    <td>{{ cat.id }}</td>

                    <!-- ถ้าอยู่ในโหมดแก้ไข แสดง input -->
                    <td v-if="editingId === cat.id">
                        <input v-model="editedName" />
                    </td>
                    <td v-else>{{ cat.name }}</td>

                    <td>{{ cat.createdAt }}</td>
                    <td>{{ cat.updatedAt }}</td>

                    <!-- ปุ่มแก้ไข / ยืนยัน / ยกเลิก / ลบ -->
                    <td>
                        <template v-if="editingId === cat.id">
                            <button @click="updateCategory(cat.id)">Save</button>
                            <button @click="cancelEdit">Cancel</button>
                        </template>
                        <template v-else>
                            <button @click="startEdit(cat)">Edit</button>
                            <button @click="deleteCategory(cat.id)">Delete</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

// state
const categories = ref([])
const isLoading = ref(true)
const loadError = ref(false)
const newName = ref('')

// edit state
const editingId = ref(null)
const editedName = ref('')

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

// Create
async function createCategory() {
    if (!newName.value.trim()) return
    try {
        await $api('/categorys', {
            method: 'POST',
            body: { name: newName.value.trim() }
        })
        newName.value = ''
        await fetchCategories()
    } catch (e) {
        console.error('Create failed', e)
    }
}

// Start editing
function startEdit(cat) {
    editingId.value = cat.id
    editedName.value = cat.name
}

// Cancel edit
function cancelEdit() {
    editingId.value = null
    editedName.value = ''
}

// Update
async function updateCategory(id) {
    if (!editedName.value.trim()) return
    try {
        await $api(`/categorys/${id}`, {
            method: 'PUT',
            body: { name: editedName.value.trim() }
        })
        cancelEdit()
        await fetchCategories()
    } catch (e) {
        console.error('Update failed', e)
    }
}

// Delete
async function deleteCategory(id) {
    if (!confirm('Delete this category?')) return
    try {
        await $api(`/categorys/${id}`, { method: 'DELETE' })
        await fetchCategories()
    } catch (e) {
        console.error('Delete failed', e)
    }
}

// initial load
onMounted(fetchCategories)
</script>

<style scoped>
.create-form {
    margin-bottom: 1rem;
}

.create-form input {
    padding: 0.5rem;
    margin-right: 0.5rem;
}

.create-form button {
    padding: 0.5rem 1rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 0.5rem;
}

button {
    margin-right: 0.3rem;
}
</style>
