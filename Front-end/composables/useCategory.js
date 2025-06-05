import { ref } from "vue";
import { useNuxtApp } from "#app";

export function useCategory() {
  const { $api } = useNuxtApp();

  // --- State ---
  const categories = ref([]);
  const cateList = ref([]);
  const isLoading = ref(false);
  const loadError = ref(false);

  const showCreateModal = ref(false);
  const showEditModal = ref(false);
  const showDeleteModal = ref(false);

  const modalName = ref("");
  const modalFile = ref(null);
  const modalFilePreview = ref(null);
  const currentEditCategoryImageUrl = ref(null);
  const editId = ref(null);
  const deleteId = ref(null);

  const toasts = ref([]);

  // --- Helper: Toast ---
  function pushToast(msg) {
    toasts.value.push(msg);
    setTimeout(() => {
      toasts.value.shift();
    }, 3000);
  }

  // --- Fetch List ---
  async function fetchCategories() {
    isLoading.value = true;
    loadError.value = false;
    try {
      categories.value = await $api("/categorys");
    } catch (e) {
      console.error("fetchCategories failed", e);
      loadError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  function resetModalForm() {
    modalName.value = "";
    modalFile.value = null;
    modalFilePreview.value = null;
    currentEditCategoryImageUrl.value = null;
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      modalFile.value = file;
      
      modalFilePreview.value = URL.createObjectURL(file);
    } else {
      modalFile.value = null;
      modalFilePreview.value = null;
    }
  }
  // async function fetchCategories() {
  //   try {
  //     cateList.value = await $api("/categorys");
  //   } catch (e) {
  //     console.error("fetchCategories failed", e);
  //     loadError.value = true;
  //   }
  // }

  // --- Create ---
  function openCreateModal() {
    modalName.value = "";
    showCreateModal.value = true;
  }
  function closeCreateModal() {
    showCreateModal.value = false;
  }
  async function confirmCreate() {
    if (!modalName.value.trim()) {
      pushToast("Please enter category name.");
      return;
    }
    const formData = new FormData();
    formData.append("name", modalName.value.trim());
    if (modalFile.value) {
      formData.append("image", modalFile.value);
    }

    try {
      isLoading.value = true;
      await $api("/categorys", {
        method: "POST",
        body: formData,
      });
      closeCreateModal();
      await fetchCategories();
      pushToast("Category created!");
    } catch (e) {
      console.error("confirmCreate failed", e);
      let errorMessage = "Create failed";
      if (e.data && e.data.message) {
        errorMessage += `: ${e.data.message}`;
      }
      pushToast(errorMessage);
    } finally {
      isLoading.value = false;
    }
  }

  // --- Edit ---
  function openEditModal(cat) {
    resetModalForm();
    editId.value = cat.id;
    modalName.value = cat.name;
    currentEditCategoryImageUrl.value = cat.imageUrl;
    showEditModal.value = true;
  }
  function closeEditModal() {
    showEditModal.value = false;
    resetModalForm();
    editId.value = null;
  }
  async function confirmEdit() {
    if (!modalName.value.trim() && !modalFile.value) {
      pushToast("No changes detected.");
      closeEditModal();
      return;
    }
    const formData = new FormData();
    formData.append("name", modalName.value.trim());
    if (modalFile.value) {
      formData.append("image", modalFile.value);
    }
    try {
      isLoading.value = true;
      await $api(`/categorys/${editId.value}`, {
        method: "PUT",
        body: formData,
      });
      closeEditModal();
      await fetchCategories();
      pushToast("Category updated!");
    } catch (e) {
      console.error("confirmEdit failed", e);
      let errorMessage = "Update failed";
      if (e.data && e.data.message) {
        errorMessage += `: ${e.data.message}`;
      }
      pushToast(errorMessage);
    } finally {
      isLoading.value = false;
    }
  }

  // --- Delete ---
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
      await $api(`/categorys/${deleteId.value}`, {
        method: "DELETE",
      });
      closeDeleteModal();
      await fetchCategories();
      pushToast("Category deleted!");
    } catch (e) {
      console.error("confirmDelete failed", e);
      pushToast("Delete failed");
    }
  }

  return {
    // state
    categories,
    isLoading,
    loadError,
    // modal controls
    showCreateModal,
    showEditModal,
    showDeleteModal,
    modalName,
    modalFile,
    modalFilePreview,
    currentEditCategoryImageUrl,
    // IDs
    editId,
    deleteId,
    // toasts
    toasts,
    // actions
    fetchCategories,
    openCreateModal,
    closeCreateModal,
    confirmCreate,
    openEditModal,
    closeEditModal,
    confirmEdit,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    handleFileChange,
  };
}
