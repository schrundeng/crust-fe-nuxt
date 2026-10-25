<template>
  <div
    class="w-full max-w-sm md:max-w-[576px] mt-6 bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-5 md:p-6 text-brown flex flex-col"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div>
        <h2 class="text-[18px] font-bold leading-tight">Cek Status Pesanan</h2>
        <p class="text-[13px] text-brown/80 mt-1 leading-snug">
          Punya kode pesanan lain? Masukkan ID pesananmu untuk melacak status
          dan struk pembelianmu.
        </p>
      </div>
    </div>

    <!-- Form -->
    <form
      class="flex flex-col md:flex-row gap-3.5 md:items-end"
      @submit.prevent="handleCheckOrder"
    >
      <div class="flex flex-col gap-[7px] flex-1">
        <label
          for="check-order-id"
          class="text-[14px] font-semibold text-brown"
        >
          Kode Pesanan (Order ID)
        </label>
        <input
          id="check-order-id"
          v-model="orderIdInput"
          type="text"
          placeholder="Contoh: CND-XXXXXX"
          required
          class="w-full h-[48px] bg-white border-[2.5px] border-brown rounded-[10px] px-4 text-[14px] text-brown placeholder:text-brown/40 shadow-[0px_1.5px_0px_0px_#522C15] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
          @input="orderIdInput = orderIdInput.toUpperCase()"
        />
      </div>

      <div class="flex">
        <button
          type="submit"
          :disabled="isSearching || !orderIdInput.trim()"
          class="w-full md:w-[200px] h-[48px] shrink-0 bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] px-6 font-semibold text-brown text-[16px] text-center border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{{ isSearching ? "Mencari..." : "Cek Status" }}</span>
        </button>
      </div>
    </form>

    <!-- Search Result Feedback -->
    <Transition name="expand" :duration="{ enter: 400, leave: 340 }">
      <div v-if="searchResult" class="expand-wrapper">
        <div class="expand-inner">
          <div
            class="result-content border-[2px] border-brown rounded-[10px] p-3.5 text-brown transition-colors"
            :class="searchResult.found ? 'bg-[#FAF6EC]' : 'bg-[#ffdfdf]'"
          >
            <div v-if="searchResult.found" class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-[14px] font-semibold text-brown">
                  Pesanan Ditemukan!
                </span>
                <span
                  class="px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold border-[2px] border-brown"
                  :class="statusBadgeClass(searchResult.order.status)"
                >
                  {{ formatStatus(searchResult.order.status) }}
                </span>
              </div>

              <div class="text-[14px] text-brown space-y-1 leading-snug">
                <p>{{ searchResult.order.orderId }}</p>

                <p>
                  Atas nama:
                  {{
                    searchResult.order.customer?.name ||
                    searchResult.order.customer?.username ||
                    "Pelanggan"
                  }}
                </p>
                <p class="text-[14px] text-brown">
                  Tanggal:
                  {{
                    formatOrderDate(
                      searchResult.order.orderDate || searchResult.order.date,
                    )
                  }}
                </p>
              </div>

              <button
                type="button"
                class="mt-1 w-full bg-white hover:bg-[#fff9ee] btn-press border-[2px] border-brown rounded-[8px] h-[44px] text-[14px] font-semibold text-brown shadow-[0px_1.5px_0px_0px_#522C15] flex items-center justify-center gap-1.5 cursor-pointer"
                @click="selectOrder(searchResult.order)"
              >
                <span>Tampilkan Nota Pesanan Ini</span>
              </button>
            </div>

            <div v-else class="flex items-start gap-2.5">
              <AlertCircle class="w-5 h-5 text-[#f23a3a] stroke-[2.5] shrink-0" />
              <div class="text-brown leading-snug">
                <span class="font-semibold text-[14px] text-brown block"
                  >Pesanan Tidak Ditemukan</span
                >
                <p class="mt-0.5 leading-snug text-[13px] text-brown/80">
                  Kode {{ searchResult.searchedId }} tidak ditemukan di sistem.
                  Pastikan kode yang kamu masukkan sudah sesuai ya!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AlertCircle } from "lucide-vue-next";

