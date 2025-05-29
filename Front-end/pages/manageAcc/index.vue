<template>
    <div>
        <h1>Manage Accounts</h1>
        <button class="btn-primary" @click="openCreateModal">+ New Account</button>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Action</th>
                </tr>

            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="8">Loading…</td>
                </tr>
                <tr v-else-if="loadError">
                    <td colspan="8" class="text-error">Failed to load</td>
                </tr>
                <tr v-else v-for="acc in accounts" :key="acc.id">
                    <td>{{ acc.id }}</td>
                    <td>{{ acc.email }}</td>
                    <td>{{ acc.firstName }}</td>
                    <td>{{ acc.lastName }}</td>
                    <td>{{ acc.role }}</td>
                    <td>{{ acc.createdAt }}</td>
                    <td>{{ acc.updatedAt }}</td>
                    <td>
                        <button @click="openEditModal(acc)" class="btn-sm">Edit</button>
                        <button @click="openDeleteModal(acc.id)" class="btn-sm text-error">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Create Modal -->
        <div v-if="showCreateModal" class="modal-overlay">
            <div class="modal">
                <h2>Create Account</h2>
                <input v-model="modalEmail" placeholder="Enter email" />
                <input v-model="modalFirstName" placeholder="Enter first name" />
                <input v-model="modalLastName" placeholder="Enter last name" />
                <input v-model="modalPassword" placeholder="Enter password" />
                <label>
                    Role:
                    <select v-model="modalRole">
                        <option v-for="r in rolesList" :key="r" :value="r">
                            {{ r }}
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
                <input v-model="modalEmail" />
                <input v-model="modalFirstName" />
                <input v-model="modalLastName" />
                <input v-model="modalPassword" />
                <label>
                    Role:
                    <select v-model="modalRole">
                        <option v-for="r in rolesList" :key="r" :value="r">
                            {{ r }}
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
import { computed, ref, onMounted } from 'vue'
const { $api } = useNuxtApp()

const accounts = ref([])
const isLoading = ref(true)
const loadError = ref(false)

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const modalEmail = ref('')
const modalFirstName = ref('')
const modalLastName = ref('')
const modalPassword = ref('')
const modalRole = ref('USER')
const rolesList = computed(() => {
    
    const uniq = new Set(accounts.value.map(u => u.role))
    return Array.from(uniq)
})
const editId = ref(null)
const deleteId = ref(null)

const toasts = ref([])

function pushToast(msg) {
    toasts.value.push(msg)
    setTimeout(() => {
        toasts.value.shift()
    }, 3000)
}

//Fetch
async function fetchAccounts() {
    isLoading.value = true
    loadError.value = false
    try {
        accounts.value = await $api('/users')
    } catch {
        loadError.value = true
    } finally {
        isLoading.value = false
    }
}

//Create
function openCreateModal() {
    modalEmail.value = ''
    modalFirstName.value = ''
    modalLastName.value = ''
    modalPassword.value = ''
    modalRole.value = rolesList.value[0] || ''
    showCreateModal.value = true
}
function closeCreateModal() {
    showCreateModal.value = false
}
async function confirmCreate() {
    if (!modalEmail.value.trim()) return
    if (!modalFirstName.value.trim()) return
    if (!modalLastName.value.trim()) return
    if (!modalPassword.value.trim()) return
    try {
        await $api('/users',
            {
                method: 'POST',
                body: {
                    email: modalEmail.value.trim(),
                    firstName: modalFirstName.value.trim(),
                    lastName: modalLastName.value.trim(),
                    password: modalPassword.value.trim(),
                    role: modalRole.value
                }
            })
        closeCreateModal()
        await fetchAccounts()
        pushToast('Account created!')
    }
    catch (e) {
        console.error('Create failed', e)
    }
}

//Edit
const openEditModal = (acc) => {
    editId.value = acc.id
    modalEmail.value = acc.email
    modalFirstName.value = acc.firstName
    modalLastName.value = acc.lastName
    modalPassword.value = ''
    modalRole.value = acc.role
    showEditModal.value = true
}
const closeEditModal = () => {
    showEditModal.value = false
    editId.value = null
}
const confirmEdit = async () => {
    const payload = {}

    if (modalEmail.value.trim()) {
        payload.email = modalEmail.value.trim()
    }
    if (modalFirstName.value.trim()) {
        payload.firstName = modalFirstName.value.trim()
    }
    if (modalLastName.value.trim()) {
        payload.lastName = modalLastName.value.trim()
    }
    if (modalPassword.value.trim()) {
        payload.password = modalPassword.value.trim()
    }
    if (modalRole.value) payload.role = modalRole.value

    if (!Object.keys(payload).length) {
        return
    }
    try {
        await $api(`/users/${editId.value}`, {
            method: 'PUT',
            body: payload
        })
        closeEditModal()
        await fetchAccounts()
        pushToast('Account updated!')
    } catch (e) {
        console.error('Edit failed', e)
    }
}

//Delete
const openDeleteModal = (id) => {
    deleteId.value = id
    showDeleteModal.value = true
}
const closeDeleteModal = () => {
    showDeleteModal.value = false
}
const confirmDelete = async () => {
    try {
        await $api(`/users/${deleteId.value}`, {
            method: 'DELETE'
        })
        closeDeleteModal()
        await fetchAccounts()
        pushToast('Account deleted!')
    } catch (e) {
        console.error('Delete falied', e)
    }
}

onMounted(fetchAccounts)
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