<template>
  <div class="bg-yellow min-h-screen">
    <div class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center">
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

      <!-- file upload -->
      <div class="mx-6 flex flex-col items-center">
        <div
          v-if="orderMeta.status === 'belum_lunas'"
          class="w-full max-w-sm md:max-w-[576px] mt-6 bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-5 md:p-6 text-brown flex flex-col gap-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-[18px] font-bold leading-tight">
                Kirim Bukti Pembayaran
              </h2>
            </div>
          </div>

          <!-- Payment Destination & Copy -->
          <div
            class="bg-[#FAF6EC] border-[2px] border-brown rounded-[10px] p-3.5 flex items-center justify-between gap-3"
          >
            <div class="flex flex-col">
              <span class="text-[12px] text-brown font-semibold">
                TRANSFER BCA
              </span>
              <span class="text-[18px] font-bold text-brown tracking-wide">
                829-012-3456
              </span>
              <span class="text-[13px] text-brown"> a/n Crusts & Daisies </span>
            </div>
            <button
              type="button"
              class="pl-3.5 pr-4 py-2 rounded-[10px] bg-green border-[2px] hover:bg-[#cdd15e] border-brown shadow-[0px_1.5px_0px_0px_#522C15] text-brown text-[13px] font-semibold btn-press cursor-pointer flex items-center gap-1.5 shrink-0"
              @click="copyAccount"
            >
              <Check v-if="copied" class="w-3.5 h-3.5 stroke-[3] text-brown" />
              <Copy v-else class="w-3.5 h-3.5 stroke-[3]" />
              <span>{{ copied ? "Tersalin!" : "Salin" }}</span>
            </button>
          </div>

          <!-- Petunjuk Pembayaran Notice -->
          <div
            class="bg-[#FAF6EC] border-[2px] border-brown rounded-[10px] p-3.5 text-brown space-y-1.5"
          >
            <span class="text-[14px] font-semibold text-brown block">
              Petunjuk Pembayaran:
            </span>
            <ul
              class="text-[13px] text-brown space-y-1 leading-relaxed list-none p-0 m-0"
            >
              <li>
                &bull; Transfer sesuai nominal total tagihan ke nomor rekening
                BCA di atas
              </li>
              <li>
                &bull; Simpan screenshot / foto struk bukti pembayaran yang
                jelas
              </li>
              <li>
                &bull; Upload buktinya di bawah agar status pesanan langsung
                diverifikasi oleh kasir
              </li>
            </ul>
          </div>

          <!-- File Input & Dropzone -->
          <input
            ref="fileInputRef"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            class="hidden"
            @change="onFileSelected"
          />

          <!-- Dropzone state when no file selected -->
          <div
            v-if="!selectedFile && !previewUrl"
            class="relative rounded-[10px] p-6 text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            :class="isDragging ? 'bg-[#eeefcb]' : 'bg-white hover:bg-[#FAF6EC]'"
            @click="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onFileDrop"
          >
            <!-- Long dashed border matching CheckoutModal (8 6) -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none text-brown"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="10"
                ry="10"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-dasharray="8 6"
                style="
                  width: calc(100% - 2px);
                  height: calc(100% - 2px);
                  x: 1px;
                  y: 1px;
                  rx: 10px;
                  ry: 10px;
                "
              />
            </svg>

            <div
              class="w-12 h-12 rounded-full bg-green border-[2.5px] border-brown flex items-center justify-center text-brown group-hover:scale-105 transition-transform"
            >
              <Upload class="w-5 h-5 stroke-[2.5]" />
            </div>
            <span class="text-[14px] font-semibold text-brown">
              Klik atau tarik foto / screenshot bukti transfer ke sini
            </span>
            <span class="text-[12px] text-brown">
              Format PNG, JPG, atau WEBP (Maksimal 5MB)
            </span>
          </div>

          <!-- Preview state when file chosen -->
          <div
            v-else
            class="border-[2px] border-brown bg-[#FAF6EC] rounded-[10px] shadow-[0px_2px_0px_0px_#522C15] p-3.5 flex items-center gap-3.5"
          >
            <img
              :src="previewUrl"
              alt="Preview bukti transfer"
              class="w-16 h-16 object-cover rounded-[8px] border-[2px] border-brown shrink-0"
            />
            <div class="flex-1 min-w-0 text-left">
              <span class="block text-[14px] font-semibold text-brown truncate">
                {{ selectedFile?.name || "bukti-transfer.jpg" }}
              </span>
              <span class="block text-[12px] text-brown mt-0.5">
                {{
                  selectedFile?.size
                    ? (selectedFile.size / 1024).toFixed(1) + " KB"
                    : "Bukti terlampir"
                }}
              </span>
            </div>
            <button
              type="button"
              class="w-8 h-8 rounded-full border-[2px] shadow-[0px_2px_0px_0px_#522C15] border-brown bg-white text-brown cursor-pointer shrink-0 flex items-center justify-center btn-press"
              title="Hapus foto"
              @click="clearSelectedFile"
            >
              <X class="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            :disabled="!previewUrl || isUploading"
            class="w-full bg-green hover:bg-[#cdd15e] btn-press rounded-[10px] py-3 text-center font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="submitPaymentProof"
          >
            <span>{{
              isUploading ? "Mengirim Bukti..." : "Kirim Bukti Pembayaran!"
            }}</span>
          </button>
        </div>

        <!-- DIPROSES: Menunggu Verifikasi Admin -->
        <div
          v-else-if="orderMeta.status === 'diproses'"
          class="w-full max-w-sm md:max-w-[576px] mt-6 bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-6 text-brown flex flex-col gap-4 text-center items-center"
        >
          <div
            class="w-12 h-12 rounded-full bg-green border-[2.5px] border-brown flex items-center justify-center text-brown"
          >
            <Clock class="w-6 h-6 stroke-[2.5]" />
          </div>

          <div class="space-y-1">
            <h2 class="text-[18px] font-bold">Bukti Pembayaran Diterima!</h2>
            <p class="text-[14px] text-brown leading-relaxed max-w-md">
              Admin sedang memverifikasi bukti transfer dan pesananmu segera
              disiapkan di dapur Crusts & Daisies :D
            </p>
          </div>

          <div
            v-if="previewUrl"
            class="w-full bg-[#FAF6EC] border-[2px] border-brown rounded-[10px] p-3 flex items-center gap-3 text-left"
          >
            <img
              :src="previewUrl"
              alt="Bukti pembayaran"
              class="w-14 h-14 object-cover rounded-[6px] border-[2px] border-brown shrink-0"
            />
            <div class="flex-1 min-w-0">
              <span class="block text-[13px] font-semibold text-brown truncate">
                Bukti Transfer Terlampir
              </span>
              <span class="block text-[12px] text-brown">
                Menunggu konfirmasi admin kasir
              </span>
            </div>
          </div>
        </div>

        <!-- LUNAS: Struk Resmi Siap -->
        <div
          v-else-if="orderMeta.status === 'lunas'"
          class="w-full max-w-sm md:max-w-[576px] mt-6 flex flex-col gap-3"
        >
          <div
            class="bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-6 text-brown flex flex-col items-center text-center gap-2"
          >
            <div
              class="w-12 h-12 rounded-full bg-green border-[2.5px] border-brown flex items-center justify-center text-brown"
            >
              <CheckCircle class="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 class="text-[18px] font-bold">Pembayaran Telah Lunas!</h2>
            <p class="text-[14px] text-brown leading-relaxed">
              Terima kasih sudah memesan di Crusts & Daisies!! Struk pesananmu
              bisa kamu simpan <3
            </p>
            <NuxtLink
              to="/orders"
              class="w-full bg-green hover:bg-[#cdd15e] btn-press rounded-[10px] py-3 text-center font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Lihat Struk </span>
            </NuxtLink>
          </div>
        </div>

        <!-- BATAL: Pesanan Dibatalkan -->
        <div
          v-else-if="orderMeta.status === 'batal'"
          class="w-full max-w-sm md:max-w-[576px] mt-6 bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-5 text-center flex flex-col items-center gap-3 text-brown"
        >
          <h2 class="text-[18px] font-bold">Pesanan Dibatalkan</h2>
          <p class="text-[14px] text-brown">
            Pesanan ini telah dibatalkan. Silakan kunjungi menu untuk membuat
            pesanan baru.
          </p>
          <NuxtLink
            to="/menu"
            class="w-full btn-press bg-green hover:bg-[#cdd15e] rounded-[10px] py-3 font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15]"
          >
            Kembali ke Menu
          </NuxtLink>
        </div>

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
      </div>
    </div>
  </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Upload,
  X,
  Clock,
  CheckCircle,
  Copy,
  Check,
} from "lucide-vue-next";

