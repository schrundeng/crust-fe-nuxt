<template>
  <div
    class="flex items-center p-4 bg-[#FFF7E9] border-2 border-[#2a2a2a] rounded-[10px] shadow-[0px_2px_0px_0px_#2a2a2a] mb-4.5"
  >
    <!-- Image Placeholder -->
    <div
      class="bg-[#d9d9d9] shrink-0 w-24 h-24 rounded-[10px] overflow-hidden relative"
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
        <h3 class="font-semibold text-[16px] text-black leading-tight">
          {{ item.name }}
        </h3>
        <p class="text-[14px] text-black leading-tight mt-1">
          Rp{{ item.price.toLocaleString("id-ID") }}
        </p>
      </div>

      <!-- Actions: Trash and Counter -->
      <div class="self-end flex items-center gap-2">
        <!-- Trash Button -->
        <button
          @click="$emit('remove')"
          class="flex items-center justify-center bg-[#d9d9d9] w-8 h-8 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Remove item"
        >
          <img
            src="~/assets/icons/trash.svg"
            alt="Remove"
            class="w-3.5 h-3.5"
          />
        </button>

        <!-- Counter -->
        <div
          class="bg-[#d9d9d9] flex items-center justify-between rounded-full h-8 w-22 px-1"
        >
          <button
            @click="$emit('decrease')"
            class="flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Decrease quantity"
          >
            <img src="~/assets/icons/minus.svg" alt="Minus" class="w-3 h-3" />
          </button>
          <span class="text-[16px] font-semibold text-black leading-none">{{
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

defineEmits(["increase", "decrease", "remove"]);
</script>
