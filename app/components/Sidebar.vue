<template>
  <!-- Darken the background when sidebar is open -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-50 z-100 md:hidden"
      @click="$emit('close')"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide">
    <aside
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-64 bg-brown text-white shadow-lg z-110 md:hidden"
    >
      <div class="flex flex-col h-full">
        <div
          class="flex items-center justify-between px-4 py-3 border-b border-yellow/20"
        >
          <h2 class="text-heading font-semibold pl-2">Menu</h2>
          <button
            @click="$emit('close')"
            class="p-2 hover:bg-white/10 rounded transition-colors active:scale-95 active:bg-black/20"
            aria-label="Close menu"
          >
            <img src="/icons/menu-close.svg" alt="Close menu" class="w-6 h-6" />
          </button>
        </div>

        <!-- Index links -->
        <div class="p-4 grow">
          <div class="grid gap-1">
            <NuxtLink
              v-for="(item, index) in items"
              :key="index"
              :to="item.path"
              @click="$emit('close')"
              class="py-3 pl-2 hover:bg-white/10 rounded transition-colors flex items-center gap-3 active:scale-95 active:bg-black/20"
            >
              <img
                v-if="item.icon"
                :src="`/icons/${item.icon}.svg`"
                :alt="item.title"
                class="w-5 h-5"
              />
              <span class="pl-2">{{ item.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Sidebar footer -->
        <div class="px-4 py-3 border-t border-yellow/20 text-center text-info">
          Crust & Daisies © 2025
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const items = ref([
  { title: "Home", path: "/", icon: "home" },
  { title: "Menu", path: "/menu", icon: "order" },
  { title: "About", path: "/#about", icon: "map" },
  { title: "Contact", path: "/#contact", icon: "phone" },
]);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
