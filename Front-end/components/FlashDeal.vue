<template>
    <div>
        <!-- Flash Deal Section -->
        <section class="bg-white py-12 border-t border-gray-200">
            <div class="max-w-7xl mx-auto px-6">
                <div
                    class="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div
                        class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24">
                    </div>

                    <div class="relative z-10">
                        <div class="flex flex-col md:flex-row items-center justify-between mb-8">
                            <div>
                                <h2 class="text-4xl font-bold mb-2">⚡ Flash Deal</h2>
                                <p class="text-xl opacity-90">ลดราคาพิเศษเฉพาะวันนี้!</p>
                            </div>

                            <!-- Countdown Timer -->
                            <div class="flex space-x-4 mt-4 md:mt-0">
                                <div class="text-center">
                                    <div class="bg-white/20 rounded-lg px-4 py-2 glass-effect">
                                        <div class="text-2xl font-bold" id="hours">12</div>
                                        <div class="text-xs opacity-75">ชั่วโมง</div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div class="bg-white/20 rounded-lg px-4 py-2 glass-effect">
                                        <div class="text-2xl font-bold" id="minutes">34</div>
                                        <div class="text-xs opacity-75">นาที</div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div class="bg-white/20 rounded-lg px-4 py-2 glass-effect">
                                        <div class="text-2xl font-bold" id="seconds">56</div>
                                        <div class="text-xs opacity-75">วินาที</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- Flash Deal Product 1 -->
                            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-4 card-hover">
                                <div
                                    class="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl mb-3 relative">
                                    <div
                                        class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        -80%</div>
                                    <div
                                        class="absolute bottom-2 right-2 bg-yellow-400 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                        เหลือ 5</div>
                                </div>
                                <h3 class="font-medium text-gray-800 text-sm mb-2">สมาร์ทวอทช์</h3>
                                <div class="flex items-center space-x-2">
                                    <span class="text-red-500 font-bold">฿590</span>
                                    <span class="text-gray-400 text-xs line-through">฿2,950</span>
                                </div>
                            </div>

                            <!-- Flash Deal Product 2 -->
                            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-4 card-hover">
                                <div
                                    class="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-3 relative">
                                    <div
                                        class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        -75%</div>
                                    <div
                                        class="absolute bottom-2 right-2 bg-yellow-400 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                        เหลือ 12</div>
                                </div>
                                <h3 class="font-medium text-gray-800 text-sm mb-2">แท็บเล็ต 10 นิ้ว</h3>
                                <div class="flex items-center space-x-2">
                                    <span class="text-red-500 font-bold">฿2,490</span>
                                    <span class="text-gray-400 text-xs line-through">฿9,990</span>
                                </div>
                            </div>

                            <!-- Flash Deal Product 3 -->
                            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-4 card-hover">
                                <div
                                    class="aspect-square bg-gradient-to-br from-green-100 to-teal-100 rounded-xl mb-3 relative">
                                    <div
                                        class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        -70%</div>
                                    <div
                                        class="absolute bottom-2 right-2 bg-yellow-400 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                                        เหลือ 8</div>
                                </div>
                                <h3 class="font-medium text-gray-800 text-sm mb-2">เครื่องปั่นน้ำผลไม้</h3>
                                <div class="flex items-center space-x-2">
                                    <span class="text-red-500 font-bold">฿890</span>
                                    <span class="text-gray-400 text-xs line-through">฿2,990</span>
                                </div>
                            </div>

                            <!-- Flash Deal Product 4 -->
                            <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-4 card-hover">
                                <div
                                    class="aspect-square bg-gradient-to-br from-pink-100 to-red-100 rounded-xl mb-3 relative">
                                    <div
                                        class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        -85%</div>
                                    <div
                                        class="absolute bottom-2 right-2 bg-red-400 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse-custom">
                                        หมด!</div>
                                </div>
                                <h3 class="font-medium text-gray-800 text-sm mb-2">ชุดเครื่องสำอาง</h3>
                                <div class="flex items-center space-x-2">
                                    <span class="text-gray-400 font-bold">฿450</span>
                                    <span class="text-gray-400 text-xs line-through">฿3,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>

<style scoped></style>