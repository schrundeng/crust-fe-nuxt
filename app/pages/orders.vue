<template>
  <div class="bg-yellow min-h-screen">
    <div
      class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center"
    >
      <div class="w-full max-w-3xl">
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
        <div class="mx-6 flex justify-center">
          <Receipt ref="receiptRef" :order-meta="orderMeta" :items="orderItems" />
        </div>

        <!-- Action Buttons -->
        <div class="mx-6 flex justify-center mt-6">
          <div
            class="max-w-md w-full flex flex-col md:flex-row gap-3"
          >
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
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Download } from "lucide-vue-next";

const route = useRoute();
const receiptRef = ref(null);
const isDownloading = ref(false);

const orderItems = ref([]);

const orderMeta = ref({
  orderId: "",
  date: "",
  customer: null,
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

const formatDate = (isoOrStr) => {
  if (!isoOrStr) return "";
  if (typeof isoOrStr === "string" && /^\d{2}\/\d{2}\/\d{2,4}$/.test(isoOrStr)) {
    return isoOrStr;
  }
  try {
    const d = new Date(isoOrStr);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch {
    return "";
  }
};

const loadOrder = () => {
  if (!import.meta.client) return;

  const queryId = route.query.id
    ? String(route.query.id).trim().toUpperCase()
    : null;
  const rawOrder = localStorage.getItem("cnd_order");

  if (!rawOrder && !queryId) {
    navigateTo("/menu");
    return;
  }

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
        orderId: queryId || parsed.orderId || parsed.id || "",
        date:
          formatDate(parsed.orderDate || parsed.created_at || parsed.date) ||
          formatDate(new Date().toISOString()),
        customer:
          parsed.customer ||
          (parsed.client?.nama_client
            ? { username: parsed.client.nama_client }
            : null),
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
  } else if (queryId) {
    orderMeta.value = {
      orderId: queryId,
      date: formatDate(new Date().toISOString()),
      customer: null,
      orderType: "PRE-ORDER",
      cashier: "ADMIN 01",
      paymentMethod: "QRIS",
    };
  }
};

onMounted(() => {
  loadOrder();
});
</script>
