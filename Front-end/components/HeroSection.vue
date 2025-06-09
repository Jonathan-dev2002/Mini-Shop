<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-white ">
            <div class="max-w-7xl mx-auto px-6 py-8">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
                    <!-- Main Banner -->
                    <div
                        class="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 card-hover cursor-pointer group">
                        <div class="absolute inset-0 bg-black/20"></div>
                        <div class="relative h-full p-8 flex flex-col justify-center text-white">
                            <div class="animate-slideUp">
                                <h2 class="text-4xl font-bold mb-4">Flash Sale 70%</h2>
                                <p class="text-xl mb-6 opacity-90">ลดสูงสุด 70% สำหรับสินค้าทุกหมวดหมู่</p>
                                <button
                                    class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors group-hover:scale-105 transition-transform">
                                    ช้อปเลย
                                </button>
                            </div>
                        </div>
                        <div
                            class="absolute top-4 right-4 bg-yellow-400 text-purple-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse-custom">
                            เหลือ 2 วัน
                        </div>
                    </div>

                    <!-- Side Banners -->
                    <div class="space-y-6">
                        <!-- Top Banner -->
                        <div
                            class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 h-36 card-hover cursor-pointer group">
                            <div class="absolute inset-0 bg-black/10"></div>
                            <div class="relative h-full p-6 flex flex-col justify-center text-white">
                                <h3 class="text-xl font-bold mb-2">ฟรีค่าส่ง</h3>
                                <p class="text-sm opacity-90">เมื่อสั่งซื้อครบ 500 บาท</p>
                            </div>
                            <div class="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                        </div>

                        <!-- Bottom Banner -->
                        <div
                            class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 h-36 card-hover cursor-pointer group">
                            <div class="absolute inset-0 bg-black/10"></div>
                            <div class="relative h-full p-6 flex flex-col justify-center text-white">
                                <h3 class="text-xl font-bold mb-2">คูปองส่วนลด</h3>
                                <p class="text-sm opacity-90">รับคูปองลดสูงสุด 200 บาท</p>
                            </div>
                            <div class="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// import AddressModal from "~/components/AddressModal.vue";

</script>

<style scoped>
/* ซ่อนปุ่ม "x" หรือ "clear button" ในช่อง input type="search" บน WebKit browsers */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
}

/* Custom animations */
@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }

    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.animate-slideUp {
    animation: slideUp 0.8s ease-out;
}

.animate-pulse-custom {
    animation: pulse 2s infinite;
}

.shimmer {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
}

.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gradient-text {
    background: linear-gradient(135deg, #F53D2D, #FF6633, #FFB84D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>