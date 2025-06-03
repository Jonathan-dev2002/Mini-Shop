<template>
  <div class="cart-summary" v-if="items && items.length">
    <h2>สรุปรายการสินค้า</h2>
    <table>
      <thead>
        <tr>
          <th>สินค้า</th>
          <th>ราคา (ต่อชิ้น)</th>
          <th>จำนวน</th>
          <th>รวม</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="it in items" :key="it.id">
          <td>{{ it.product.name }}</td>
          <td>฿{{ it.product.price.toFixed(2) }}</td>
          <td>{{ it.quantity }}</td>
          <td>฿{{ (it.product.price * it.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="grand-total">
      ยอดรวมทั้งหมด: <strong>฿{{ grandTotal.toFixed(2) }}</strong>
    </p>
  </div>
  <div v-else>
    <p>ตะกร้าว่างเปล่า</p>
  </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// คำนวณยอดรวมจาก props.items
const { items } = toRefs(props);
const grandTotal = computed(() =>
  items.value.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
);
</script>

<style scoped>
.cart-summary {
  margin-bottom: 1.5rem;
}
.cart-summary table {
  width: 100%;
  border-collapse: collapse;
}
.cart-summary th,
.cart-summary td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: center;
}
.grand-total {
  text-align: right;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>
