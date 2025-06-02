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
        <!-- Loading state -->
        <tr v-if="isLoading">
          <td colspan="8">Loading…</td>
        </tr>
        <!-- Error state -->
        <tr v-else-if="loadError">
          <td colspan="8" class="text-error">Failed to load</td>
        </tr>
        <!-- Data rows -->
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
        <input v-model="modalEmail"      placeholder="Enter email"      />
        <input v-model="modalFirstName"  placeholder="Enter first name" />
        <input v-model="modalLastName"   placeholder="Enter last name"  />
        <input v-model="modalPassword"   placeholder="Enter password"   />
        <label>
          Role:
          <select v-model="modalRole">
            <option v-for="r in rolesList" :key="r" :value="r">{{ r }}</option>
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
        <input v-model="modalEmail"      />
        <input v-model="modalFirstName"  />
        <input v-model="modalLastName"   />
        <input v-model="modalPassword"   placeholder="(leave blank to keep)" />
        <label>
          Role:
          <select v-model="modalRole">
            <option v-for="r in rolesList" :key="r" :value="r">{{ r }}</option>
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
import { useUser }    from '~/composables/useUser'

const {
  accounts,
  isLoading,
  loadError,
  showCreateModal,
  showEditModal,
  showDeleteModal,
  modalEmail,
  modalFirstName,
  modalLastName,
  modalPassword,
  modalRole,
  rolesList,
  toasts,
  fetchAccounts,
  openCreateModal,
  closeCreateModal,
  confirmCreate,
  openEditModal,
  closeEditModal,
  confirmEdit,
  openDeleteModal,
  closeDeleteModal,
  confirmDelete
} = useUser()

onMounted(fetchAccounts)
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
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
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
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