<template>
  <div
    class="flex items-center p-4 bg-[#FFF7E9] border-[2.5px] border-[#522C15] rounded-[10px] shadow-[0px_2px_0px_0px_#522C15] mb-4.5"
  >
    <!-- Image Placeholder -->
    <div
      class="bg-[#f0e8d1] shrink-0 w-24 h-24 rounded-[10px] overflow-hidden relative"
    >
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Product Details -->
    <div class="ml-4 grow h-24 flex flex-col justify-between">
      <div class="mt-2">
        <h3 class="font-semibold text-[16px] text-brown">
          {{ item.name }}
        </h3>
        <p class="text-[14px] text-brown mt-1">
          Rp{{ item.price.toLocaleString("id-ID") }}
        </p>
      </div>

      <div class="self-end flex items-center gap-2">
        <!-- Counter -->
        <div
          class="bg-[#f0e8d1] flex items-center justify-between rounded-full h-8 w-22 px-1 border-[2px] border-[#522C15] shadow-[0px_2px_0px_0px_#522C15]"
        >
          <button
            @click="$emit('decrease')"
            class="flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Decrease quantity"
          >
            <img src="~/assets/icons/minus.svg" alt="Minus" class="w-3 h-3" />
          </button>
          <span class="text-[16px] font-semibold text-brown leading-none">{{
            item.quantity
          }}</span>
          <button
            @click="$emit('increase')"
            class="flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Increase quantity"
          >
            <img src="~/assets/icons/plus.svg" alt="Plus" class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

defineEmits(["increase", "decrease"]);
</script>
