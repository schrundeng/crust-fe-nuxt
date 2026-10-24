<template>
  <Transition name="modal-backdrop">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      @click.self="handleClose"
    >
      <div
        :class="[
          'bg-[#FFF7E9] border-[3px] border-brown rounded-[16px] shadow-[0px_4px_0px_0px_#522C15] w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto',
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
          Ringkasan Pesanan
        </h2>
        <p class="text-[13px] text-brown/80 mt-1">
          Cek dulu pesananmu sebelum lanjut checkout yaa ^^
        </p>

        <!-- Selected Items List -->
        <div
          class="mt-4 space-y-3 max-h-[250px] sm:max-h-[280px] overflow-y-auto -mr-2 pr-2 pretty-scroll"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between py-2 last:border-b-0 border-b-[1.5px] border-[#522C15]/15"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-[8px] bg-[#f0e8d1] overflow-hidden shrink-0 p-1 flex items-center justify-center"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 class="font-semibold text-sm text-brown leading-tight">
                  {{ item.name }}
                </h4>
                <p class="text-xs text-brown/70 mt-0.5">
                  {{ item.quantity }}x @ Rp{{
                    item.price.toLocaleString("id-ID")
                  }}
                </p>
              </div>
            </div>
            <div class="font-semibold text-sm text-brown">
              Rp{{ (item.price * item.quantity).toLocaleString("id-ID") }}
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
            @click="handleClose"
            class="w-full sm:flex-1 py-3 rounded-[10px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] font-semibold text-brown hover:bg-[#522C15]/5 btn-press transition-all text-[15px] cursor-pointer"
          >
            Ubah Pesanan
          </button>
          <button
            @click="handleCheckout"
            class="w-full sm:flex-1 bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] py-3 font-semibold text-brown text-[15px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer"
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(["close", "checkout"]);

const isLaunching = ref(false);

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      isLaunching.value = false;
    }
  }
);

const handleClose = () => {
  if (isLaunching.value) return;
  emit("close");
};

const handleCheckout = () => {
  if (isLaunching.value) return;
  isLaunching.value = true;
  setTimeout(() => {
    emit("checkout");
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

/* Rocket launch straight to top on status */
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

/* prettier scrollbar */
.pretty-scroll::-webkit-scrollbar {
  width: 5px;
}
.pretty-scroll::-webkit-scrollbar-track {
  background: rgba(82, 44, 21, 0.08);
  border-radius: 9999px;
}
.pretty-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(82, 44, 21, 0.45);
  border-radius: 9999px;
}
.pretty-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(82, 44, 21, 0.4);
}
/* Firefox */
.pretty-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(82, 44, 21, 0.45) rgba(82, 44, 21, 0.08);
}
</style>
