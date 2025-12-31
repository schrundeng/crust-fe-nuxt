<template>
  <div>
    <!-- Header and Sidebar -->
    <CrustHeader @toggle-menu="isSidebarOpen = !isSidebarOpen" />
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <NuxtPage />
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false);
</script>
