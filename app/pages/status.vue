<template>
  <div class="bg-yellow min-h-screen">
    <div
      class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center"
    >
      <div class="w-full max-w-3xl">
        <!-- title -->
        <div class="py-8 pb-4 mx-6">
          <h1
            class="text-[32px] font-bold text-brown leading-none font-['Livvic'] tracking-tight"
          >
            Status Pesanan
          </h1>
        </div>

        <!-- notice -->
        <div class="mx-6 mb-6">
          <p class="text-[14px] text-brown leading-snug">
            Pesananmu telah tercatat di kasir!! Silakan selesaikan pembayaran
            sesuai rincian nota di bawah,<br class="hidden sm:inline" />
            kemudian upload bukti pembayaran agar pesananmu langsung diproses~
          </p>
        </div>

        <!-- nota component -->
        <div class="mx-6 flex justify-center">
          <Nota :order-meta="orderMeta" :items="orderItems" />
        </div>

        <!-- file upload / status card -->
        <div class="mx-6 flex flex-col items-center">
          <ClientOnly>
            <FileUpload
              v-model:preview-url="previewUrl"
              :order-meta="orderMeta"
              @submitted="onProofSubmitted"
            />
          </ClientOnly>

          <!-- debug status buttons -->
          <div
            class="w-full max-w-sm md:max-w-[576px] mt-8 pt-4 flex flex-col items-center gap-2"
          >
            <span class="text-[11px] font-semibold text-brown tracking-wider">
              Debug Status
            </span>
            <div class="flex flex-wrap items-center justify-center gap-2">
              <button
                v-for="st in ['belum_lunas', 'diproses', 'lunas', 'batal']"
                :key="st"
                type="button"
                class="px-3.5 py-1.5 rounded-[10px] text-[13px] font-semibold transition-all cursor-pointer border-[2px] border-brown shadow-[0px_2px_0px_0px_#522C15] btn-press"
                :class="
                  orderMeta.status === st
                    ? 'bg-green text-brown'
                    : 'bg-white text-brown hover:bg-yellow'
                "
                @click="setStatus(st)"
              >
                {{ st.replace("_", " ") }}
              </button>
            </div>
          </div>
          <StatusCheck @order-selected="onOrderSelected" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const rawOrderItems = ref([]);

const previewUrl = ref(null);

const onProofSubmitted = (proof) => {
  previewUrl.value = proof;
  setStatus("diproses");
};

const formatDate = (isoOrStr) => {
  if (!isoOrStr) return "22/10/26";
  try {
    const d = new Date(isoOrStr);
    if (isNaN(d.getTime())) return String(isoOrStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch {
    return "22/10/26";
  }
};

const getStoredOrderMeta = () => {
  if (import.meta.client) {
    const queryId = route.query.id
      ? String(route.query.id).trim().toUpperCase()
      : null;
    const rawOrder = localStorage.getItem("cnd_order");
    if (rawOrder) {
      try {
        const parsed = JSON.parse(rawOrder);
        const activeId = queryId || parsed.orderId || parsed.id || "CND-849201";
        return {
          orderId: activeId,
          date: formatDate(
            parsed.orderDate || parsed.created_at || new Date().toISOString(),
          ),
          customer: parsed.customer || {
            username: parsed.client?.nama_client || "Naufaru",
          },
          status: parsed.status || "belum_lunas",
        };
      } catch (e) {
        console.error("Failed to parse cnd_order:", e);
      }
    }
    if (queryId) {
      return {
        orderId: queryId,
        date: formatDate(new Date().toISOString()),
        customer: { username: "Pelanggan" },
        status: "belum_lunas",
      };
    }
  }
  return {
    orderId: "CND-849201",
    date: "22/10/26",
    customer: { username: "Naufaru" },
    status: "belum_lunas",
  };
};

const orderMeta = ref(getStoredOrderMeta());

const setStatus = (newStatus) => {
  orderMeta.value.status = newStatus;
  if (import.meta.client) {
    const raw = localStorage.getItem("cnd_order");
    let orderObj = {};
    if (raw) {
      try {
        orderObj = JSON.parse(raw);
      } catch (e) {
        console.error("Failed to update status in localStorage", e);
      }
    }
    orderObj.status = newStatus;
    if (orderMeta.value.orderId) {
      orderObj.orderId = orderMeta.value.orderId;
    }
    if (orderMeta.value.customer) {
      orderObj.customer = orderMeta.value.customer;
    }
    if (orderMeta.value.date) {
      orderObj.orderDate = orderMeta.value.date;
    }
    if (rawOrderItems.value && rawOrderItems.value.length > 0) {
      orderObj.items = rawOrderItems.value;
    }
    localStorage.setItem("cnd_order", JSON.stringify(orderObj));
  }
};

const onOrderSelected = (order) => {
  if (order?.orderId) {
    router.replace({ query: { ...route.query, id: order.orderId } });
  }
  loadFromStorage();
};

const loadFromStorage = () => {
  if (!import.meta.client) return;

  let loadedItems = [];
  const queryId = route.query.id
    ? String(route.query.id).trim().toUpperCase()
    : null;

  // 1. Check cnd_order for metadata and items
  const rawOrder = localStorage.getItem("cnd_order");
  if (rawOrder) {
    try {
      const parsed = JSON.parse(rawOrder);
      const activeId = queryId || parsed.orderId || parsed.id || "CND-849201";

      orderMeta.value = {
        orderId: activeId,
        date: formatDate(
          parsed.orderDate || parsed.created_at || new Date().toISOString(),
        ),
        customer: parsed.customer || {
          username: parsed.client?.nama_client || "Naufaru",
        },
        status: parsed.status || "belum_lunas",
      };

      if (
        parsed.items &&
        Array.isArray(parsed.items) &&
        parsed.items.length > 0
      ) {
        loadedItems = parsed.items;
      }

      // If no queryId in URL, sync the URL with activeId
      if (!queryId && activeId) {
        router.replace({ query: { ...route.query, id: activeId } });
      }
    } catch (e) {
      console.error("Failed to parse cnd_order from localStorage:", e);
    }
  } else if (queryId) {
    orderMeta.value = {
      orderId: queryId,
      date: formatDate(new Date().toISOString()),
      customer: { username: "Pelanggan" },
      status: "belum_lunas",
    };
    loadedItems = [];
  }

  // 2. Check cnd_cart as fallback
  if (!loadedItems.length) {
    const rawCart = localStorage.getItem("cnd_cart");
    if (rawCart) {
      try {
        const parsedCart = JSON.parse(rawCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          loadedItems = parsedCart;
        }
      } catch (e) {
        console.error("Failed to parse cnd_cart from localStorage:", e);
      }
    }
  }

  // Check saved proof if any
  const savedProof = localStorage.getItem("cnd_proof");
  if (savedProof) {
    previewUrl.value = savedProof;
  }

  const validItems = loadedItems
    .filter((it) => (Number(it.quantity) || 0) > 0)
    .map((it, idx) => ({
      id: it.id || idx + 1,
      name: it.name,
      price: Number(it.price) || 0,
      quantity: Number(it.quantity) || 1,
    }));

  rawOrderItems.value = validItems;
};

watch(
  () => route.query.id,
  () => {
    loadFromStorage();
  },
);

if (import.meta.client) {
  loadFromStorage();
}

onMounted(() => {
  loadFromStorage();
});

const orderItems = computed(() => {
  return rawOrderItems.value;
});

const total = computed(() => {
  return orderItems.value.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
});
</script>
