<template>
  <div v-if="pending">
    <p>กำลังโหลดข้อมูลสินค้า...</p>
  </div>
  <div v-else-if="error || !product">
    <p>ไม่พบข้อมูลสินค้า หรือเกิดข้อผิดพลาดในการโหลด</p>
  </div>
  <section v-else class="bg-white pt-[10vh] pb-[25vh]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="animate-fadeIn">
          <div class="aspect-square product-image rounded-3xl shadow-2xl overflow-hidden group cursor-pointer">
            <div class="w-full h-full flex items-center justify-center relative">
              <!-- Placeholder for product image -->
              <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name"
                class="w-full h-full object-cover">
              <div v-else class="text-white/80 text-center z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="w-32 h-32 mx-auto mb-4 opacity-60">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
                </svg>
                <p class="text-2xl font-light">{{ product.name }}</p>
                <p class="text-lg opacity-75">{{ product.name }}</p>
              </div>
              <!-- Stock Badge -->
              <div v-if="product.stock <= 0"
                class="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                สินค้าหมด
              </div>
              <div v-else="product.stock > 0"
                class="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-medium shadow-lg">
                มีสินค้า
              </div>


              <!-- Shimmer effect on hover -->
              <div class="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div class="animate-fadeIn" style="animation-delay: 0.2s;">
          <!-- Product Title -->
          <div class="mb-6">
            <span
              class="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {{ product.category.name }}
            </span>
            <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>

          </div>
          <!-- Price Section -->
          <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border border-orange-100">
            <div class="flex items-center space-x-4 mb-3">
              <span class="text-4xl font-bold text-orange-500">฿{{ product.price.toFixed(2) }}</span>
              <span class="text-2xl text-gray-400 line-through">฿580</span>
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">ประหยัด
                50%</span>
            </div>
            <p class="text-gray-600 text-sm">* ราคารวม VAT แล้ว ไม่รวมค่าจัดส่ง</p>
          </div>

          <!-- Stock Information -->
          <div class="mb-6">
            <div class="flex items-center mb-2 gap-0.5">
              <span class="text-gray-700 font-medium">สต็อกสินค้า</span>
              <span class="text-orange-600 font-bold">เหลือ {{ product.stock }} ชิ้น</span>
            </div>
          </div>

          <!-- Product Description -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">รายละเอียดสินค้า</h3>
            <div class="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-gray-700">{{ product.description }}</p>

              </div>

            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="space-y-6">
            <!-- Quantity Selector -->
            <div>
              <label v-if="product.stock > 0" class="block text-gray-700 font-medium mb-3">จำนวน</label>
              <div class="flex items-center justify-between space-x-4">

                <div v-if="product.stock > 0" class="flex items-center space-x-4">
                  <div class="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                    <button
                      class="quantity-btn w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600"
                      @click="decrementDesiredQuantity" :disabled="desiredQuantity <= 1">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input id="desiredQuantityInput" type="number" v-model.number="desiredQuantity"
                      @change="validateDesiredQuantity" min="1" :max="product.stock"
                      class="w-16 h-12 text-center font-bold text-gray-800 border-none focus:outline-none">
                    <button
                      class="quantity-btn w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600"
                      @click="incrementDesiredQuantity" :disabled="desiredQuantity >= product.stock">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                  <span class="text-gray-500">ชิ้น</span>
                </div>

                <!-- Add to Cart Button -->
                <div class="flex space-x-4">

                  <button v-if="product.stock <= 0"
                    :disabled="product.stock <= 0 || quantityOfThisProductInCart >= product.stock || desiredQuantity <= 0"
                    class="out-to-cart-btn flex-1 h-14 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden px-10">
                    <span class="relative z-10 flex items-center justify-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      <span>หมดดดด</span>
                    </span>
                  </button>

                  <button v-else="product.stock > 0" @click="handleAddToCart"
                    :disabled="product.stock <= 0 || quantityOfThisProductInCart >= product.stock || desiredQuantity <= 0"
                    class="add-to-cart-btn flex-1 h-14 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden px-10">
                    <span class="relative z-10 flex items-center justify-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      <span>เพิ่มลงตะกร้า</span>
                    </span>
                  </button>

                  <button
                    class="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-6 h-6 group-hover:scale-110 transition-transform">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '~/composables/useCart';

const route = useRoute();
const productId = route.params.id;

const product = ref(null);
const pending = ref(false);
const error = ref(null);


async function fetchProductData() {
  pending.value = true;   // เริ่มโหลด: ตั้งค่า pending เป็น true
  error.value = null;     // เคลียร์ error เก่าทิ้ง

  try {
    // ดึงข้อมูลด้วย $fetch เหมือนเดิม
    const data = await $fetch(`http://localhost:3000/products/${productId}`);
    product.value = data; // อัปเดตข้อมูลสินค้าเมื่อสำเร็จ
  } catch (e) {
    console.error('Failed to fetch product:', e);
    error.value = e; // เก็บ error ไว้ถ้าการดึงข้อมูลล้มเหลว
  } finally {
    pending.value = false; // สิ้นสุดการโหลด: ตั้งค่า pending เป็น false
  }
}


