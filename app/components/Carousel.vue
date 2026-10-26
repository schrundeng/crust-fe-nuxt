<template>
  <div class="taplak-container">
    <div class="taplak">
      <div class="taplak-horizontal-stripes"></div>
      <div class="taplak-vertical-stripes"></div>
    </div>
    <div
      class="relative z-10 h-full flex items-center justify-center px-2 md:px-8 w-full md:max-w-[590px] max-w-[380px] mx-auto"
    >
      <!-- prev button -->
      <button
        @click="scrollPrev"
        class="shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#FFFAE8] hover:bg-[#f4edd9] btn-press border-[2px] md:border-[2.5px] border-[#7D4E2D] shadow-[0px_2px_0px_0px_#7D4E2D] md:shadow-[0px_3px_0px_0px_#7D4E2D] flex items-center justify-center text-[#7D4E2D] cursor-pointer mr-1.5 md:mr-4 z-20"
      >
        <ChevronLeft class="w-4 h-4 md:w-6 md:h-6 stroke-[3]" />
      </button>

      <!-- scroll track -->
      <div
        ref="carouselRef"
        class="flex overflow-x-auto snap-x snap-mandatory gap-16 py-4 px-4 scrollbar-none w-full items-center"
        @scrollend="handleScrollEnd"
        @scroll="onScroll"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
        @touchstart.passive="pauseAutoScroll"
        @touchend.passive="resumeAutoScroll"
      >
        <div
          v-for="(item, index) in displayItems"
          :key="`${item.name}-${index}`"
          class="snap-center shrink-0 relative w-[260px] h-[165px] md:w-[380px] md:h-[240px] nampan-wood rounded-lg border-[8px] md:border-[12px] border-[#7D4E2D] shadow-sm flex items-center justify-between px-3 md:px-4 select-none"
        >
          <!-- handle nampan -->
          <div
            class="absolute -left-[14px] md:-left-[18px] top-1/2 -translate-y-1/2 w-[12px] md:w-[16px] h-12 md:h-18 bg-[#7D4E2D] rounded-l-full"
          ></div>
          <div
            class="absolute -right-[14px] md:-right-[18px] top-1/2 -translate-y-1/2 w-[12px] md:w-[16px] h-12 md:h-18 bg-[#7D4E2D] rounded-r-full"
          ></div>

          <!-- piring -->
          <div
            class="ml-1 md:ml-2 rounded-full border-[1.5px] md:border-[2px] border-[#ae6551]"
          >
            <div
              class="relative w-28 h-28 md:w-42 md:h-42 rounded-full border-[10px] md:border-[14px] border-[#FFC3B2] bg-[#FFFAE8] shadow-md flex items-center justify-center shrink-0"
            >
              <img
                :src="item.img"
                :alt="item.name"
                class="w-[75%] h-[75%] object-contain rotate-6 drop-shadow-sm"
              />
            </div>
          </div>

          <!-- nama & harga menu -->
          <div
            class="bg-white w-[88px] md:w-[115px] px-2.5 py-1.5 md:px-4 md:py-2.5 rounded shadow-sm -rotate-6 border border-[#747474] border-[1.5px] md:border-[2px] mr-1 md:mr-3"
          >
            <h3 class="text-xs md:text-sm font-bold text-brown leading-tight">
              {{ item.name }}
            </h3>
            <p
              class="text-[10px] md:text-sm font-semibold text-brown/90 mt-0.5"
            >
              {{ item.price }}
            </p>
          </div>

          <!-- numbering -->
          <span
            class="absolute right-3 bottom-1.5 md:right-4 md:bottom-2 text-[10px] md:text-xs font-bold text-[#7D4E2D]/80 select-none"
          >
            {{ (index % menuItems.length) + 1 }} / {{ menuItems.length }}
          </span>
        </div>
      </div>

      <!-- next button -->
      <button
        @click="scrollNext"
        class="shrink-0 w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#FFFAE8] hover:bg-[#f4edd9] btn-press border-[2px] md:border-[2.5px] border-[#7D4E2D] shadow-[0px_2px_0px_0px_#7D4E2D] md:shadow-[0px_3px_0px_0px_#7D4E2D] flex items-center justify-center text-[#7D4E2D] cursor-pointer ml-1.5 md:ml-4 z-20"
      >
        <ChevronRight class="w-4 h-4 md:w-6 md:h-6 stroke-[3]" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.nampan-wood {
  background-color: #e0b785;
  background-image: repeating-radial-gradient(
    ellipse 800% 180% at 30% 120%,
    transparent 0px,
    transparent 18px,
    rgba(150, 95, 50, 0.22) 19px,
    rgba(150, 95, 50, 0.22) 24px,
    transparent 25px,
    transparent 55px,
    rgba(160, 105, 55, 0.18) 56px,
    rgba(160, 105, 55, 0.18) 60px,
    transparent 61px,
    transparent 85px
  );
}