const rawOrderItems = ref([]);

const orderMeta = ref({
  orderId: "CND-849201",
  date: "22/10/26",
  customer: { username: "Naufaru" },
  status: "belum_lunas",
});

const fileInputRef = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const isUploading = ref(false);
const copied = ref(false);
const isDragging = ref(false);

const copyAccount = async () => {
  try {
    await navigator.clipboard.writeText("8290123456");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Failed to copy account number", e);
  }
};

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFile = (file) => {
  if (!file) return;
  selectedFile.value = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    previewUrl.value = event.target?.result;
  };
  reader.readAsDataURL(file);
};

const onFileSelected = (e) => {
  const file = e.target.files?.[0];
  handleFile(file);
};

const onFileDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files?.[0];
  handleFile(file);
};

const clearSelectedFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  if (fileInputRef.value) fileInputRef.value.value = "";
  if (import.meta.client) {
    localStorage.removeItem("cnd_proof");
  }
};

const submitPaymentProof = () => {
  if (!previewUrl.value) return;
  isUploading.value = true;
  setTimeout(() => {
    if (import.meta.client && previewUrl.value) {
      try {
        localStorage.setItem("cnd_proof", previewUrl.value);
      } catch (err) {
        console.warn("Storage quota exceeded for proof", err);
      }
    }
    setStatus("diproses");
    isUploading.value = false;
  }, 400);
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

const setStatus = (newStatus) => {
  orderMeta.value.status = newStatus;
  if (import.meta.client) {
    const raw = localStorage.getItem("cnd_order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.status = newStatus;
        localStorage.setItem("cnd_order", JSON.stringify(parsed));
      } catch (e) {
        console.error("Failed to update status in localStorage", e);
      }
    } else {
      const newOrder = {
        orderId: orderMeta.value.orderId,
        orderDate: new Date().toISOString(),
        customer: orderMeta.value.customer,
        status: newStatus,
        items: rawOrderItems.value,
      };
      localStorage.setItem("cnd_order", JSON.stringify(newOrder));
    }
  }
};

const loadFromStorage = () => {
  if (!import.meta.client) return;

  let loadedItems = [];

  // 1. Check cnd_order for metadata and items
  const rawOrder = localStorage.getItem("cnd_order");
  if (rawOrder) {
    try {
      const parsed = JSON.parse(rawOrder);
      orderMeta.value = {
        orderId:
          parsed.orderId ||
          parsed.id ||
          orderMeta.value.orderId ||
          "CND-849201",
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
    } catch (e) {
      console.error("Failed to parse cnd_order from localStorage:", e);
    }
  }

  // 2. Check cnd_cart as fallback
  const rawCart = localStorage.getItem("cnd_cart");
  if (rawCart) {
    try {
      const parsedCart = JSON.parse(rawCart);
      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        if (loadedItems.length === 0) {
          loadedItems = parsedCart;
        }
      }
    } catch (e) {
      console.error("Failed to parse cnd_cart from localStorage:", e);
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
