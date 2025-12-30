<template>
  <div>

    <!-- Header and Sidebar -->
    <CrustHeader @toggle-menu="isSidebarOpen = !isSidebarOpen" />
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />


  </div>
</template>

<script setup>
const isSidebarOpen = ref(false);
</script>
