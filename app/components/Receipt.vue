<template>
  <div class="relative w-full flex flex-col items-center">
    <!-- hidden measurement span for dynamic monospace dash calculation -->
    <span
      ref="measureSpan"
      class="font-receipt text-[20px] absolute -left-[9999px] opacity-0 pointer-events-none whitespace-nowrap"
      >----------</span
    >

    <!-- receipt -->
    <div
      ref="receiptCardRef"
      class="bg-white paper-texture mt-2 max-w-md w-full mx-auto shadow-[0px_4px_16px_rgba(82,44,21,0.08)] md:p-12 p-8 text-brown"
    >
      <!-- store header -->
      <div class="text-center pb-2 space-y-0.5">
        <h2 class="font-receipt text-[32px] tracking-wider leading-tight">
          CRUSTS & DAISIES
        </h2>
        <p class="font-receipt text-[20px] text-brown/60">Baked Fresh Daily</p>
        <p class="font-receipt text-[20px] text-brown/60">
          CFD JL. BESAR IJEN, KOTA MALANG
        </p>
        <p class="font-receipt text-[20px] text-brown/60">
          SETIAP MINGGU: 06.00 - 10.00 WIB
        </p>
        <p class="font-receipt text-[20px] text-brown/60">
          IG: @crustsndaisies WA: 0891-2345-6789
        </p>
      </div>

      <!-- dynamic font dash divider -->
      <div
        class="font-receipt text-[20px] text-brown/60 leading-none my-2 text-center overflow-hidden"
      >
        {{ "=".repeat(dashCount) }}
      </div>

      <!-- metadata -->
      <div class="font-receipt text-[20px] space-y-1 py-1">
        <div class="flex justify-between">
          <span>NO: {{ orderMeta.orderId }}</span>
          <span>{{ orderMeta.date }}</span>
        </div>
        <div class="flex justify-between" v-if="orderMeta.customer?.username">
          <span>PLG: {{ orderMeta.customer.username }}</span>
          <span>ORDER: {{ orderMeta.orderType || "PRE-ORDER" }}</span>
        </div>
        <div class="flex justify-between">
          <span>KASIR: {{ orderMeta.cashier || "ADMIN 01" }}</span>
          <span>BAYAR: {{ orderMeta.paymentMethod || "QRIS" }}</span>
        </div>
      </div>

      <!-- dynamic font dash divider -->
      <div
        class="font-receipt text-[20px] text-brown/60 leading-none my-2 text-center overflow-hidden"
      >
        {{ "-".repeat(dashCount) }}
      </div>

      <!-- Order Status Message -->
      <div class="py-2">
        <p class="font-receipt text-[20px] leading-snug">
          Berikut rincian pesananmu:
        </p>
      </div>

      <!-- Items Table -->
      <div class="font-receipt text-[20px] space-y-3 py-2">
        <div
          v-for="(item, index) in items"
          :key="item.id || index"
          class="flex items-start justify-between gap-2"
        >
          <div class="flex-1">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span class="block text-[20px] text-brown/60">
              @ Rp{{ (Number(item.price) || 0).toLocaleString("id-ID") }}
            </span>
          </div>
          <div class="font-medium shrink-0">
            Rp{{
              (
                (Number(item.price) || 0) * (Number(item.quantity) || 1)
              ).toLocaleString("id-ID")
            }}
          </div>
        </div>
      </div>

      <!-- dynamic font dash divider -->
      <div
        class="font-receipt text-[20px] text-brown/60 leading-none my-2 text-center overflow-hidden"
      >
        {{ "-".repeat(dashCount) }}
      </div>

      <!-- Totals -->
      <div class="font-receipt space-y-1.5 py-1 text-[20px]">
        <div class="flex justify-between">
          <span>SUBTOTAL:</span>
          <span>Rp{{ orderTotal.toLocaleString("id-ID") }}</span>
        </div>
        <div class="flex justify-between text-brown/60">
          <span>PAJAK (0%):</span>
          <span>Rp0</span>
        </div>
        <div
          class="flex justify-between items-center text-[32px] font-receipt pt-2"
        >
          <span>TOTAL:</span>
          <span>Rp{{ orderTotal.toLocaleString("id-ID") }}</span>
        </div>
      </div>

      <!-- dynamic font double cut divider -->
      <div
        class="font-receipt text-[20px] text-brown/60 leading-none my-2 text-center overflow-hidden"
      >
        {{ "=".repeat(dashCount) }}
      </div>

      <!-- Closing Note -->
      <div
        class="text-center font-receipt text-[20px] text-brown/60 py-2 space-y-1"
      >
        <p>Terima kasih sudah jajan di Crusts & Daisies &lt;3</p>
        <p>Simpan struk ini sebagai bukti pemesanan</p>
      </div>

      <!-- Real Barcode Strip via JsBarcode -->
      <div class="mt-5 flex flex-col items-center">
        <svg ref="barcodeSvg" class="h-12 max-w-[220px]"></svg>
        <span
          class="font-receipt text-[20px] tracking-widest text-brown/60 mt-6"
        >
          * {{ orderMeta.orderId }} *
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import JsBarcode from "jsbarcode";
import { toJpeg } from "html-to-image";

