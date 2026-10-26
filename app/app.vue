<template>
  <div class="bg-yellow min-h-screen">
    <!-- Header and Sidebar -->
    <CrustHeader @toggle-menu="isSidebarOpen = !isSidebarOpen" />
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="pt-15">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false);

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk && titleChunk !== "Crusts & Daisies"
      ? `${titleChunk} - Crusts & Daisies`
      : "Crusts & Daisies";
  },
});
</script>
