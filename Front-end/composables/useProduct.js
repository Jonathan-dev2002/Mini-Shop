import { ref } from "vue";
import { useNuxtApp } from "#app";

export function useProduct() {
  const { $api } = useNuxtApp();

  // state ของสินค้า
  const products = ref([]);
  const isLoading = ref(false);
  const loadError = ref(false);

  // modal states สำหรับ Create/Edit/Delete
  const showCreateModal = ref(false);
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);

  // ฟิลด์ใน modal (Create/Edit)
  const modalName = ref("");
  const modalDescription = ref("");
  const modalPrice = ref("");
  const modalStock = ref("");
  const modalCate = ref(null);
  const modalFile = ref(null);
  const modalFilePreview = ref(null);
  const currentEditProductImageUrl = ref(null);
  const editId = ref(null);
  const deleteId = ref(null);

  // toast
  const toasts = ref([]);
  function pushToast(msg) {
    toasts.value.push(msg);
    setTimeout(() => {
      toasts.value.shift();
    }, 3000);
  }

  function handleProductFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      modalFile.value = file;
      modalFilePreview.value = URL.createObjectURL(file);
    } else {
      modalFile.value = null;
      modalFilePreview.value = null;
    }
  }

  function resetProductModalForm() {
    modalName.value = "";
    modalDescription.value = "";
    modalPrice.value = "";
    modalStock.value = "";
    modalCate.value = null;
    modalFile.value = null;
    modalFilePreview.value = null;
    currentEditProductImageUrl.value = null;
  }

  // --- Fetch สินค้าทั้งหมด ---
  async function fetchProducts() {
    isLoading.value = true;
    loadError.value = false;
    try {
      products.value = await $api("/products");
    } catch (e) {
      console.error("fetchProducts failed", e);
      loadError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  // --- Create สินค้าใหม่ ---
  function openCreateModal() {
    resetProductModalForm();
    showCreateModal.value = true;
  }
  function closeCreateModal() {
    showCreateModal.value = false;
    resetProductModalForm();
  }

  async function confirmCreate() {
    if (
      !modalName.value.trim() ||
      !modalDescription.value.trim() ||
      modalPrice.value === "" || // Check for empty string too
      modalStock.value === "" || // Check for empty string too
      !modalCate.value
    ) {
      pushToast("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", modalName.value.trim());
    formData.append("description", modalDescription.value.trim());
    formData.append("price", Number(modalPrice.value));
    formData.append("stock", Number(modalStock.value));
    formData.append("categoryId", modalCate.value.toString()); // categoryId ควรเป็น string หรือ number ตามที่ backend รับ
    if (modalFile.value) {
      formData.append("image", modalFile.value);
    }

    try {
      isLoading.value = true;
      await $api("/products", {
        method: "POST",
        body: formData, // ส่ง FormData
      });
      closeCreateModal();
      await fetchProducts();
      pushToast("Product created!");
    } catch (e) {
      console.error("confirmCreate product failed", e);
      pushToast(
        `Create product failed: ${
          e.data?.message || e.message || "Unknown error"
        }`
      );
    } finally {
      isLoading.value = false;
    }
  }

  // --- Edit สินค้า ---
  function openEditModal(item) {
    resetProductModalForm();
    editId.value = item.id;
    modalName.value = item.name;
    modalDescription.value = item.description;
    modalPrice.value = item.price;
    modalStock.value = item.stock;
    modalCate.value = item.category?.id || item.categoryId;
    currentEditProductImageUrl.value = item.imageUrl;
    showEditModal.value = true;
  }
  function closeEditModal() {
    showEditModal.value = false;
    resetProductModalForm();
    editId.value = null;
  }
  async function confirmEdit() {
    const formData = new FormData();

    formData.append("name", modalName.value.trim());
    formData.append("description", modalDescription.value.trim());
    formData.append("price", Number(modalPrice.value));
    formData.append("stock", Number(modalStock.value));
    if (modalCate.value) {
      formData.append("categoryId", modalCate.value.toString());
    }
    if (modalFile.value) {
      formData.append("image", modalFile.value);
    }

    if (formData.entries().next().done && !modalFile.value) {
      pushToast("No changes to update.");
      closeEditModal();
      return;
    }

    try {
      isLoading.value = true;
      await $api(`/products/${editId.value}`, {
        method: "PUT",
        body: formData,
      });
      closeEditModal();
      await fetchProducts();
      pushToast("Product updated!");
    } catch (e) {
      console.error("confirmEdit product failed", e);
      pushToast(
        `Update product failed: ${
          e.data?.message || e.message || "Unknown error"
        }`
      );
    } finally {
      isLoading.value = false;
    }
  }

  // --- Delete สินค้า ---
  function openDeleteModal(id) {
    deleteId.value = id;
    showDeleteModal.value = true;
  }
  function closeDeleteModal() {
    showDeleteModal.value = false;
    deleteId.value = null;
  }
  async function confirmDelete() {
    try {
      await $api(`/products/${deleteId.value}`, {
        method: "DELETE",
      });
      closeDeleteModal();
      await fetchProducts();
      pushToast("Product deleted!");
    } catch (e) {
      console.error("confirmDelete failed", e);
      pushToast("Delete failed");
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
    modalFile,
    modalFilePreview,
    currentEditProductImageUrl,
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
    confirmDelete,
    handleProductFileChange,
  };
}
