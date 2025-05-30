import { ref } from "vue";
import { useNuxtApp } from "#app";

export function useOrder() {
  const { $api } = useNuxtApp();
  const orders = ref([]);
  const current = ref(null);

  // สร้าง Order (COD)
  const createOrder = async ({ shippingAddress, phone }) => {
    return await $api("/orders", {
      method: "POST",
      body: {
        paymentMethod: "COD", 
        shippingAddress, 
        phone,
      },
    });
  };

  // ดึงรายการ Order ทั้งหมด ของ user
  const fetchOrders = async () => {
    orders.value = await $api("/orders");
  };

  // ดึง Order เดียว
  const fetchOrder = async (id) => {
    current.value = await $api(`/orders/${id}`);
  };

  // เปลี่ยนสถานะ (ADMIN only)
  const updateStatus = async (id, status) => {
    await $api(`/orders/${id}/status`, {
      method: "PUT",
      body: { status },
    });
    // ถ้าอยู่หน้าเดี๋ยว ให้รีโหลด
    if (current.value?.id === id) {
      await fetchOrder(id);
    }
  };

  return {
    orders,
    current,
    createOrder,
    fetchOrders,
    fetchOrder,
    updateStatus,
  };
}