const emit = defineEmits(["order-selected"]);
const route = useRoute();

const orderIdInput = ref("");
const isSearching = ref(false);
const searchResult = ref(null);

onMounted(() => {
  if (route.query.id) {
    orderIdInput.value = String(route.query.id).trim().toUpperCase();
  }
});

const formatOrderDate = (isoOrStr) => {
  if (!isoOrStr) return "-";
  try {
    const d = new Date(isoOrStr);
    if (isNaN(d.getTime())) return String(isoOrStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch {
    return String(isoOrStr);
  }
};

const formatStatus = (st) => {
  switch (st) {
    case "belum_lunas":
      return "Belum Lunas";
    case "diproses":
      return "Diproses";
    case "lunas":
      return "Lunas";
    case "batal":
      return "Dibatalkan";
    default:
      return st?.replace("_", " ") || "Diproses";
  }
};

const statusBadgeClass = (st) => {
  switch (st) {
    case "belum_lunas":
      return "bg-[#fadc84] text-brown";
    case "diproses":
      return "bg-[#bde2fc] text-blue";
    case "lunas":
      return "bg-green text-brown";
    case "batal":
      return "bg-[#ffcfcf] text-red-700";
    default:
      return "bg-[#FAF6EC] text-brown";
  }
};

const handleCheckOrder = () => {
  const query = orderIdInput.value.trim().toUpperCase();
  if (!query) return;

  isSearching.value = true;
  searchResult.value = null;

  setTimeout(() => {
    isSearching.value = false;
    let foundOrder = null;

    if (import.meta.client) {
      const rawCurrent = localStorage.getItem("cnd_order");
      if (rawCurrent) {
        try {
          const parsed = JSON.parse(rawCurrent);
          const currentId = (parsed.orderId || parsed.id || "").toUpperCase();
          if (currentId === query) {
            foundOrder = parsed;
          }
        } catch (e) {
          console.error("Gagal membaca cnd_order", e);
        }
      }
    }

    if (foundOrder) {
      searchResult.value = {
        found: true,
        order: foundOrder,
        searchedId: query,
      };
    } else {
      searchResult.value = {
        found: false,
        searchedId: query,
      };
    }
  }, 350);
};

const selectOrder = (order) => {
  if (import.meta.client) {
    try {
      localStorage.setItem("cnd_order", JSON.stringify(order));
    } catch (e) {
      console.error("Gagal menyimpan cnd_order", e);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  emit("order-selected", order);
};
</script>

<style scoped>
.expand-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  margin-top: 16px;
}

.expand-inner {
  min-height: 0;
  overflow: hidden;
}

/* Enter transition: height/margin first, then opacity */
.expand-enter-active {
  transition: grid-template-rows 280ms cubic-bezier(0.4, 0, 0.2, 1),
              margin-top 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.expand-enter-from {
  grid-template-rows: 0fr;
  margin-top: 0px;
}
.expand-enter-to {
  grid-template-rows: 1fr;
  margin-top: 16px;
}

.expand-enter-active .result-content {
  transition: opacity 180ms ease-out 220ms;
}
.expand-enter-from .result-content {
  opacity: 0;
}
.expand-enter-to .result-content {
  opacity: 1;
}

/* Leave transition: opacity first, then height/margin collapse */
.expand-leave-active {
  transition: grid-template-rows 220ms cubic-bezier(0.4, 0, 0.2, 1) 120ms,
              margin-top 220ms cubic-bezier(0.4, 0, 0.2, 1) 120ms;
}
.expand-leave-from {
  grid-template-rows: 1fr;
  margin-top: 16px;
}
.expand-leave-to {
  grid-template-rows: 0fr;
  margin-top: 0px;
}

.expand-leave-active .result-content {
  transition: opacity 120ms ease-in 0ms;
}
.expand-leave-from .result-content {
  opacity: 1;
}
.expand-leave-to .result-content {
  opacity: 0;
}
</style>
