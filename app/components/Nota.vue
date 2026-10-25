<template>
  <div
    id="nota"
    class="bg-[#fafafa] w-full max-w-sm md:max-w-[576px] p-5 md:p-[30px] shadow-[0px_4px_16px_rgba(82,44,21,0.06)] md:shadow-[0px_6px_24px_rgba(82,44,21,0.06)] text-blue relative flex flex-col mx-auto"
  >
    <!-- nota header -->
    <div class="flex items-start justify-between gap-4 md:gap-6">
      <!-- branding -->
      <div class="flex flex-col items-start">
        <img
          :src="logoUrl"
          alt="Crusts & Daisies"
          class="w-24 md:w-36 h-auto object-contain"
        />
        <span
          class="text-[13px] md:text-[19.5px] font-semibold text-black tracking-tight mt-1 md:mt-1.5"
        >
          Crusts & Daisies
        </span>
      </div>

      <!-- nama tanggal -->
      <div
        class="flex flex-col gap-2.5 md:gap-[15px] w-32 md:w-48 pt-1 md:pt-1.5"
      >
        <div class="h-4 md:h-6"></div>
        <div
          class="flex items-end justify-between border-b border-black pr-1 md:pr-1.5 pb-0.5 md:pb-1"
        >
          <span class="text-[11px] md:text-[16.5px] font-normal text-black"
            >Kepada Yth.</span
          >
          <span
            class="font-handwriting pb-0.5 md:pb-1 text-[12px] md:text-[18px] leading-none"
            >{{
              orderMeta?.customer?.name ||
              orderMeta?.customer?.username ||
              "Naufaru"
            }}</span
          >
        </div>
        <div
          class="flex items-end justify-between border-b border-black pr-1 md:pr-1.5 pb-0.5 md:pb-1"
        >
          <span class="text-[11px] md:text-[16.5px] font-normal text-black"
            >Tanggal</span
          >
          <span
            class="font-handwriting pb-0.5 md:pb-1 text-[12px] md:text-[18px] leading-none"
            >{{ orderMeta?.date || "22/10/26" }}</span
          >
        </div>
      </div>
    </div>

    <!-- nota table -->
    <div class="relative mt-5 md:mt-[30px]">
      <table class="w-full border-separate border-spacing-0 text-black">
        <!-- table header -->
        <thead>
          <tr
            class="h-6 md:h-9 text-[11px] md:text-[16.5px] font-normal text-center"
          >
            <th
              class="w-[36px] md:w-[54px] border-t border-b border-l border-r border-black font-normal p-0 text-center"
            >
              Bnyk.
            </th>
            <th
              class="border-t border-b border-r border-black font-normal p-0 text-center"
            >
              Nama Barang
            </th>
            <th
              class="w-[65px] md:w-[98px] border-t border-b border-r border-black font-normal p-0 text-center"
            >
              Harga
            </th>
            <th
              class="w-[78px] md:w-[117px] border-t border-b border-r border-black font-normal p-0 text-center"
            >
              Jumlah
            </th>
          </tr>
        </thead>

        <!-- table body -->
        <tbody>
          <!-- fillable rows -->
          <tr
            v-for="(item, index) in items"
            :key="item.id || index"
            class="h-6 md:h-9 text-[13px] md:text-[19.5px] text-blue font-handwriting"
          >
            <td class="border-b border-l border-r border-black text-center p-0">
              {{ item.quantity }}
            </td>
            <td
              class="border-b border-r border-black px-1.5 md:px-2.5 truncate p-0 max-w-0"
            >
              {{ item.name }}
            </td>
            <td
              class="border-b border-r border-black text-right px-1 md:px-1.5 p-0"
            >
              {{ (Number(item.price) || 0).toLocaleString("id-ID") }}
            </td>
            <td
              class="border-b border-r border-black text-right px-1 md:px-1.5 p-0"
            >
              {{
                (
                  (Number(item.price) || 0) * (Number(item.quantity) || 1)
                ).toLocaleString("id-ID")
              }}
            </td>
          </tr>

          <!-- empty rows -->
          <tr
            v-for="n in emptyRowsCount"
            :key="'empty-' + n"
            class="h-6 md:h-9"
          >
            <td class="border-b border-l border-r border-black p-0"></td>
            <td class="border-b border-r border-black p-0"></td>
            <td class="border-b border-r border-black p-0"></td>
            <td class="border-b border-r border-black p-0"></td>
          </tr>
        </tbody>

        <!-- table footer (jumlah row) -->
        <tfoot>
          <tr class="h-6 md:h-9">
            <td colspan="3" class="border-r border-black p-0">
              <div
                class="flex items-center justify-between h-full px-1.5 md:px-2.5 text-[11px] md:text-[16.5px] font-normal text-black"
              >
                <div class="flex items-baseline gap-1 md:gap-1.5">
                  <span>ID Pesanan:</span>
                  <span>CND-</span>
                  <span
                    class="font-handwriting text-blue text-[13px] md:text-[19.5px] -ml-0.5 md:-ml-1 leading-none"
                  >
                    {{ orderMeta?.orderId?.replace(/^CND-?/, "") || "849201" }}
                  </span>
                </div>
                <span>Jumlah Rp.</span>
              </div>
            </td>
            <td
              class="border-b border-r border-black text-right px-1 md:px-1.5 font-handwriting text-blue text-[13px] md:text-[19.5px] p-0"
            >
              {{ total.toLocaleString("id-ID") }}
            </td>
          </tr>
        </tfoot>
      </table>

      <!-- squiggly thing (centered in the jumlah column) -->
      <div
        v-if="currentSquiggleSvg"
        class="absolute right-0 bottom-6 md:bottom-9 w-[78px] md:w-[117px] pointer-events-none flex items-end justify-center"
      >
        <img
          :src="currentSquiggleSvg"
          alt=""
          class="w-auto h-auto md:scale-150 md:origin-bottom object-contain opacity-90 transition-transform"
          :class="{
            'translate-y-[4px] md:translate-y-[6px]': items.length === 1,
          }"
        />
      </div>

      <!-- status stamp -->
      <div
        v-if="activeStatusStampSvg"
        class="absolute left-0 right-[78px] md:right-[117px] bottom-6 md:bottom-9 pointer-events-none flex items-center justify-center overflow-hidden"
        :style="{
          '--empty-rows': emptyRowsCount,
        }"
        :class="[
          'h-[calc(var(--empty-rows)*24px)] md:h-[calc(var(--empty-rows)*36px)]',
          'min-h-[72px] md:min-h-[108px]',
        ]"
      >
        <img
          :src="activeStatusStampSvg"
          :alt="orderMeta?.status || 'belum_lunas'"
          class="h-18 md:h-[108px] w-auto object-contain -rotate-6 opacity-85 mix-blend-multiply transition-all duration-300"
        />
      </div>
    </div>

    <!-- nota footer -->
    <div class="flex items-end justify-between mt-4 md:mt-6 pt-1 md:pt-1.5">
      <!-- perhatian -->
      <div
        class="border border-black p-1.5 md:p-2 w-[130px] md:w-[195px] text-[9.5px] md:text-[14px] leading-tight text-black"
      >
        <span class="block font-semibold">PERHATIAN!!</span>
        <span>Barang yang sudah di beli tidak bisa dikembalikan</span>
      </div>

      <!-- ttd -->
      <div class="flex flex-col items-center text-black">
        <span class="text-[11px] md:text-[16.5px] font-normal self-start"
          >Hormat Kami,</span
        >
        <img
          :src="ttdUrl"
          alt="Tanda Tangan"
          class="w-24 md:w-36 h-auto -my-1 md:-my-1.5 pointer-events-none"
        />
        <div class="w-28 md:w-[168px] border-b border-black"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const logoUrl = "/img/illust/nota/cnd_nota.png";
const ttdUrl = "/img/illust/nota/ttd.svg";

const totalRows = 11;

const props = defineProps({
  orderMeta: {
    type: Object,
    default: () => ({
      orderId: "CND-849201",
      date: "22/10/26",
      customer: { username: "Naufaru" },
      status: "belum_lunas",
    }),
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const total = computed(() => {
  return props.items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
});

const emptyRowsCount = computed(() =>
  Math.max(0, totalRows - props.items.length),
);

const currentSquiggleSvg = computed(() => {
  const count = props.items.length;
  if (count < 1 || count > 5 || emptyRowsCount.value <= 0) return null;
  return `/img/illust/nota/${count}_item${count > 1 ? "s" : ""}.svg`;
});

const activeStatusStampSvg = computed(() => {
  const status = props.orderMeta?.status;
  if (!status) return null;
  const valid = ["belum_lunas", "lunas", "diproses", "batal"];
  if (valid.includes(status)) {
    return `/img/illust/nota/${status}.svg`;
  }
  return `/img/illust/nota/belum_lunas.svg`;
});
</script>
