<template>
    <div v-if="show" class="fixed inset-0 modal-overlay flex items-center justify-center z-50 animate-fadeIn"
        @click.self="emitClose">
        <div
            class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-slideDown">

            <div v-if="currentView === 'list'" class="h-full flex flex-col">
                <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">เลือกที่อยู่จัดส่ง</h2>
                                <p class="text-gray-600 text-sm">เลือกที่อยู่ที่ต้องการใช้สำหรับการจัดส่ง</p>
                            </div>
                        </div>
                        <button @click="emitClose" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="p-6 flex-1 overflow-y-auto">
                    <button @click="openAddForm"
                        class="w-full mb-6 p-4 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group">
                        <div
                            class="flex items-center justify-center space-x-2 text-orange-500 group-hover:text-orange-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span class="font-medium">เพิ่มที่อยู่ใหม่</span>
                        </div>
                    </button>
                    <div v-if="loading" class="text-center text-gray-500 py-4">กำลังโหลดที่อยู่...</div>
                    <div v-else-if="error" class="text-center text-red-500 py-4">เกิดข้อผิดพลาดในการโหลดที่อยู่</div>
                    <div v-else-if="!addresses || addresses.length === 0" class="text-center text-gray-500 py-4">
                        คุณยังไม่มีที่อยู่ที่บันทึกไว้</div>
                    <div v-else class="space-y-4 max-h-[41vh] overflow-y-auto">
                        <div v-for="addr in addresses" :key="addr.id"
                            :class="['border rounded-xl p-4 relative transition-all duration-200', tempSelectedAddressId === addr.id ? 'border-orange-400 bg-orange-50 ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50']">
                            <label class="flex items-start space-x-4 cursor-pointer">
                                <input type="radio" name="selected-address" :value="addr.id"
                                    v-model="tempSelectedAddressId" class="custom-radio mt-1">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2 mb-2 flex-wrap gap-y-1">
                                        <span
                                            class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">{{
                                            addr.label }}</span>
                                        <span v-if="addr.isDefault"
                                            class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">ค่าเริ่มต้น</span>
                                    </div>
                                    <div class="mb-2">
                                        <h3 class="font-semibold text-gray-800">{{ addr.recipientName }}</h3>
                                        <p class="text-gray-600 text-sm">{{ addr.phone }}</p>
                                    </div>
                                    <div class="text-gray-700 text-sm">
                                        <p>{{ addr.street }}</p>
                                        <p>{{ addr.city }}, {{ addr.province }} {{ addr.postalCode }}</p>
                                    </div>
                                </div>
                            </label>
                            <div class="absolute top-4 right-4 flex flex-col space-y-2">
                                <button @click.stop="openEditForm(addr)"
                                    class="text-sm font-medium px-3 py-1 border rounded-lg transition-colors bg-white text-orange-500 border-orange-300 hover:bg-orange-50 hover:text-orange-700">แก้ไข</button>
                                <button @click.stop="emitDeleteAddress(addr.id)"
                                    class="text-sm font-medium px-3 py-1 border rounded-lg transition-colors bg-white text-red-500 border-red-300 hover:bg-red-50 hover:text-red-700">ลบ</button>
                                <button v-if="!addr.isDefault" @click.stop="emitSetDefault(addr.id)"
                                    class="text-sm font-medium px-3 py-1 border rounded-lg transition-colors bg-white text-gray-500 border-gray-300 hover:bg-gray-50 hover:text-gray-700">ตั้งเป็นค่าเริ่มต้น</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <div class="flex justify-end space-x-3">
                        <button @click="emitClose"
                            class="px-6 py-3 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">ยกเลิก</button>
                        <button @click="emitConfirmSelect" :disabled="!tempSelectedAddressId"
                            class="px-6 py-3 cursor-pointer bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium">ยืนยัน</button>
                    </div>
                </div>
            </div>

            <div v-if="currentView === 'form'" class="h-full flex flex-col overflow-y-auto">
                <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-[#F53D2D] to-[#FF6633] rounded-full flex items-center justify-center text-white">
                                <svg v-if="isEditing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">{{ isEditing ? 'แก้ไขที่อยู่' :
                                    'เพิ่มที่อยู่ใหม่' }}</h2>
                                <p class="text-gray-600 text-sm">{{ isEditing ? 'แก้ไขข้อมูลที่อยู่จัดส่ง' :
                                    'เพิ่มที่อยู่จัดส่งใหม่' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-6 flex-1 overflow-y-auto">
                    <form id="address-form-vue" @submit.prevent="handleSubmit" class="space-y-4">
                        <div>
                            <label for="form-label"
                                class="block text-sm font-medium text-gray-700 mb-1">ป้ายชื่อที่อยู่</label>
                            <input v-model="form.label" type="text" id="form-label"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="เช่น บ้าน, ที่ทำงาน, คอนโด" required>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="form-recipientName"
                                    class="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้รับ</label>
                                <input v-model="form.recipientName" type="text" id="form-recipientName"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="ชื่อ-นามสกุล" required>
                            </div>
                            <div>
                                <label for="form-phone"
                                    class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                                <input v-model="form.phone" type="tel" id="form-phone"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="081-234-5678" required>
                            </div>
                        </div>
                        <div>
                            <label for="form-street" class="block text-sm font-medium text-gray-700 mb-1">ที่อยู่
                                (บ้านเลขที่, ถนน, ตำบล)</label>
                            <input v-model="form.street" type="text" id="form-street"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="123/45 ถนนมิตรภาพ ตำบลในเมือง" required>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label for="form-city"
                                    class="block text-sm font-medium text-gray-700 mb-1">เมือง/อำเภอ</label>
                                <input v-model="form.city" type="text" id="form-city"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="เมืองขอนแก่น" required>
                            </div>
                            <div>
                                <label for="form-province"
                                    class="block text-sm font-medium text-gray-700 mb-1">จังหวัด</label>
                                <input v-model="form.province" type="text" id="form-province"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="ขอนแก่น" required>
                            </div>
                            <div>
                                <label for="form-postalCode"
                                    class="block text-sm font-medium text-gray-700 mb-1">รหัสไปรษณีย์</label>
                                <input v-model="form.postalCode" type="text" id="form-postalCode"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="40000" required>
                            </div>
                        </div>
                        <div>
                            <label for="form-country"
                                class="block text-sm font-medium text-gray-700 mb-1">ประเทศ</label>
                            <input v-model="form.country" type="text" id="form-country"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="ประเทศไทย" required>
                        </div>
                        <div class="flex items-center space-x-3 pt-2">
                            <input v-model="form.isDefault" type="checkbox" id="form-isDefault"
                                class="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500">
                            <label for="form-isDefault"
                                class="text-sm font-medium text-gray-700">ตั้งเป็นที่อยู่เริ่มต้น</label>
                        </div>
                    </form>
                </div>
                <div class="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <div class="flex justify-end space-x-3">
                        <button @click="closeForm"
                            class="px-6 py-3 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">ยกเลิก</button>
                        <button type="submit" form="address-form-vue"
                            class="px-6 py-3 cursor-pointer bg-gradient-to-r from-[#F53D2D] to-[#FF6633] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

// Props definition
const props = defineProps({
    show: { type: Boolean, required: true },
    addresses: { type: Array, required: true },
    defaultAddress: { type: Object, default: null },
    loading: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
});

// Emits definition
const emit = defineEmits([
    "close", "confirm-select", "add-new",
    "edit-address", "delete-address", "set-default",
]);

// Internal state management
const currentView = ref('list'); // 'list' or 'form'
const isEditing = ref(false);
const tempSelectedAddressId = ref(null);

const form = reactive({
    id: null, label: "", recipientName: "", phone: "",
    street: "", city: "", province: "", postalCode: "",
    country: "ประเทศไทย", isDefault: false,
});

// Watch for the modal to open or the default address prop to change
watch(() => [props.show, props.defaultAddress], ([newShow, newDefault]) => {
    if (newShow) {
        // When modal opens, always reset to list view
        currentView.value = 'list';
        // and pre-select the currently active/default address
        tempSelectedAddressId.value = props.defaultAddress?.id || null;
    }
}, { immediate: true });


function showListView() {
    currentView.value = 'list';
}

function openAddForm() {
    isEditing.value = false;
    Object.assign(form, { id: null, label: "", recipientName: "", phone: "", street: "", city: "", province: "", postalCode: "", country: "ประเทศไทย", isDefault: false });
    currentView.value = 'form';
}

function openEditForm(addressToEdit) {
    isEditing.value = true;
    Object.assign(form, { ...addressToEdit });
    currentView.value = 'form';
}

function closeForm() {
    currentView.value = 'list';
}

// ====== MODIFIED PART ======
function handleSubmit() {
    if (isEditing.value) {
        // For editing, we send the whole form object including the ID
        const payload = { ...form };
        emit("edit-address", { id: form.id, payload: payload });
    } else {
        // For adding, we create a new object *without* the 'id' property
        const { id, ...payloadWithoutId } = form;
        emit("add-new", payloadWithoutId);
    }
    // Switch back to the list view immediately for better UX
    showListView();
}
// ====== END OF MODIFIED PART ======

function emitClose() {
    emit("close");
}
function emitConfirmSelect() {
    emit("confirm-select", tempSelectedAddressId.value);
}
function emitDeleteAddress(id) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?')) {
        emit("delete-address", id);
    }
}
function emitSetDefault(id) {
    emit("set-default", id);
}
</script>

<style scoped>
/* Paste the same CSS from your original styled HTML file here */
.modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}

.hidden {
    display: none;
}

/* Add any other specific styles from your static HTML if they are not covered by Tailwind CDN */
.custom-radio {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.custom-radio:checked {
    border-color: #F53D2D;
    background-color: #F53D2D;
}

.custom-radio:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
</style>