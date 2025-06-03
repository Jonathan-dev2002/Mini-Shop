import { ref, computed } from "vue";
import { useNuxtApp, useState } from '#app'

export function useCart() {
  const { $api } = useNuxtApp();
  const items = useState('cartItems', () => [])

  // โหลดรายการตะกร้า
  const fetchCart = async () => {
    try {
      items.value = await $api("/cart");
    } catch (e) {
      console.error("fetchCart failed", e);
    }
  };

  // เพิ่มสินค้าใหม่
  const addItem = async (productId, quantity = 1) => {
    try {
      await $api("/cart/items", {
        method: "POST",
        body: { productId, quantity },
      });
      await fetchCart();
    } catch (e) {
      console.error("addItem failed", e);
    }
  };

  // แก้ไขจำนวนในตะกร้า
  const updateItem = async (cartItemId, quantity) => {
    try {
      await $api(`/cart/items/${cartItemId}`, {
        method: "PUT",
        body: { quantity },
      });
      await fetchCart();
    } catch (e) {
      console.error("updateItem failed", e);
    }
  };

  // ลบรายการ
  const removeItem = async (cartItemId) => {
    try {
      await $api(`/cart/items/${cartItemId}`, {
        method: "DELETE",
      });
      await fetchCart();
    } catch (e) {
      console.error("removeItem failed", e);
    }
  };

  const clearCart = () => {
    items.value = []        
  }
  const totalCount = computed(() =>
    items.value.reduce((sum, it) => sum + it.quantity, 0)
  )

  return {
    items,
    totalCount,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart
  };
}
