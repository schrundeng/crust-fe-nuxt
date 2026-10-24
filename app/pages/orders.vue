<template>
  <div class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center">
    <div class="w-full max-w-3xl md:px-0 px-4">
      <div class="py-8 pb-4 mx-6">
        <h1
          class="text-[32px] font-bold text-brown leading-none font-['Livvic'] tracking-tight"
        >
          Struk
        </h1>
      </div>

      <div class="mx-6 mb-6">
        <p class="text-[14px] text-brown leading-snug">
          Ini dia bukti transaksi manismu di Crusts &amp; Daisies! Jangan lupa
          disimpan~
        </p>
      </div>

      <!-- Receipt Component -->
      <Receipt ref="receiptRef" :order-meta="orderMeta" :items="orderItems" />

      <!-- Action Buttons -->
      <div class="max-w-md w-full mx-auto mt-6 flex flex-col md:flex-row gap-3">
        <NuxtLink
          to="/"
          class="flex-1 w-full bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] py-3 text-center font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center"
        >
          Kembali ke Homepage
        </NuxtLink>

        <button
          @click="handleDownload"
          :disabled="isDownloading"
          class="flex-1 w-full bg-white hover:bg-[#f3eedf] btn-press transition-all rounded-[10px] py-3 text-center font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Download
            class="w-5 h-5 stroke-[2.5px] shrink-0"
            v-if="!isDownloading"
          />
          <span>{{
            isDownloading ? "Menyimpan Struk..." : "Download Struk"
          }}</span>
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Download } from "lucide-vue-next";

const receiptRef = ref(null);
const isDownloading = ref(false);

const orderItems = ref([
  { id: 1, name: "Apple Pie", price: 7000, quantity: 2 },
  { id: 2, name: "Caramel Pudding", price: 7000, quantity: 1 },
]);

const orderMeta = ref({
  orderId: "CND-849201",
  date: "21/10/26",
  customer: { username: "Naufaru" },
  orderType: "PRE-ORDER",
  cashier: "ADMIN 01",
  paymentMethod: "QRIS",
});

const handleDownload = async () => {
  if (!receiptRef.value || isDownloading.value) return;
  isDownloading.value = true;
  try {
    await receiptRef.value.downloadReceipt();
  } catch (err) {
    console.error("Failed to download receipt:", err);
  } finally {
    isDownloading.value = false;
  }
};

onMounted(async () => {
  if (import.meta.client) {
    const rawOrder = localStorage.getItem("cnd_order");
    if (rawOrder) {
      try {
        const parsed = JSON.parse(rawOrder);
        if (parsed.items && parsed.items.length > 0) {
          orderItems.value = parsed.items;
        } else {
          const rawCart = localStorage.getItem("cnd_cart");
          if (rawCart) {
            try {
              const parsedCart = JSON.parse(rawCart);
              if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                orderItems.value = parsedCart;
              }
            } catch {}
          }
        }
        orderMeta.value = {
          orderId: parsed.orderId || parsed.id || "CND-849201",
          date:
            parsed.orderDate || parsed.created_at
              ? new Date(
                  parsed.orderDate || parsed.created_at,
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })
              : "21/10/26",
          customer: parsed.customer || {
            username: parsed.client?.nama_client || "Naufaru",
          },
          orderType: parsed.orderType || parsed.order_type || "PRE-ORDER",
          cashier:
            parsed.cashier ||
            parsed.admin?.username ||
            parsed.kasir ||
            "ADMIN 01",
          paymentMethod:
            parsed.paymentMethod ||
            parsed.metode_pembayaran ||
            parsed.bayar ||
            "QRIS",
        };
      } catch (e) {
        console.error("Failed to parse cnd_order", e);
      }
    }
  }
});
</script>
