<template>
  <div>
    <header
      class="fixed top-0 left-0 right-0 z-100 bg-brown text-white px-4 py-3"
    >
      <div class="flex flex-row items-center justify-between">
        <NuxtLink to="/">
          <h1 class="text-heading font-semibold pl-2">Crusts & Daisies</h1>
        </NuxtLink>

        <!-- Hamburger button mobile -->
        <div class="md:hidden">
          <button class="p-2" @click="toggleMenu" aria-label="Toggle menu">
            <img src="/icons/menu-hamburger.svg" alt="Menu" class="w-6 h-6" />
          </button>
        </div>

        <!-- Navigation links desktop -->
        <nav class="hidden md:flex">
          <NuxtLink
            v-for="(item, index) in items"
            :key="index"
            :to="item.path"
            class="hover:bg-white/10 rounded transition-colors px-3 py-2 flex items-center gap-2 active:scale-95 active:bg-black/20"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
const items = ref([
  { title: "Menu", path: "/menu" },
  { title: "Status", path: "/status" },
  { title: "About", path: "/#about" },
  { title: "Contact", path: "/#contact" },
]);
const emit = defineEmits(["toggle-menu"]);

const toggleMenu = () => {
  emit("toggle-menu");
};
</script>
