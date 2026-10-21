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
          Menu
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
      <div
        class="max-w-3xl w-full mx-auto flex items-center justify-between px-6"
      >
        <div class="text-[16px] font-semibold text-white">
          Total: Rp{{ total.toLocaleString("id-ID") }}
        </div>
        <button
          @click="openModal"
          :disabled="total === 0"
          :class="[
            'flex flex-row bg-green hover:bg-[#cdd15e] active:scale-[0.99] transition-all rounded-[10px] py-2 px-12 font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#271205]',
            total === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          ]"
        >
          Pesan!
        </button>
      </div>
    </div>

    <!-- checkout summary modal -->
    <CheckoutModal
      :is-open="isModalOpen"
      :items="selectedItems"
      :total="total"
      @close="isModalOpen = false"
      @checkout="proceedToCheckout"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isModalOpen = ref(false);

const cartItems = ref([
  {
    id: 1,
    name: "Apple Pie",
    price: 7000,
    quantity: 0,
    image: "/img/illust/apple_pie.png",
  },
  {
    id: 2,
    name: "Caramel Pudding",
    price: 7000,
    quantity: 0,
    image: "/img/illust/caramel_pudding.png",
  },
  {
    id: 3,
    name: "Eclair Pastry",
    price: 8000,
    quantity: 0,
    image: "/img/illust/eclair_pastry.png",
  },
  {
    id: 4,
    name: "Choquettes",
    price: 6000,
    quantity: 0,
    image: "/img/illust/choquettes.png",
  },
  {
    id: 5,
    name: "Teh Tarik",
    price: 5000,
    quantity: 0,
    image: "/img/illust/teh_tarik.png",
  },
]);

const increaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find((i) => i.id === id);
  if (item && item.quantity > 0) item.quantity--;
};

const total = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
});

const selectedItems = computed(() => {
  return cartItems.value.filter((i) => i.quantity > 0);
});

const openModal = () => {
  if (total.value > 0) {
    isModalOpen.value = true;
  }
};

const proceedToCheckout = () => {
  if (import.meta.client) {
    localStorage.setItem("cnd_cart", JSON.stringify(selectedItems.value));
  }
  navigateTo("/checkout");
};
</script>
