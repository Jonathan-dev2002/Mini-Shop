<!-- Front-end/pages/categorys/index.vue -->
<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-8xl mx-auto px-6 py-5 border-b border-orange-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-800">จัดการหมวดหมู่สินค้า</h1>
            <p class="text-gray-500">จัดการข้อมูลหมวดหมู่สินค้าทั้งหมดในร้านค้า</p>
          </div>
        </div>
        <button @click="openCreateModal"
          class="bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg btn-hover flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>เพิ่มหมวดหมู่สินค้าใหม่</span>
        </button>
      </div>
    </div>

    <div class="max-w-8xl mx-auto px-6 py-8">
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-orange-50 to-red-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  รูปสินค้า</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ชื่อหมวดหมู่สินค้า</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  วันที่สร้าง</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  อัปเดตล่าสุด</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  การดำเนินการ</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="isLoading && categories.length === 0">
                <td colspan="10" class="px-6 py-10 text-center text-gray-500">กำลังโหลดข้อมูล...
                </td>
              </tr>
              <tr v-else-if="loadError">
                <td colspan="10" class="px-6 py-10 text-center text-red-500">
                  เกิดข้อผิดพลาดในการโหลดข้อมูล</td>
              </tr>
              <tr v-else-if="!isLoading && categories.length === 0">
                <td colspan="10" class="px-6 py-10 text-center text-gray-500">ไม่พบข้อมูลสินค้า</td>
              </tr>
              <tr v-else v-for="cat in categories" :key="cat.id" class="table-row-hover">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ cat.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <img v-if="cat.imageUrl" :src="cat.imageUrl" :alt="cat.name"
                      class="w-full h-full object-cover rounded-xl">
                    <span v-else class="text-xs text-gray-400">No Img</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-semibold text-gray-900">{{ cat.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new
                  Date(cat.createdAt).toLocaleDateString('th-TH') }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new
                  Date(cat.updatedAt).toLocaleDateString('th-TH') }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <button @click="openEditModal(cat)"
                      class="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button @click="openDeleteModal(cat.id)"
                      class="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="bg-white rounded-2xl max-w-8xl mx-6 px-6 shadow-sm mt-6 py-4 animate-slideUp"
      style="animation-delay: 0.1s">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          แสดง <span class="font-medium">1-5</span> จาก
          <span class="font-medium">47</span> รายการ
        </div>
        <div class="flex items-center space-x-2">

          <button
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-px disabled:transform-none"
            disabled>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            class="px-3 py-2 rounded-lg bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white font-medium transition-transform duration-200 hover:-translate-y-px">
            1
          </button>

          <button
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-px">
            2
          </button>

          <button
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-px">
            3
          </button>

          <span class="px-3 py-2 text-gray-500">...</span>

          <button
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-px">
            10
          </button>

          <button
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-px">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>



  </div>
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
/* Custom animations */
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out;
}

.animate-pulse-custom {
  animation: pulse 2s infinite;
}

.gradient-text {
  background: linear-gradient(135deg, #f53d2d, #ff6633, #ffb84d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 61, 45, 0.3);
}

.table-row-hover {
  transition: all 0.2s ease;
}

/* .table-row-hover:hover {
        background-color: rgba(249, 250, 251, 0.8);
       transform: scale(1.01);
      } */

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