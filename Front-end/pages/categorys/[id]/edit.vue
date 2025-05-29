<template>
    <div>
        <h1>Edit Category</h1>
        <form v-if="loaded" @submit.prevent="updateCategory">
            <label>
                Name:
                <input v-model="name" />
            </label>
            <button type="submit">Update</button>
            <NuxtLink to="/categorys" class="btn-cancel">
                Cancel
            </NuxtLink>
        </form>
        <p v-else>Loading…</p>
        <p v-if="error" style="color:red">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { $api } = useNuxtApp()

const route = useRoute()
const router = useRouter()
const id = route.params.id
const name = ref('')
const loaded = ref(false)
const error = ref('')

// โหลดข้อมูลหมวดหมู่เดิมมาใส่
async function fetchCategory() {
    try {
        const res = await $api(`/categorys/${id}`)
        name.value = res.name
        loaded.value = true
    } catch (e) {
        console.error(e)
        error.value = 'Failed to load category'
    }
}

// อัปเดตข้อมูล
async function updateCategory() {
    error.value = ''
    if (!name.value.trim()) {
        error.value = 'กรุณากรอกชื่อหมวดหมู่'
        return
    }
    try {
        await $api(`/categorys/${id}`, {
            method: 'PUT',
            body: { name: name.value.trim() }
        })
        router.push('/categorys')
    } catch (e) {
        console.error(e)
        error.value = 'Update failed'
    }
}

onMounted(fetchCategory)
</script>

<style scoped>
label {
    display: block;
    margin-bottom: 1rem;
}

input {
    width: 100%;
    padding: 0.4rem;
}

button,
.btn-cancel {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
}

.btn-cancel {
    text-decoration: none;
    color: #555;
}
</style>