const {
  items: cartItems,
  fetchCart,
  addItem,
} = useCart();

const desiredQuantity = ref(1);

onMounted(() => {
  fetchProductData();
  fetchCart();
});


watch(product, (newProductData) => {
  if (newProductData) {
    if (newProductData.stock > 0) {
      desiredQuantity.value = 1;
    } else {
      desiredQuantity.value = 0;
    }
  } else {
    desiredQuantity.value = 0;
  }
}, { immediate: true });

function incrementDesiredQuantity() {
  if (product.value && desiredQuantity.value < product.value.stock) {
    desiredQuantity.value++;
  }
}

function decrementDesiredQuantity() {
  if (desiredQuantity.value > 1) {
    desiredQuantity.value--;
  }
}

function validateDesiredQuantity() {
  if (!product.value) {
    desiredQuantity.value = 0;
    return;
  }

  if (desiredQuantity.value < 1) {
    desiredQuantity.value = 1;
  }

  if (desiredQuantity.value > product.value.stock) {
    desiredQuantity.value = product.value.stock;
  }

  if (desiredQuantity.value !== null && desiredQuantity.value !== undefined) {
    desiredQuantity.value = Math.floor(desiredQuantity.value);
  }

  if (product.value.stock === 0) {
    desiredQuantity.value = 0;
  }
}

const quantityOfThisProductInCart = computed(() => {
  if (!product.value || !cartItems.value || cartItems.value.length === 0) {
    return 0;
  }
  const itemInCart = cartItems.value.find(
    (item) => (item.productId === product.value.id) || (item.product?.id === product.value.id)
  );
  return itemInCart ? itemInCart.quantity : 0;
});

function handleAddToCart() {

  const token = useCookie('token').value
  if (!token) {
    return navigateTo('/login')
  }

  if (!product.value || !product.value.id) return;

  const currentStock = product.value.stock;
  const alreadyInCart = quantityOfThisProductInCart.value;
  const quantityUserWantsToAdd = desiredQuantity.value;

  if (currentStock <= 0) {
    alert('ขออภัย สินค้าหมดสต็อก');
    return;
  }

  if (quantityUserWantsToAdd <= 0) {
    alert('กรุณาเลือกจำนวนสินค้าที่ต้องการเพิ่มให้ถูกต้อง (มากกว่า 0)');
    if (currentStock - alreadyInCart > 0) {
      desiredQuantity.value = 1;
    }
    return;
  }

  const remainingStockCapacity = currentStock - alreadyInCart;
  if (remainingStockCapacity <= 0) {
    alert('สินค้าชิ้นนี้ในตะกร้าเต็มจำนวนสต็อกแล้ว ไม่สามารถเพิ่มได้อีก');
    return;
  }

  const actualQuantityToAddToCart = Math.min(quantityUserWantsToAdd, remainingStockCapacity);

  if (actualQuantityToAddToCart <= 0) {
    alert('ไม่สามารถเพิ่มสินค้าได้ อาจเนื่องจากจำนวนที่ระบุไม่ถูกต้องหรือสต็อกไม่เพียงพอ');
    return;
  }

  addItem(product.value.id.toString(), actualQuantityToAddToCart);

  if (quantityUserWantsToAdd > actualQuantityToAddToCart) {
    alert(`คุณต้องการเพิ่ม ${quantityUserWantsToAdd} ชิ้น แต่เนื่องจากสต็อกคงเหลือ จึงสามารถเพิ่มได้เพียง ${actualQuantityToAddToCart} ชิ้น`);
  }
}


const grandTotalForAllCartItems = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) {
    return 0;
  }
  return cartItems.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}


.product-image {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.product-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  z-index: 1;
}

.quantity-btn {
  transition: all 0.2s ease;
}

.quantity-btn:hover {
  transform: scale(1.1);
}

.quantity-btn:active {
  transform: scale(0.95);
}

.add-to-cart-btn {
  background: linear-gradient(135deg, #F53D2D, #FF6633, #FFB84D);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(245, 61, 45, 0.3);
  cursor: pointer;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out;
}

.add-to-cart-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.out-to-cart-btn {
  background-color: rgb(114, 114, 114);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.out-to-cart-btn:hover {
  cursor: no-drop;
}

.out-to-cart-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.out-to-cart-btn:hover::before {
  left: 100%;
}

.breadcrumb-item {
  transition: color 0.2s ease;
}

.breadcrumb-item:hover {
  color: #F53D2D;
}



/* Responsive image scaling */
@media (max-width: 768px) {
  .product-image {
    height: 300px;
  }
}
</style>