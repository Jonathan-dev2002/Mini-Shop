import { ref } from 'vue'
import { useNuxtApp } from '#app'

export function useProduct() {
  const { $api } = useNuxtApp()

  // state ของสินค้า
  const products   = ref([])
  const isLoading  = ref(false)
  const loadError  = ref(false)

  // modal states สำหรับ Create/Edit/Delete
  const showCreateModal = ref(false)
  const showEditModal   = ref(false)
  const showDeleteModal = ref(false)

  // ฟิลด์ใน modal (Create/Edit)
  const modalName        = ref('')
  const modalDescription = ref('')
  const modalPrice       = ref('')
  const modalStock       = ref('')
  const modalCate        = ref(null)
  const editId           = ref(null)
  const deleteId         = ref(null)

  // toast
  const toasts = ref([])
  function pushToast(msg) {
    toasts.value.push(msg)
    setTimeout(() => {
      toasts.value.shift()
    }, 3000)
  }

  // --- Fetch สินค้าทั้งหมด ---
  async function fetchProducts() {
    isLoading.value = true
    loadError.value  = false
    try {
      products.value = await $api('/products')
    } catch (e) {
      console.error('fetchProducts failed', e)
      loadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  // --- Create สินค้าใหม่ ---
  function openCreateModal() {
    modalName.value        = ''
    modalDescription.value = ''
    modalPrice.value       = ''
    modalStock.value       = ''
    modalCate.value        = null
    showCreateModal.value  = true
  }
  function closeCreateModal() {
    showCreateModal.value = false
  }
  async function confirmCreate() {
    // ตรวจสอบค่าไม่ว่าง
    if (
      !modalName.value.trim() ||
      !modalDescription.value.trim() ||
      !modalPrice.value ||
      !modalStock.value ||
      !modalCate.value
    ) {
      return
    }

    const payload = {
      name:        modalName.value.trim(),
      description: modalDescription.value.trim(),
      price:       Number(modalPrice.value),
      stock:       Number(modalStock.value),
      categoryId:  modalCate.value.toString().trim()
    }

    try {
      await $api('/products', {
        method: 'POST',
        body: payload
      })
      closeCreateModal()
      await fetchProducts()
      pushToast('Product created!')
    } catch (e) {
      console.error('confirmCreate failed', e)
      pushToast('Create failed')
    }
  }

  // --- Edit สินค้า ---
  function openEditModal(item) {
    editId.value           = item.id
    modalName.value        = item.name
    modalDescription.value = item.description
    modalPrice.value       = item.price
    modalStock.value       = item.stock
    modalCate.value        = item.category.id
    showEditModal.value    = true
  }
  function closeEditModal() {
    showEditModal.value = false
    editId.value        = null
  }
  async function confirmEdit() {
    const payload = {}
    if (modalName.value.trim())        payload.name        = modalName.value.trim()
    if (modalDescription.value.trim()) payload.description = modalDescription.value.trim()
    if (modalPrice.value != null)      payload.price       = Number(modalPrice.value)
    if (modalStock.value != null)      payload.stock       = Number(modalStock.value)
    if (modalCate.value !== null)      payload.categoryId  = modalCate.value.toString()

    if (!Object.keys(payload).length) return

    try {
      await $api(`/products/${editId.value}`, {
        method: 'PUT',
        body: payload
      })
      closeEditModal()
      await fetchProducts()
      pushToast('Product updated!')
    } catch (e) {
      console.error('confirmEdit failed', e)
      pushToast('Update failed')
    }
  }

  // --- Delete สินค้า ---
  function openDeleteModal(id) {
    deleteId.value        = id
    showDeleteModal.value = true
  }
  function closeDeleteModal() {
    showDeleteModal.value = false
    deleteId.value        = null
  }
  async function confirmDelete() {
    try {
      await $api(`/products/${deleteId.value}`, {
        method: 'DELETE'
      })
      closeDeleteModal()
      await fetchProducts()
      pushToast('Product deleted!')
    } catch (e) {
      console.error('confirmDelete failed', e)
      pushToast('Delete failed')
    }
  }

  return {
    // state
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
    editId,
    deleteId,
    toasts,
    // actions
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
  }
}
