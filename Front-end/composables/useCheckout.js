import { ref, computed, watch } from "vue";
import { useCart } from "./useCart";
import { useOrder } from "./useOrder";
import { useAddress } from "./useAddress";
import { useRouter } from "vue-router";

export function useCheckout() {
  const { items, clearCart, fetchCart } = useCart();
  const { createOrder } = useOrder();
  const {
    addresses,
    defaultAddress,
    isLoading: addrLoading,
    loadError: addrError,
    fetchAddresses,
    createAddress,
    updateAddress,
    setDefaultAddress,
    deleteAddress,
  } = useAddress();
  const router = useRouter();

  const selectedAddressId = ref(null);
  const tempSelectedAddressId = ref(null);
  const showAddressModal = ref(false);

  const currentAddress = computed(() => {
    if (selectedAddressId.value) {
      return addresses.value.find((a) => a.id === selectedAddressId.value);
    }
    return defaultAddress.value;
  });

  // เรียกดึงข้อมูลครั้งแรก
  async function init() {
    await Promise.all([fetchAddresses(), fetchCart()]);
    if (defaultAddress.value) {
      selectedAddressId.value = defaultAddress.value.id;
    }
  }

  watch(
    () => defaultAddress.value,
    (val) => {
      if (val) {
        selectedAddressId.value = val.id;
      }
    }
  );

  function openAddressModal() {
    showAddressModal.value = true;
    tempSelectedAddressId.value =
      selectedAddressId.value || defaultAddress.value?.id || null;
  }
  function closeAddressModal() {
    showAddressModal.value = false;
  }
  function onConfirmSelect(chosenId) {
    selectedAddressId.value = chosenId;
    showAddressModal.value = false;
  }
  async function onSubmitNew(payload) {
    await createAddress(payload);
  }
  async function onSubmitEdit({ id, payload }) {
    await updateAddress(id, payload);
  }
  async function onDeleteAddress(id) {
    if (selectedAddressId.value === id) {
      selectedAddressId.value = defaultAddress.value?.id || null;
    }
    await deleteAddress(id);
  }
  async function onSetDefault(id) {
    await setDefaultAddress(id);
  }
  async function onSubmitOrder() {
    if (!selectedAddressId.value || !items.value.length) return;
    await createOrder({
      paymentMethod: "COD",
      selectedAddressId: selectedAddressId.value,
    });
    clearCart();
    router.push("/orders");
  }

  return {
    // state
    items,
    addresses,
    defaultAddress,
    currentAddress,
    showAddressModal,
    selectedAddressId,
    tempSelectedAddressId,
    addrLoading,
    addrError,
    
    // loading/error (ถ้ามี)
    // isLoading, loadError  … (ถ้าต้องการ)

    // actions
    init,
    openAddressModal,
    closeAddressModal,
    onConfirmSelect,
    onSubmitNew,
    onSubmitEdit,
    onDeleteAddress,
    onSetDefault,
    onSubmitOrder,
  };
}
