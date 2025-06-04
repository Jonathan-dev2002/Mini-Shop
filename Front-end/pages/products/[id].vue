<template>
  <div v-if="pending">
    <p>กำลังโหลดข้อมูลสินค้า...</p>
  </div>
  <div v-else-if="error || !product">
    <p>ไม่พบข้อมูลสินค้า หรือเกิดข้อผิดพลาดในการโหลด</p>
  </div>
  <div v-else class="product-detail-container">
    <h2>Name: {{ product.name }}</h2>
    <ul class="product-info">
      <li>Des: {{ product.description }}</li>
      <li>Price: ฿{{ product.price.toFixed(2) }}</li>
      <li>Stock: {{ product.stock }}</li>
      <li v-if="product.category">Category: {{ product.category.name }}</li>
    </ul>

    <div class="quantity-control-section" v-if="product.stock > 0">
      <label for="desiredQuantityInput">จำนวน:</label>
      <div class="quantity-input-group">
        <button @click="decrementDesiredQuantity" :disabled="desiredQuantity <= 1">
          −
        </button>
        <input id="desiredQuantityInput" type="number" v-model.number="desiredQuantity"
          @change="validateDesiredQuantity" min="1" :max="product.stock" class="quantity-input" />
        <button @click="incrementDesiredQuantity" :disabled="desiredQuantity >= product.stock">
          ＋
        </button>
      </div>
    </div>
    <p v-if="product.stock <= 0" class="out-of-stock-message">สินค้าหมดสต็อก</p>

    <button @click="handleAddToCart" class="btn-add-cart"
      :disabled="product.stock <= 0 || quantityOfThisProductInCart >= product.stock || desiredQuantity <= 0">
      🛒 เพิ่มลงตะกร้า
    </button>

    <p v-if="quantityOfThisProductInCart > 0" class="in-cart-info">
      มีสินค้านี้ในตะกร้าแล้ว: {{ quantityOfThisProductInCart }} ชิ้น
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '~/composables/useCart';

const route = useRoute();
const productId = route.params.id;

const { data: product, pending, error } = await useAsyncData(
  `product-${productId}`,
  () => $fetch(`http://localhost:3000/products/${productId}`)
);

const {
  items: cartItems,
  fetchCart,
  addItem,
} = useCart();

const desiredQuantity = ref(1);

onMounted(() => {
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
.product-detail-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.product-info li {
  margin-bottom: 8px;
  color: #555;
}

.product-info li strong {
  color: #333;
}

.quantity-control-section {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control-section label {
  font-weight: bold;
}

.quantity-input-group {
  display: flex;
  align-items: center;
}

.quantity-input-group button {
  width: 35px;
  height: 35px;
  font-size: 1.2em;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  border-radius: 4px;
}

.quantity-input-group button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 50px;
  height: 35px;
  text-align: center;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 5px;
  -moz-appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-add-cart {
  background: #ff5722;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1em;
  transition: background-color 0.2s;
}

.btn-add-cart:hover {
  background: #e64a19;
}

.btn-add-cart:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.out-of-stock-message {
  color: #dc3545;
  font-weight: bold;
  margin: 20px 0;
}

.in-cart-info {
  margin-top: 15px;
  font-style: italic;
  color: #28a745;
}

.total-cart-value {
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.1em;
}
</style>