const props = defineProps({
  orderMeta: {
    type: Object,
    default: () => ({
      orderId: "CND-849201",
      date: "21/10/26",
      customer: { username: "Naufaru" },
      orderType: "PRE-ORDER",
      cashier: "ADMIN 01",
      paymentMethod: "QRIS",
    }),
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const receiptCardRef = ref(null);
const measureSpan = ref(null);
const barcodeSvg = ref(null);
const dashCount = ref(42);

let resizeObserver = null;

const orderTotal = computed(() => {
  return props.items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
});

const updateDashes = () => {
  if (receiptCardRef.value && measureSpan.value) {
    const style = window.getComputedStyle(receiptCardRef.value);
    const pLeft = parseFloat(style.paddingLeft) || 24;
    const pRight = parseFloat(style.paddingRight) || 24;
    const innerWidth = receiptCardRef.value.clientWidth - pLeft - pRight;
    const totalSampleWidth =
      measureSpan.value.getBoundingClientRect().width || 100;
    const charWidth = totalSampleWidth > 0 ? totalSampleWidth / 10 : 9.5;
    if (charWidth > 0 && innerWidth > 0) {
      dashCount.value = Math.max(10, Math.floor(innerWidth / charWidth));
    }
  }
};

const renderBarcode = () => {
  if (barcodeSvg.value && props.orderMeta?.orderId) {
    try {
      JsBarcode(barcodeSvg.value, props.orderMeta.orderId, {
        format: "CODE128",
        lineColor: "#522C15",
        background: "transparent",
        width: 1.8,
        height: 42,
        displayValue: false,
        margin: 0,
      });
    } catch (e) {
      console.error("Barcode generation error", e);
    }
  }
};

const downloadReceipt = async () => {
  if (!receiptCardRef.value) return;

  if (document.fonts) {
    await document.fonts.ready;
  }

  const el = receiptCardRef.value;
  const dataUrl = await toJpeg(el, {
    quality: 0.9,
    pixelRatio: 1.5,
    style: {
      margin: "0",
      marginTop: "0",
      marginRight: "0",
      marginBottom: "0",
      marginLeft: "0",
      transform: "none",
      boxShadow: "none",
    },
    backgroundColor: "#FBF7EE",
  });

  const link = document.createElement("a");
  link.download = `struk-${props.orderMeta?.orderId || "crusts"}.jpg`;
  link.href = dataUrl;
  link.click();
};

watch(
  () => props.orderMeta?.orderId,
  () => {
    renderBarcode();
  },
);

onMounted(async () => {
  if (import.meta.client) {
    renderBarcode();
    updateDashes();

    if (document.fonts) {
      await document.fonts.ready;
      updateDashes();
    }

    if (receiptCardRef.value && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateDashes();
      });
      resizeObserver.observe(receiptCardRef.value);
    } else {
      window.addEventListener("resize", updateDashes);
    }
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else if (import.meta.client) {
    window.removeEventListener("resize", updateDashes);
  }
});

defineExpose({
  receiptCardRef,
  downloadReceipt,
});
</script>

<style scoped>
.paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper-noise)' opacity='0.1'/%3E%3C/svg%3E");
}
</style>