.taplak-container {
  width: 100%;
  position: relative;
  overflow: clip;
  height: 480px;
}

.taplak {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130vw;
  height: 308px;
  background-color: #f5f5d5;
  transform: translate(-50%, -50%) rotate(-4deg);
  transform-origin: center;
}

.taplak-horizontal-stripes {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 28px,
    rgba(176, 181, 34, 0.5) 28px,
    rgba(176, 181, 34, 0.5) 56px
  );
}

.taplak-vertical-stripes {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 28px,
    rgba(176, 181, 34, 0.5) 28px,
    rgba(176, 181, 34, 0.5) 56px
  );
}

@media (min-width: 768px) {
  .taplak-container {
    height: 560px;
  }

  .taplak {
    height: 364px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const carouselRef = ref<HTMLElement | null>(null);

const menuItems = [
  {
    name: "Apple Pie",
    price: "Rp 7.000",
    img: "/img/illust/apple_pie.webp",
  },
  {
    name: "Caramel Pudding",
    price: "Rp 7.000",
    img: "/img/illust/caramel_pudding.webp",
  },
  {
    name: "Eclair Pastry",
    price: "Rp 8.000",
    img: "/img/illust/eclair_pastry.webp",
  },
  {
    name: "Choquettes",
    price: "Rp 6.000",
    img: "/img/illust/choquettes.webp",
  },
  {
    name: "Teh Tarik",
    price: "Rp 5.000",
    img: "/img/illust/teh_tarik.webp",
  },
];

//auto scrolling stuff

const displayItems = computed(() => [...menuItems, ...menuItems, ...menuItems]);

const getItemStep = () => {
  if (!carouselRef.value || carouselRef.value.children.length < 2) return 404;
  const first = carouselRef.value.children[0] as HTMLElement;
  const second = carouselRef.value.children[1] as HTMLElement;
  return second.offsetLeft - first.offsetLeft || 404;
};

const handleScrollEnd = () => {
  if (!carouselRef.value) return;
  const step = getItemStep();
  const setWidth = step * menuItems.length;

  if (carouselRef.value.scrollLeft >= setWidth * 2) {
    carouselRef.value.scrollLeft -= setWidth;
  } else if (carouselRef.value.scrollLeft < setWidth) {
    carouselRef.value.scrollLeft += setWidth;
  }
};

let scrollDebounce: ReturnType<typeof setTimeout> | null = null;
const onScroll = () => {
  onUserInteract();
  if (scrollDebounce) clearTimeout(scrollDebounce);
  scrollDebounce = setTimeout(handleScrollEnd, 150);
};

const stepNext = () => {
  carouselRef.value?.scrollBy({ left: getItemStep(), behavior: "smooth" });
};

const scrollPrev = () => {
  carouselRef.value?.scrollBy({ left: -getItemStep(), behavior: "smooth" });
  onUserInteract();
};

const scrollNext = () => {
  stepNext();
  onUserInteract();
};

let autoScrollTimer: ReturnType<typeof setInterval> | null = null;
let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
const isHovered = ref(false);

const startAutoScroll = () => {
  stopAutoScroll();
  autoScrollTimer = setInterval(() => {
    if (!isHovered.value) {
      stepNext();
    }
  }, 4000);
};

const stopAutoScroll = () => {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
};

// turn off autoscroll on interaction
const onUserInteract = () => {
  stopAutoScroll();
  if (cooldownTimer) clearTimeout(cooldownTimer);
  cooldownTimer = setTimeout(() => {
    if (!isHovered.value) {
      startAutoScroll();
    }
  }, 9000);
};

const pauseAutoScroll = () => {
  isHovered.value = true;
  stopAutoScroll();
};

const resumeAutoScroll = () => {
  isHovered.value = false;
  onUserInteract();
};

onMounted(() => {
  nextTick(() => {
    if (carouselRef.value) {
      const step = getItemStep();
      const setWidth = step * menuItems.length;
      carouselRef.value.scrollLeft = setWidth;
    }
    startAutoScroll();
  });
});

onUnmounted(() => {
  stopAutoScroll();
  if (cooldownTimer) clearTimeout(cooldownTimer);
  if (scrollDebounce) clearTimeout(scrollDebounce);
});
</script>
