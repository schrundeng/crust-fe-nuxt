<template>
  <div class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center">
    <!-- Make the header take full width or adjust header styling if needed, assuming header is fixed it won't be affected by flex col -->
    <CrustHeader class="w-full" />

    <div class="w-full max-w-3xl">
      <!-- Title -->
      <div class="py-8 pb-8 mx-6">
        <h1
          class="text-[32px] font-bold text-brown leading-none font['Livvic'] tracking-tight"
        >
          Keranjangmu
        </h1>
      </div>

      <!-- Cart items list -->
      <div v-if="cartItems.length > 0" class="mx-6">
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @increase="increaseQuantity(item.id)"
          @decrease="decreaseQuantity(item.id)"
          @remove="removeItem(item.id)"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="mx-6 mt-10 text-center">
        <p class="text-[16px] text-brown font-normal">
          Kamu belum punya apa-apa di keranjang. Liat-liat dulu yuk!
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="cartItems.length > 0"
      class="fixed bottom-0 left-0 w-full bg-brown h-22 flex z-10"
    >
      <div class="max-w-3xl w-full mx-auto flex items-center justify-between px-6">
        <div class="text-[16px] font-semibold text-white">
          Total: Rp{{ total.toLocaleString("id-ID") }}
        </div>
        <button
          class="bg-green hover:bg-[#cdd15e] transition-colors rounded-[10px] px-8 py-2.5 font-semibold text-black shadow-[-5px_3px_4px_0px_rgba(0,0,0,0.25)] text-[16px]"
        >
          Pesan!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cartItems = ref([
  { id: 1, name: "Apple Pie", price: 7000, quantity: 23, image: null },
  { id: 2, name: "Apple Pie", price: 7000, quantity: 2, image: null },
  { id: 3, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 4, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 5, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 6, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 7, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 8, name: "Apple Pie", price: 7000, quantity: 1, image: null },
  { id: 9, name: "Apple Pie", price: 7000, quantity: 1, image: null },
]);

const increaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item && item.quantity > 0) item.quantity--;
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((i) => i.id !== id);
};

const total = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
});
</script>
