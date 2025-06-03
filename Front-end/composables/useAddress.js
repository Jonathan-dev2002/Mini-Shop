import { ref } from "vue";
import { useNuxtApp } from "#app";

export function useAddress() {
  const { $api } = useNuxtApp();
  const addresses = ref([]);
  const defaultAddress = ref(null);

  const isLoading = ref(false);
  const loadError = ref(false);

  async function fetchAddresses() {
    isLoading.value = true;
    loadError.value = false;
    try {
      const data = await $api("/addresses");
      addresses.value = data;
      defaultAddress.value = data.find((a) => a.isDefault) || null;
    } catch (e) {
      console.error("fetchAddresses failed", e);
      loadError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function createAddress(payload) {
    const newAddr = await $api("/addresses", {
      method: "POST",
      body: payload,
    });
    await fetchAddresses();
    return newAddr;
  }

  async function updateAddress(id, payload) {
    const updated = await $api(`/addresses/${id}`, {
      method: "PUT",
      body: payload,
    });
    await fetchAddresses();
    return updated;
  }

  async function setDefaultAddress(id) {
    const resp = await $api(`/addresses/${id}/default`, {
      method: "PUT",
    });
    await fetchAddresses();
    return resp;
  }


  async function deleteAddress(id) {
    await $api(`/addresses/${id}`, {
      method: "DELETE",
    });
    await fetchAddresses();
  }

  return {
    addresses,
    defaultAddress,
    isLoading,
    loadError,
    fetchAddresses,
    createAddress,
    updateAddress,
    setDefaultAddress,
    deleteAddress,
  };
}
