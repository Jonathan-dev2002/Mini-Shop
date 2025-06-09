<!-- Front-end/pages/categorys/index.vue -->
<template>
  <div>
    <h1>Category Management</h1>
    <button class="btn-primary" @click="openCreateModal">+ New Category</button>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading && categories.length === 0">
          <td :colspan="6">Loading…</td>
        </tr>
        <tr v-else-if="loadError">
          <td :colspan="6" class="text-error">Failed to load categories</td>
        </tr>
        <tr v-else-if="!isLoading && categories.length === 0">
          <td :colspan="6">No categories found.</td>
        </tr>
        <tr v-else v-for="cat in categories" :key="cat.id">
          <td>{{ cat.id }}</td>
          <td>
            <img v-if="cat.imageUrl" :src="cat.imageUrl" :alt="cat.name"
              style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
            <span v-else style="font-size: 0.8em; color: #777;">No Image</span>
          </td>
          <td>{{ cat.name }}</td>
          <td>{{ new Date(cat.createdAt).toLocaleString() }}</td>
          <td>{{ new Date(cat.updatedAt).toLocaleString() }}</td>
          <td>
            <button @click="openEditModal(cat)" class="btn-sm">Edit</button> 
            <button @click="openDeleteModal(cat.id)"
              class="btn-sm text-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h2>Create Category</h2>
        <div>
          <label for="create-cat-name" style="display:block; margin-bottom: .3rem;">Name:</label>
          <input id="create-cat-name" v-model="modalName" placeholder="Enter name"
            style="width:100%; padding:.5rem; box-sizing: border-box;" />
        </div>
        <div style="margin-top: 1rem;">
          <label for="create-cat-image" style="display:block; margin-bottom: .3rem;">Image:</label>
          <input id="create-cat-image" type="file" @change="handleFileChange" accept="image/*"
            style="width:100%; padding:.5rem; box-sizing: border-box;" />
        </div>
        <div v-if="modalFilePreview" style="margin-top: 0.5rem;">
          <p>Preview:</p>
          <img :src="modalFilePreview" alt="Image preview"
            style="max-width: 100%; max-height: 150px; border: 1px solid #ddd; margin-top: .3rem;" />
        </div>
        <div class="modal-actions">
          <button @click="confirmCreate" class="btn-primary" :disabled="isLoading">Save</button> <button type="button"
            @click="closeCreateModal" :disabled="isLoading">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal">
        <h2>Edit Category (ID: {{ editId }})</h2>
        <div>
          <label for="edit-cat-name" style="display:block; margin-bottom: .3rem;">Name:</label>
          <input id="edit-cat-name" v-model="modalName" style="width:100%; padding:.5rem; box-sizing: border-box;" />
        </div>
        <div style="margin-top: 1rem;">
          <label style="display:block; margin-bottom: .3rem;">Current Image:</label>
          <div v-if="currentEditCategoryImageUrl">
            <img :src="currentEditCategoryImageUrl" alt="Current category image"
              style="max-width: 100%; max-height: 100px; border: 1px solid #ddd; margin-top: .3rem;" />
          </div>
          <span v-else style="font-size: 0.8em; color: #777;">No current image</span>
        </div>
        <div style="margin-top: 1rem;">
          <label for="edit-cat-image" style="display:block; margin-bottom: .3rem;">New Image (optional):</label>
          <input id="edit-cat-image" type="file" @change="handleFileChange" accept="image/*"
            style="width:100%; padding:.5rem; box-sizing: border-box;" />
        </div>
        <div v-if="modalFilePreview" style="margin-top: 0.5rem;">
          <p>New Image Preview:</p>
          <img :src="modalFilePreview" alt="New image preview"
            style="max-width: 100%; max-height: 150px; border: 1px solid #ddd; margin-top: .3rem;" />
        </div>
        <div class="modal-actions">
          <button @click="confirmEdit" class="btn-primary" :disabled="isLoading">Update</button> <button type="button"
            @click="closeEditModal" :disabled="isLoading">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete category ID: {{ deleteId }}?</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="btn-primary text-error" :disabled="isLoading">Yes</button>
          <button type="button" @click="closeDeleteModal" :disabled="isLoading">No</button>
        </div>
      </div>
    </div>

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
import { useCategory } from '~/composables/useCategory'


const {
  categories,
  isLoading,
  loadError,
  showCreateModal,
  showEditModal,
  showDeleteModal,
  modalName,
  modalFile,
  modalFilePreview,
  currentEditCategoryImageUrl,
  editId,
  deleteId,
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
  handleFileChange,
  confirmDelete
} = useCategory()

definePageMeta({ middleware: 'auth' })

// เมื่อ component ถูก mount ให้ fetch ข้อมูลหมวดหมู่
onMounted(fetchCategories)
</script>

<style scoped>
/* CSS ชุดเดิมที่คุณต้องการนำกลับมาใช้ */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  /* text-align: left; ถูกกำหนดใน user-agent stylesheet หรือสามารถเอาออกถ้าไม่ต้องการ */
}

.btn-primary {
  background: #4caf50;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  /* เพิ่มเล็กน้อยเพื่อให้สอดคล้องกับ input */
}

.btn-sm {
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border: 1px solid #ccc;
  /* เพิ่ม border ให้ปุ่ม sm ดูชัดเจนขึ้น */
  background-color: #f0f0f0;
  /* สีพื้นหลังอ่อนๆ */
  border-radius: 3px;
  margin-right: 5px;
  /* เพิ่มระยะห่างเล็กน้อย */
}

.btn-sm:hover {
  background-color: #e0e0e0;
}

.text-error {
  /* ใช้สำหรับข้อความ error หรือปุ่มที่มี action เป็นลบ/อันตราย */
  color: #c00 !important;
  /* important เพื่อ override ถ้า btn-primary กำหนดสีอื่น */
}

/* ถ้าต้องการให้ปุ่ม Delete มีพื้นหลังสีแดงด้วย */
.btn-sm.text-error {
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
  /* ให้อยู่เหนือ content อื่น แต่ต่ำกว่า toast */
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
  /* ปรับความกว้างตามความเหมาะสมของเนื้อหาใหม่ */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.modal div {
  /* ใช้กับ div ที่ครอบ label และ input */
  margin-bottom: 0.8rem;
}

.modal div:last-of-type {
  /* div สุดท้ายก่อน modal-actions */
  margin-bottom: 1.2rem;
}


.modal-actions {
  margin-top: 1rem;
  text-align: right;
}

.modal-actions button {
  margin-left: 0.5rem;
  padding: 0.4rem 0.8rem;
  /* ให้ขนาดปุ่มสอดคล้องกัน */
  border-radius: 4px;
  border: 1px solid #ccc;
  /* ปุ่ม Cancel/No แบบ default */
  cursor: pointer;
}

.modal-actions button.btn-primary {
  /* Override สำหรับปุ่ม primary ใน modal */
  border: none;
  /* ปุ่ม primary ไม่มี border ตามสไตล์เดิม */
}


.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1050;
  /* ให้อยู่เหนือ modal */
}

.toast {
  background: #333;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.toast.toast-error {
  background-color: #c00;
  /* สีสำหรับ error toast */
}
</style>