import { ref, computed } from "vue";
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
    if (!modalName.value.trim()) return;
    try {
      await $api("/categorys", {
        method: "POST",
        body: { name: modalName.value.trim() },
      });
      closeCreateModal();
      await fetchCategories();
      pushToast("Category created!");
    } catch (e) {
      console.error("confirmCreate failed", e);
      pushToast("Create failed");
    }
  }

  // --- Edit ---
  function openEditModal(cat) {
    editId.value = cat.id;
    modalName.value = cat.name;
    showEditModal.value = true;
  }
  function closeEditModal() {
    showEditModal.value = false;
    editId.value = null;
  }
  async function confirmEdit() {
    if (!modalName.value.trim()) return;
    try {
      await $api(`/categorys/${editId.value}`, {
        method: "PUT",
        body: { name: modalName.value.trim() },
      });
      closeEditModal();
      await fetchCategories();
      pushToast("Category updated!");
    } catch (e) {
      console.error("confirmEdit failed", e);
      pushToast("Update failed");
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
  };
}
