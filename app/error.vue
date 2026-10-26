<template>
  <div class="bg-yellow min-h-screen flex flex-col justify-between text-brown">
    <!-- Header & Sidebar matching app.vue -->
    <CrustHeader @toggle-menu="isSidebarOpen = !isSidebarOpen" />
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Centered Card Container -->
    <main
      class="grow pt-24 pb-16 px-6 flex flex-col items-center justify-center"
    >
      <div
        class="w-full max-w-sm md:max-w-xl bg-white rounded-[12px] border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] p-6 md:p-8 text-brown flex flex-col items-center text-center gap-4 transition-all"
      >
        <!-- Big Error Status Code -->
        <div
          class="text-7xl md:text-8xl font-black text-brown leading-none tracking-tight select-none"
        >
          {{ statusCode }}
        </div>

        <!-- Error Title -->
        <h1
          class="text-[22px] md:text-[26px] font-bold text-brown leading-tight tracking-tight -mt-1"
        >
          {{ is404 ? "Heh, mau kemana??" : "Gosong chef..." }}
        </h1>

        <!-- Description -->
        <p
          class="text-[14px] md:text-[15px] text-brown/80 leading-snug max-w-md"
        >
          {{
            is404
              ? "Sepertinya halaman yang kamu tuju belum matang atau salah meja. Yuk balik ke etalase menu kami~"
              : "Ada SEDIKIT kendala teknis di dapur kami. Silakan coba kembali beberapa saat lagi ya!!"
          }}
        </p>

        <!-- Action button -->
        <button
          type="button"
          @click="handleClearError"
          class="w-full h-[48px] bg-green hover:bg-[#cdd15e] btn-press transition-all rounded-[10px] px-8 font-semibold text-brown text-[16px] text-center border-[2.5px] border-brown shadow-[0px_2px_0px_0px_#522C15] cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          <span>Kembali</span>
        </button>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isSidebarOpen = ref(false);

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();

const statusCode = computed(() => {
  const queryCode = Number(route?.query?.status || route?.query?.code);
  if (queryCode) return queryCode;
  const code = Number(props.error?.statusCode || props.error?.status);
  return Number.isFinite(code) && code > 0 ? code : 404;
});
const is404 = computed(() => statusCode.value === 404);

const handleClearError = () => {
  clearError({ redirect: "/" });
};

useHead({
  title: computed(() =>
    is404.value
      ? "404 - Halaman Tidak Ditemukan - Crusts & Daisies"
      : "500 - Kendala Dapur - Crusts & Daisies",
  ),
  link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
});
</script>
