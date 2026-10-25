<template>
  <div
    ref="statusCardRef"
    class="w-full max-w-sm md:max-w-[576px] mt-6 bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] text-brown overflow-hidden"
    :style="cardHeightStyle"
    @transitionend="onCardTransitionEnd"
  >
    <Transition
      :name="isReady ? 'status-fade' : ''"
      :css="isReady"
      mode="out-in"
      @before-leave="onStatusBeforeLeave"
      @enter="onStatusEnter"
    >
      <!-- BELUM LUNAS: File Upload -->
      <div
        v-if="status === 'belum_lunas'"
        key="belum_lunas"
        class="p-5 md:p-6 text-brown flex flex-col gap-4 w-full"
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
            <span class="text-[13px] text-brown">
              a/n Crusts & Daisies
            </span>
          </div>
          <button
            ref="copyBtnRef"
            type="button"
            class="pl-3.5 pr-4 py-2 rounded-[10px] bg-green border-[2px] hover:bg-[#cdd15e] border-brown shadow-[0px_1.5px_0px_0px_#522C15] text-brown text-[13px] font-semibold btn-press cursor-pointer flex items-center justify-center shrink-0 overflow-hidden"
            :style="copyBtnStyle"
            @click="copyAccount"
          >
            <Transition name="fade" mode="out-in">
              <span
                v-if="copied"
                key="copied"
                class="flex items-center gap-1.5 whitespace-nowrap"
              >
                <Check class="w-3.5 h-3.5 stroke-[3] text-brown shrink-0" />
                <span>Tersalin!</span>
              </span>
              <span
                v-else
                key="copy"
                class="flex items-center gap-1.5 whitespace-nowrap"
              >
                <Copy class="w-3.5 h-3.5 stroke-[3] shrink-0" />
                <span>Salin</span>
              </span>
            </Transition>
          </button>

          <!-- Hidden measurement spans for copy button width animation -->
          <div
            class="absolute -left-[9999px] top-0 opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <span
              ref="measureCopyRef"
              class="pl-3.5 pr-4 py-2 border-[2px] text-[13px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Copy class="w-3.5 h-3.5 stroke-[3] shrink-0" />
              <span>Salin</span>
            </span>
            <span
              ref="measureCopiedRef"
              class="pl-3.5 pr-4 py-2 border-[2px] text-[13px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Check class="w-3.5 h-3.5 stroke-[3] shrink-0" />
              <span>Tersalin!</span>
            </span>
          </div>
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

        <!-- Dropzone / Preview Transition -->
        <Transition name="fade" mode="out-in">
          <!-- Dropzone state when no file selected -->
          <div
            v-if="!selectedFile && !currentPreview"
            key="dropzone"
            class="relative rounded-[10px] p-6 text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            :class="
              isDragging ? 'bg-[#eeefcb]' : 'bg-white hover:bg-[#FAF6EC]'
            "
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
            key="preview"
            class="border-[2px] border-brown bg-[#FAF6EC] rounded-[10px] shadow-[0px_2px_0px_0px_#522C15] p-3.5 flex items-center gap-3.5"
          >
            <img
              :src="currentPreview"
              alt="Preview bukti transfer"
              class="w-16 h-16 object-cover rounded-[8px] border-[2px] border-brown shrink-0"
            />
            <div class="flex-1 min-w-0 text-left">
              <span
                class="block text-[14px] font-semibold text-brown truncate"
              >
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
        </Transition>

        <!-- Submit Button -->
        <button
          type="button"
          :disabled="!currentPreview || isUploading"
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
        v-else-if="status === 'diproses'"
        key="diproses"
        class="p-6 text-brown flex flex-col gap-4 text-center items-center w-full"
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
            disiapkan di dapur Crusts &amp; Daisies :D
          </p>
        </div>

        <div
          v-if="currentPreview"
          class="w-full bg-[#FAF6EC] border-[2px] border-brown rounded-[10px] p-3 flex items-center gap-3 text-left"
        >
          <img
            :src="currentPreview"
            alt="Bukti pembayaran"
            class="w-14 h-14 object-cover rounded-[6px] border-[2px] border-brown shrink-0"
          />
          <div class="flex-1 min-w-0">
            <span
              class="block text-[13px] font-semibold text-brown truncate"
            >
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
        v-else-if="status === 'lunas'"
        key="lunas"
        class="p-6 text-brown flex flex-col items-center text-center gap-2 w-full"
      >
        <div
          class="w-12 h-12 rounded-full bg-green border-[2.5px] border-brown flex items-center justify-center text-brown"
        >
          <CheckCircle class="w-6 h-6 stroke-[2.5]" />
        </div>
        <h2 class="text-[18px] font-bold">Pembayaran Telah Lunas!</h2>
        <p class="text-[14px] text-brown leading-relaxed">
          Terima kasih sudah memesan di Crusts &amp; Daisies!! Struk pesananmu
          bisa kamu simpan &lt;3
        </p>
        <NuxtLink
          :to="{
            path: '/orders',
            query: orderId ? { id: orderId } : {},
          }"
          class="w-full bg-green hover:bg-[#cdd15e] btn-press rounded-[10px] py-3 text-center font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Lihat Struk </span>
        </NuxtLink>
      </div>

      <!-- BATAL: Pesanan Dibatalkan -->
      <div
        v-else-if="status === 'batal'"
        key="batal"
        class="p-5 md:p-6 text-center flex flex-col items-center gap-3 text-brown w-full"
      >
        <h2 class="text-[18px] font-bold">Pesanan Dibatalkan</h2>
        <p class="text-[14px] text-brown">
          Pesanan ini telah dibatalkan. Silakan kunjungi menu untuk membuat
          pesanan baru.
        </p>
        <NuxtLink
          to="/menu"
          class="w-full btn-press bg-green hover:bg-[#cdd15e] rounded-[10px] py-3 font-semibold text-brown text-[16px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] text-center"
        >
          Kembali ke Menu
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from "vue";
import {
  Upload,
  X,
  Copy,
  Check,
  Clock,
  CheckCircle,
} from "lucide-vue-next";

