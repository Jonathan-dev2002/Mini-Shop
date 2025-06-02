<!-- Front-end/pages/categorys/index.vue -->
<template>
  <div>
    <h1>Category Management</h1>
    <button class="btn-primary" @click="openCreateModal">+ New Category</button>

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
        <!-- กรณีกำลังโหลด -->
        <tr v-if="isLoading">
          <td colspan="5">Loading…</td>
        </tr>
        <!-- กรณีโหลดข้อมูลไม่สำเร็จ -->
        <tr v-else-if="loadError">
          <td colspan="5" class="text-error">Failed to load</td>
        </tr>
        <!-- ปกติ: วนแสดง categories -->
        <tr v-else v-for="cat in categories" :key="cat.id">
          <td>{{ cat.id }}</td>
          <td>{{ cat.name }}</td>
          <td>{{ cat.createdAt }}</td>
          <td>{{ cat.updatedAt }}</td>
          <td>
            <button @click="openEditModal(cat)" class="btn-sm">Edit</button>
            <button @click="openDeleteModal(cat.id)" class="btn-sm text-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h2>Create Category</h2>
        <input v-model="modalName" placeholder="Enter name" />
        <div class="modal-actions">
          <button @click="confirmCreate" class="btn-primary">Save</button>
          <button @click="closeCreateModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Edit Category</h2>
        <input v-model="modalName" />
        <div class="modal-actions">
          <button @click="confirmEdit" class="btn-primary">Update</button>
          <button @click="closeEditModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
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

    <!-- Toasts -->
    <div class="toast-container">
      <div v-for="(msg, i) in toasts" :key="i" class="toast">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategory } from '~/composables/useCategory'


const {
  categories,
  isLoading,
  loadError,
  showCreateModal,
  showEditModal,
  showDeleteModal,
  modalName,
  toasts,
  fetchCategories,
  openCreateModal,
  closeCreateModal,
  confirmCreate,
  openEditModal,
  closeEditModal,
  confirmEdit,
  openDeleteModal,
  closeDeleteModal,
  confirmDelete
} = useCategory()

// เมื่อ component ถูก mount ให้ fetch ข้อมูลหมวดหมู่
onMounted(fetchCategories)
</script>

<style scoped>
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