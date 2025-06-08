<!-- Footer -->
<template>
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Company Info -->
                <div>
                    <div class="flex items-center space-x-3 mb-4">
                        <div
                            class="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <span class="text-lg font-bold">S</span>
                        </div>
                        <h3 class="text-xl font-bold">ShopThai</h3>
                    </div>
                    <p class="text-gray-400 mb-4">ศูนย์รวมสินค้าออนไลน์ครบครันที่สุดในประเทศไทย พร้อมส่งฟรีทั่วประเทศ
                    </p>
                    <div class="flex space-x-4">
                        <div
                            class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                            <span class="text-sm">f</span>
                        </div>
                        <div
                            class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                            <span class="text-sm">📷</span>
                        </div>
                        <div
                            class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                            <span class="text-sm">📱</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="font-semibold mb-4">เมนูด่วน</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">ติดต่อเรา</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">ข้อกำหนดการใช้งาน</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
                    </ul>
                </div>

                <!-- Customer Service -->
                <div>
                    <h4 class="font-semibold mb-4">บริการลูกค้า</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">วิธีการสั่งซื้อ</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">การชำระเงิน</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">การจัดส่งสินค้า</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">การคืนสินค้า</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">รับประกันสินค้า</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 class="font-semibold mb-4">ติดต่อเรา</h4>
                    <div class="space-y-3 text-gray-400">
                        <div class="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span>02-123-4567</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <span>support@shopthai.com</span>
                        </div>
                        <div class="flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 mt-1">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span>123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Footer -->
            <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">© 2025 ShopThai. สงวนลิขสิทธิ์ทุกประการ</p>
                <div class="flex items-center space-x-4 mt-4 md:mt-0">
                    <span class="text-gray-400 text-sm">ยอมรับการชำระเงิน:</span>
                    <div class="flex space-x-2">
                        <div
                            class="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center text-white font-bold">
                            V</div>
                        <div
                            class="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center text-white font-bold">
                            M</div>
                        <div
                            class="w-8 h-5 bg-green-600 rounded text-xs flex items-center justify-center text-white font-bold">
                            P</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>