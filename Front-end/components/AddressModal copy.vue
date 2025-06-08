<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal">
            <!-- === กรณีแก้ไขที่อยู่ (editingAddressId !== null) === -->
            <div v-if="editingAddressId !== null && !addMode">
                <h3>แก้ไขที่อยู่</h3>
                <form @submit.prevent="handleSubmitEdit">
                    <div>
                        <label>Label (เช่น Home/Work):</label><br />
                        <input v-model="form.label" placeholder="เช่น Home" required />
                    </div>
                    <div>
                        <label>ชื่อผู้รับ:</label><br />
                        <input v-model="form.recipientName" placeholder="John Doe" required />
                    </div>
                    <div>
                        <label>เบอร์โทร:</label><br />
                        <input v-model="form.phone" placeholder="0812345678" required />
                    </div>
                    <div>
                        <label>ที่อยู่ (street):</label><br />
                        <input v-model="form.street" placeholder="123 Main St" required />
                    </div>
                    <div>
                        <label>City:</label><br />
                        <input v-model="form.city" placeholder="Bangkok" required />
                    </div>
                    <div>
                        <label>Province:</label><br />
                        <input v-model="form.province" placeholder="Bangkok" required />
                    </div>
                    <div>
                        <label>Postal Code:</label><br />
                        <input v-model="form.postalCode" placeholder="10110" required />
                    </div>
                    <div>
                        <label>Country:</label><br />
                        <input v-model="form.country" placeholder="Thailand" required />
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">บันทึก</button>
                        <button type="button" @click="emitCancelEdit">ยกเลิก</button>
                    </div>
                </form>
            </div>

            <!-- === กรณีเพิ่มที่อยู่ใหม่ (addMode) === -->
            <div v-else-if="addMode">
                <h3>เพิ่มที่อยู่ใหม่</h3>
                <form @submit.prevent="handleSubmitNew">
                    <div>
                        <label>Label (เช่น Home/Work):</label><br />
                        <input v-model="form.label" placeholder="เช่น Work" required />
                    </div>
                    <div>
                        <label>ชื่อผู้รับ:</label><br />
                        <input v-model="form.recipientName" placeholder="Jane Smith" required />
                    </div>
                    <div>
                        <label>เบอร์โทร:</label><br />
                        <input v-model="form.phone" placeholder="0987654321" required />
                    </div>
                    <div>
                        <label>ที่อยู่ (street):</label><br />
                        <input v-model="form.street" placeholder="456 Office Park" required />
                    </div>
                    <div>
                        <label>City:</label><br />
                        <input v-model="form.city" placeholder="Nonthaburi" required />
                    </div>
                    <div>
                        <label>Province:</label><br />
                        <input v-model="form.province" placeholder="Nonthaburi" required />
                    </div>
                    <div>
                        <label>Postal Code:</label><br />
                        <input v-model="form.postalCode" placeholder="11000" required />
                    </div>
                    <div>
                        <label>Country:</label><br />
                        <input v-model="form.country" placeholder="Thailand" required />
                    </div>
                    <div>
                        <label>ตั้งเป็น Default:</label>
                        <input type="checkbox" v-model="form.isDefault" />
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">บันทึก</button>
                        <button type="button" @click="emitCancelAdd">ยกเลิก</button>
                    </div>
                </form>
            </div>

            <!-- === โหมดเลือกที่อยู่ (ปกติ) === -->
            <div v-else>
                <h3>เลือกที่อยู่จัดส่ง</h3>
                <div v-if="loading">Loading addresses…</div>
                <div v-else-if="error">โหลดที่อยู่ไม่สำเร็จ</div>
                <div v-else>
                    <form @submit.prevent="emitConfirmSelect">
                        <ul class="address-list">
                            <li v-for="addr in addresses" :key="addr.id">
                                <label>
                                    <input type="radio" name="tempSelectedAddress" :value="addr.id"
                                        v-model="tempSelectedAddressId" />
                                    <span>
                                        <strong>
                                            {{ addr.label }} {{ addr.isDefault ? "(Default)" : "" }}
                                        </strong><br />
                                        {{ addr.recipientName }}, {{ addr.street }}, {{ addr.city }},
                                        {{ addr.province }}, {{ addr.postalCode }}, {{ addr.country }}<br />
                                        โทร: {{ addr.phone }}
                                    </span>
                                </label>
                                <button type="button" @click="startEdit(addr)" class="btn-sm">
                                    แก้ไข
                                </button>
                                <button type="button" @click="emitDeleteAddress(addr.id)" class="btn-sm text-error">
                                    ลบ
                                </button>
                                <button v-if="!addr.isDefault" type="button" @click="emitSetDefault(addr.id)"
                                    class="btn-sm">
                                    ตั้งเป็น Default
                                </button>
                            </li>
                        </ul>

                        <div class="modal-actions">
                            <button type="submit" class="btn-primary" :disabled="!tempSelectedAddressId">
                                ยืนยัน
                            </button>
                            <button type="button" @click="emitClose">ยกเลิก</button>
                        </div>
                    </form>

                    <div class="add-new-container">
                        <button @click="startAdd" class="btn-primary">
                            + เพิ่มที่อยู่ใหม่
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";