const props = defineProps({
  previewUrl: {
    type: String,
    default: null,
  },
  orderMeta: {
    type: Object,
    default: () => ({
      status: "belum_lunas",
      orderId: "",
    }),
  },
});

const emit = defineEmits(["update:previewUrl", "submitted"]);

const status = computed(() => props.orderMeta?.status || "belum_lunas");
const orderId = computed(() => props.orderMeta?.orderId || "");

const isReady = ref(false);

const copyBtnRef = ref(null);
const measureCopyRef = ref(null);
const measureCopiedRef = ref(null);
const copyWidth = ref(null);
const copiedWidth = ref(null);

const measureCopyBtn = () => {
  if (measureCopyRef.value && measureCopiedRef.value) {
    copyWidth.value = measureCopyRef.value.offsetWidth;
    copiedWidth.value = measureCopiedRef.value.offsetWidth;
  }
};

onMounted(() => {
  nextTick(() => {
    isReady.value = true;
    measureCopyBtn();
  });
});

const copyBtnStyle = computed(() => {
  if (!isReady.value || !copyWidth.value || !copiedWidth.value) {
    return {};
  }
  return {
    width: `${copied.value ? copiedWidth.value : copyWidth.value}px`,
    transition: "width 240ms cubic-bezier(0.4, 0, 0.2, 1)",
  };
});

const statusCardRef = ref(null);
const cardHeight = ref(null);
const isTransitioning = ref(false);
let safetyTimer = null;

const cardHeightStyle = computed(() => {
  if (isTransitioning.value && cardHeight.value) {
    return {
      height: `${cardHeight.value}px`,
      transition: "height 280ms cubic-bezier(0.4, 0, 0.2, 1)",
    };
  }
  return {};
});

const onStatusBeforeLeave = () => {
  if (!isReady.value) return;
  if (statusCardRef.value) {
    cardHeight.value = statusCardRef.value.offsetHeight;
    isTransitioning.value = true;
  }
};

const onStatusEnter = (el) => {
  if (!isReady.value || !el || !statusCardRef.value) return;

  const borderOffset =
    statusCardRef.value.offsetHeight - statusCardRef.value.clientHeight || 5;
  const targetHeight = el.offsetHeight + borderOffset;

  if (safetyTimer) clearTimeout(safetyTimer);

  requestAnimationFrame(() => {
    cardHeight.value = targetHeight;
  });

  // Safety fallback in case transitionend is cancelled or suppressed
  safetyTimer = setTimeout(() => {
    isTransitioning.value = false;
    cardHeight.value = null;
  }, 320);
};

const onCardTransitionEnd = (e) => {
  if (e.target === statusCardRef.value && e.propertyName === "height") {
    if (safetyTimer) clearTimeout(safetyTimer);
    isTransitioning.value = false;
    cardHeight.value = null;
  }
};

const fileInputRef = ref(null);
const selectedFile = ref(null);
const internalPreview = ref(props.previewUrl);
const isUploading = ref(false);
const copied = ref(false);
const isDragging = ref(false);

const currentPreview = computed(
  () => internalPreview.value || props.previewUrl,
);

watch(
  () => props.previewUrl,
  (val) => {
    internalPreview.value = val;
  },
);

let copyTimer = null;

const copyAccount = async () => {
  try {
    await navigator.clipboard.writeText("8290123456");
    copied.value = true;
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Failed to copy account number", e);
  }
};

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer);
  if (safetyTimer) clearTimeout(safetyTimer);
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFile = (file) => {
  if (!file) return;
  selectedFile.value = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    internalPreview.value = event.target?.result;
    emit("update:previewUrl", internalPreview.value);
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
  internalPreview.value = null;
  if (fileInputRef.value) fileInputRef.value.value = "";
  if (import.meta.client) {
    localStorage.removeItem("cnd_proof");
  }
  emit("update:previewUrl", null);
};

const submitPaymentProof = () => {
  if (!currentPreview.value) return;
  isUploading.value = true;
  setTimeout(() => {
    if (import.meta.client && currentPreview.value) {
      try {
        localStorage.setItem("cnd_proof", currentPreview.value);
      } catch (err) {
        console.warn("Storage quota exceeded for proof", err);
      }
    }
    emit("submitted", currentPreview.value);
    isUploading.value = false;
  }, 400);
};
</script>

<style scoped>
.status-fade-enter-active {
  transition: opacity 160ms ease-out 60ms;
}
.status-fade-leave-active {
  transition: opacity 90ms ease-in;
}

.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
