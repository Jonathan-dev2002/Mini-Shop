<template>
    <div class="checkout-page">
        <h1>Checkout</h1>

        <!-- 1. แสดง default/current address -->
        <div v-if="currentAddress" class="selected-address">
            <h2>ที่อยู่จัดส่งเริ่มต้น</h2>
            <p>
                <strong>{{ currentAddress.label }}</strong><br />
                {{ currentAddress.recipientName }}<br />
                {{ currentAddress.street }}, {{ currentAddress.city }},<br />
                {{ currentAddress.province }}, {{ currentAddress.postalCode }},<br />
                {{ currentAddress.country }}<br />
                โทร: {{ currentAddress.phone }}
            </p>
            <button @click="openAddressModal">เปลี่ยนที่อยู่</button>
        </div>
        <div v-else class="no-address">
            <p>คุณยังไม่มีที่อยู่จัดส่ง กรุณาเพิ่มที่อยู่</p>
            <button @click="openAddressModal">เพิ่ม / จัดการที่อยู่</button>
        </div>

        <!-- 2. แสดงสรุปรายการสินค้า (เรียก Component CartSummary) -->
        <CartSummary :items="items" />

        <!-- 3. ปุ่มยืนยันสั่งซื้อ -->
        <button class="btn-confirm" :disabled="!selectedAddressId || !items.length" @click="onSubmitOrder">
            ยืนยันสั่งซื้อ
        </button>

        <!-- 4. เรียก AddressModal.vue -->
        <AddressModal :show="showAddressModal" :addresses="addresses" :defaultAddress="defaultAddress"
            :loading="addrLoading" :error="addrError" @close="closeAddressModal" @confirm-select="onConfirmSelect"
            @add-new="onSubmitNew" @edit-address="onSubmitEdit" @delete-address="onDeleteAddress"
            @set-default="onSetDefault" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCheckout } from "~/composables/useCheckout";
import CartSummary from "~/components/CartSummary.vue";
import AddressModal from "~/components/AddressModal.vue";

const {
    items,
    addresses,
    defaultAddress,
    currentAddress,
    showAddressModal,
    selectedAddressId,
    init,
    openAddressModal,
    closeAddressModal,
    onConfirmSelect,
    onSubmitNew,
    onSubmitEdit,
    onDeleteAddress,
    onSetDefault,
    onSubmitOrder,
} = useCheckout();

onMounted(init);
</script>

<style scoped>
.checkout-page {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
}

.selected-address,
.no-address {
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    padding: 0.8rem;
    border-radius: 4px;
}

.selected-address button,
.no-address button {
    margin-top: 0.5rem;
}

.btn-confirm {
    background: #4caf50;
    color: white;
    padding: 0.75rem 1.2rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.btn-confirm:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>
