<template>
    <div>
        <h1>Create Category</h1>
        <form @submit.prevent="createCategory">
            <label>
                Name:
                <input v-model="name" placeholder="ชื่อหมวดหมู่" />
            </label>
            <button type="submit">Save</button>
            <NuxtLink to="/categorys" class="btn-cancel">
                Cancel
            </NuxtLink>
        </form>
        <p v-if="error" style="color:red">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const { $api } = useNuxtApp()

const name = ref('')
const error = ref('')
const router = useRouter()

async function createCategory() {
    error.value = ''
    if (!name.value.trim()) {
        error.value = 'กรุณากรอกชื่อหมวดหมู่'
        return
    }
    try {
        await $api('/categorys', {
            method: 'POST',
            body: { name: name.value.trim() }
        })
        router.push('/categorys')
    } catch (e) {
        console.error('Create failed', e)
    }
}
</script>

<style scoped>
form {
    max-width: 400px;
}

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