// Props
const props = defineProps({
    show: { type: Boolean, required: true },
    addresses: { type: Array, required: true },
    defaultAddress: { type: Object, default: null },
    loading: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
});

// Events ที่จะ emit กลับไปให้ parent (หน้า Checkout)
const emit = defineEmits([
    "close",            // ปิด modal
    "confirm-select",   // ยืนยันเลือกที่อยู่
    "add-new",          // สร้าง address ใหม่
    "edit-address",     // แก้ไข address เดิม
    "delete-address",   // ลบ address
    "set-default",      // ตั้งเป็น default
]);

// สัปดาห์เบื้องต้น (state ภายใน modal)
const editingAddressId = ref(null);
const addMode = ref(false);

// ตัวแปรชั่วคราวสำหรับเก็บตัวเลือก ในโหมด “เลือกที่อยู่”
const tempSelectedAddressId = ref(null);

// Reactive object เก็บค่า form สำหรับสร้าง/แก้ไข
const form = reactive({
    label: "",
    recipientName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    isDefault: false,
});

// เรียกฟังก์ชันจาก props.defaultAddress เพื่อกําหนดค่าเริ่มต้น
watch(
    () => props.defaultAddress,
    (val) => {
        if (val && !editingAddressId.value && !addMode.value) {
            tempSelectedAddressId.value = val.id;
        }
    },
    { immediate: true }
);

// เริ่มต้น “แก้ไข address”
function startEdit(addr) {
    editingAddressId.value = addr.id;
    addMode.value = false;
    Object.assign(form, {
        label: addr.label,
        recipientName: addr.recipientName,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        province: addr.province,
        postalCode: addr.postalCode,
        country: addr.country,
        isDefault: addr.isDefault,
    });
}

// ฟังก์ชัน “ยกเลิกแก้ไข address”
function emitCancelEdit() {
    editingAddressId.value = null;
}

// ฟังก์ชัน “ส่งข้อมูลแก้ไข address”
function handleSubmitEdit() {
    emit("edit-address", {
        id: editingAddressId.value,
        payload: {
            label: form.label,
            recipientName: form.recipientName,
            phone: form.phone,
            street: form.street,
            city: form.city,
            province: form.province,
            postalCode: form.postalCode,
            country: form.country,
        },
    });
    editingAddressId.value = null;
}

// เริ่มต้น “เพิ่ม address ใหม่”
function startAdd() {
    addMode.value = true;
    editingAddressId.value = null;
    Object.assign(form, {
        label: "",
        recipientName: "",
        phone: "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        isDefault: false,
    });
}

// ฟังก์ชัน “ยกเลิกเพิ่ม address”
function emitCancelAdd() {
    addMode.value = false;
}

// ฟังก์ชัน “ส่งข้อมูลเพิ่ม address ใหม่”
function handleSubmitNew() {
    emit("add-new", {
        label: form.label,
        recipientName: form.recipientName,
        phone: form.phone,
        street: form.street,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
        country: form.country,
        isDefault: form.isDefault,
    });
    addMode.value = false;
}

// ฟังก์ชัน “ส่งคำสั่งลบ address”
function emitDeleteAddress(id) {
    emit("delete-address", id);
}

// ฟังก์ชัน “ส่งคำสั่งตั้ง default address”
function emitSetDefault(id) {
    emit("set-default", id);
}

// ฟังก์ชัน “เมื่อกดปุ่ม ยืนยันเลือก”
function emitConfirmSelect() {
    emit("confirm-select", tempSelectedAddressId.value);
}

// ฟังก์ชัน “ปิด modal”
function emitClose() {
    emit("close");
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 1.2rem;
    border-radius: 6px;
}

.modal h3 {
    margin-bottom: 1rem;
}

.modal form>div {
    margin-bottom: 0.8rem;
}

.modal input[type="text"],
.modal input[type="tel"],
.modal input[type="checkbox"] {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.modal-actions button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.modal-actions .btn-primary {
    background: #4caf50;
    color: white;
}

.modal-actions button[type="button"] {
    background: #ccc;
}

/* list of addresses */
.address-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.address-list li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
}

.address-list li label {
    flex: 1;
    display: flex;
    align-items: flex-start;
}

.address-list li label input[type="radio"] {
    margin-right: 0.6rem;
    margin-top: 0.2rem;
}

.address-list li span {
    line-height: 1.3;
}

.address-list li .btn-sm {
    margin-left: 0.5rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
}

/* ปุ่มเพิ่มที่อยู่ใหม่ */
.add-new-container {
    margin-top: 1rem;
    text-align: right;
}

.add-new-container .btn-primary {
    background: #2196f3;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>
