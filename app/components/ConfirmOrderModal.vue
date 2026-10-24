<template>
  <Transition name="modal-backdrop">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      @click.self="handleClose"
    >
      <div
        :class="[
          'bg-[#ece3cc] border-[3px] border-brown rounded-[16px] shadow-[0px_4px_0px_0px_#522C15] w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto',
          isLaunching ? 'animate-rocket' : 'animate-bounce-in',
        ]"
      >
        <!-- Close Button -->
        <button
          type="button"
          @click="handleClose"
          class="absolute right-5 top-7 text-brown/70 hover:text-brown transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X class="w-5 h-5 stroke-[2.5]" />
        </button>

        <!-- Title -->
        <h2
          class="text-[22px] font-bold text-brown font-['Livvic'] tracking-tight"
        >
          Konfirmasi Pesanan
        </h2>
        <p class="text-[13px] text-brown/80 mt-1">
          Cek dulu data pemesanmu sebelum pesanan dicatat yaa ^^
        </p>

        <!-- Customer Data Preview -->
        <div
          class="mt-4 bg-[#fff9ee] border-[2px] border-brown rounded-[10px] p-3.5 space-y-2 text-brown"
        >
          <div class="flex items-center justify-between text-[14px]">
            <span class="text-brown/70 font-medium">Username:</span>
            <span class="font-semibold text-right truncate ml-2">{{
              customer.username || "-"
            }}</span>
          </div>
          <div class="flex items-center justify-between text-[14px]">
            <span class="text-brown/70 font-medium">E-mail:</span>
            <span class="font-semibold text-right truncate ml-2">{{
              customer.email || "-"
            }}</span>
          </div>
          <div class="flex items-center justify-between text-[14px]">
            <span class="text-brown/70 font-medium">No. Telp / WA:</span>
            <span class="font-semibold text-right truncate ml-2">{{
              customer.phone || "-"
            }}</span>
          </div>
        </div>

        <!-- Selected Items List -->
        <div
          v-if="items.length > 0"
          class="mt-4 space-y-3 max-h-[180px] overflow-y-auto -mr-2 pr-2 pretty-scroll"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between py-2 last:border-b-0 border-b-[1.5px] border-[#522C15]/15"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-[8px] bg-white overflow-hidden shrink-0 p-1 flex items-center justify-center border border-brown/20"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-xs text-brown/50 font-bold">🥐</span>
              </div>
              <div>
                <h4 class="font-semibold text-sm text-brown leading-tight">
                  {{ item.name }}
                </h4>
                <p class="text-xs text-brown/70 mt-0.5">
                  {{ item.quantity }}x @ Rp{{
                    (Number(item.price) || 0).toLocaleString("id-ID")
                  }}
                </p>
              </div>
            </div>
            <div class="font-semibold text-sm text-brown">
              Rp{{
                (
                  (Number(item.price) || 0) * (Number(item.quantity) || 1)
                ).toLocaleString("id-ID")
              }}
            </div>
          </div>
        </div>

        <!-- Long dashed receipt divider -->
        <svg class="w-full h-1 my-3 text-brown/35">
          <line
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="8 6"
          />
        </svg>

        <!-- Total Price -->
        <div class="flex items-center justify-between">
          <span class="font-semibold text-md text-brown">Total Pembayaran</span>
          <span class="font-bold text-md text-brown">
            Rp{{ total.toLocaleString("id-ID") }}
          </span>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            @click="handleClose"
            class="w-full sm:flex-1 bg-white py-3 rounded-[10px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] font-semibold text-brown hover:bg-[#522C15]/5 btn-press transition-all text-[15px] cursor-pointer"
          >
            Periksa Lagi
          </button>
          <button
            type="button"
            @click="handleConfirm"
            class="w-full sm:flex-1 bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] py-3 font-semibold text-brown text-[15px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer"
          >
            Pesan Sekarang!
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: Object,
    default: () => ({
      username: "",
      email: "",
      phone: "",
    }),
  },
  items: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["close", "confirm"]);

const isLaunching = ref(false);

const handleClose = () => {
  if (isLaunching.value) return;
  emit("close");
};

const handleConfirm = () => {
  if (isLaunching.value) return;
  isLaunching.value = true;
  setTimeout(() => {
    isLaunching.value = false;
    emit("confirm");
  }, 430);
};
</script>

<style scoped>
/* Backdrop fade */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.32s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Modal bounce-in from top */
.animate-bounce-in {
  animation: bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(-90px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Normal reverse exit on close */
.modal-backdrop-leave-active .animate-bounce-in {
  animation: slide-up-out 0.15s ease-in forwards;
}

@keyframes slide-up-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-70px);
  }
}

/* Rocket launch straight to top on confirm */
.animate-rocket {
  animation: rocket-launch 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes rocket-launch {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  22% {
    /* slight squash anticipation */
    transform: translateY(14px) scale(1.04, 0.96);
  }
  100% {
    /* blast off straight into the ceiling */
    opacity: 0;
    transform: translateY(-130vh) scale(0.85);
  }
}
</style>
