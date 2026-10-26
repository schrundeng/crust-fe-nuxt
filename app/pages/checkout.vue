<template>
  <div class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center">
    <div class="w-full max-w-3xl">
      <!-- Title -->
      <div class="py-8 pb-4 mx-6">
        <h1
          class="text-[32px] font-bold text-brown leading-none font-['Livvic'] tracking-tight"
        >
          Checkout
        </h1>
      </div>

      <!-- Subtitle Description -->
      <div class="mx-6 mb-6">
        <p class="text-[14px] text-brown leading-snug">
          Isi kolom-kolom dibawah dengan data yang asli, agar admin bisa
          menghubungi kalian apabila terdapat kendala :D
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="mx-6 bg-[#ece3cc] rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-5 md:p-6 text-brown flex flex-col gap-4"
      >
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Input Username -->
          <div class="flex flex-col gap-[7px]">
            <label for="username" class="text-[16px] font-semibold text-brown">
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Isi namamu disini"
              required
              class="w-full bg-white border-[2.5px] border-brown rounded-[10px] px-4 py-3 text-[14px] text-brown placeholder:text-brown/40 shadow-[0px_2px_0px_0px_#522C15] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
            />
          </div>

          <!-- Input Email -->
          <div class="flex flex-col gap-[7px]">
            <label for="email" class="text-[16px] font-semibold text-brown">
              E-mail Aktif
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Isi e-mail mu disini"
              required
              class="w-full bg-white border-[2.5px] border-brown rounded-[10px] px-4 py-3 text-[14px] text-brown placeholder:text-brown/40 shadow-[0px_2px_0px_0px_#522C15] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
            />
          </div>

          <!-- Input Nomor Telp / WhatsApp -->
          <div class="flex flex-col gap-[7px]">
            <label for="phone" class="text-[16px] font-semibold text-brown">
              Nomor Telp/WhatsApp
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              inputmode="numeric"
              placeholder="Isi nomormu disini"
              required
              class="w-full bg-white border-[2.5px] border-brown rounded-[10px] px-4 py-3 text-[14px] text-brown placeholder:text-brown/40 shadow-[0px_2px_0px_0px_#522C15] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
              @input="form.phone = form.phone.replace(/[^0-9+]/g, '')"
            />
          </div>

          <!-- Important Notice -->
          <div
            class="bg-white border-[2px] mt-10 border-brown rounded-[10px] p-3.5 text-brown space-y-1.5"
          >
            <h2 class="text-[16px] font-semibold mb-2">
              Pemberitahuan Penting:
            </h2>
            <ol
              class="list-decimal list-inside space-y-1 text-[14px] leading-relaxed"
            >
              <li class="pl-1">
                Kami menyarankan agar klient memesan di hari Senin sampai Jumat.
              </li>
              <li class="pl-1">
                Kami tidak menerima <em class="italic">cancellation</em> dan
                pesanan di hari Sabtu dan Minggu.
              </li>
              <li class="pl-1">
                Apabila terdapat kendala atau ingin melakukan
                <em class="italic">cancellation</em> silahkan menghubungi kontak
                kami.
              </li>
            </ol>
          </div>
          <!-- Action Buttons -->
          <div class="pt-2 flex flex-col md:flex-row gap-3">
            <NuxtLink
              to="/menu"
              class="w-full md:flex-1 bg-white hover:bg-[#fff9ee] btn-press transition-all rounded-[10px] py-3 px-6 font-semibold text-brown text-[16px] text-center border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft class="w-4 h-4 stroke-[3px]" />
              <span>Kembali</span>
            </NuxtLink>
            <button
              type="submit"
              class="w-full md:flex-1 bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] py-3 px-6 font-semibold text-brown text-[16px] text-center border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer"
            >
              Konfirmasi Pesananmu!
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirmation Modal with Filled Data Recap -->
    <ConfirmOrderModal
      :is-open="isConfirmOpen"
      :customer="form"
      :items="cartItems"
      :total="total"
      @close="isConfirmOpen = false"
      @confirm="handleFinalSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { ArrowLeft } from "lucide-vue-next";

const isConfirmOpen = ref(false);

useHead({
  title: "Checkout",
});
const cartItems = ref([]);

const form = reactive({
  username: "",
  email: "",
  phone: "",
});

const loadCart = () => {
  if (import.meta.client) {
    try {
      const raw = localStorage.getItem("cnd_cart");
      if (raw) {
        cartItems.value = JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to parse cnd_cart in checkout:", e);
    }
  }
};

onMounted(() => {
  loadCart();
});

const total = computed(() => {
  return cartItems.value.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
});

const handleSubmit = () => {
  isConfirmOpen.value = true;
};

const handleFinalSubmit = async () => {
  let createdOrderId = null;
  if (import.meta.client) {
    const orderData = {
      customer: { ...form },
      items: cartItems.value,
      orderDate: new Date().toISOString(),
      orderId: "CND-" + Math.floor(100000 + Math.random() * 900000),
      status: "belum_lunas",
    };
    createdOrderId = orderData.orderId;
    localStorage.setItem("cnd_order", JSON.stringify(orderData));
  }
  if (createdOrderId) {
    await navigateTo({
      path: "/status",
      query: { id: createdOrderId },
    });
  } else {
    await navigateTo("/status");
  }
  isConfirmOpen.value = false;
};
</script>
