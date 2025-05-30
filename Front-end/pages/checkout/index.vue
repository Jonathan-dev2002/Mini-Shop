<template>
    <div>
        <h1>Checkout</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label>ที่อยู่จัดส่ง</label><br />
                <textarea v-model="shippingAddress" required></textarea>
            </div>
            <div>
                <label>เบอร์โทร</label><br />
                <input v-model="phone" required />
            </div>
            <button type="submit">ยืนยันสั่งซื้อ (COD)</button>
            <p v-if="error" class="text-error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { useOrder } from '~/composables/useOrder'

const shippingAddress = ref('')
const phone = ref('')
const error = ref('')
const router = useRouter()

const { clearCart } = useCart()
const { createOrder } = useOrder()

async function onSubmit() {
    error.value = ''
    try {
        // เรียก API ส่งเฉพาะ 2 ฟิลด์ที่ backend ต้องการ
        await createOrder({
            shippingAddress: shippingAddress.value.trim(),
            phone: phone.value.trim(),
        })
        clearCart()               // ล้างตะกร้า
        router.push('/orders')    // ไปดูประวัติ
    } catch (e) {
        console.error(e)
        error.value = 'สั่งซื้อไม่สำเร็จ ลองใหม่อีกครั้ง'
    }
}
</script>

<style scoped>
.checkout-page {
    max-width: 600px;
    margin: auto;
}

textarea,
input {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
}

.btn-checkout {
    background: #4caf50;
    color: white;
    padding: 0.6em 1.2em;
    border: none;
    cursor: pointer;
}

.text-error {
    color: red;
}
</style>
