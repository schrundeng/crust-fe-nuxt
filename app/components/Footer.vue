<template>
  <footer id="contact" class="bg-brown text-white w-full scroll-mt-20">
    <div
      class="max-w-screen-md mx-auto py-10 md:py-14 flex md:px-0 px-6 flex-col md:flex-row md:items-start md:justify-between gap-8"
    >
      <!-- contact info -->
      <div class="space-y-4">
        <h3 class="text-heading font-bold text-white tracking-wide">
          Contact Us!
        </h3>

        <div
          class="flex flex-col gap-3 text-sm md:text-base font-normal text-white/90"
        >
          <a
            href="https://instagram.com/instagramakun"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 hover:text-white transition-colors"
          >
            <Instagram class="w-5 h-5 text-white shrink-0" />
            <span>@instagramakun</span>
          </a>

          <a
            href="https://wa.me/62812345678234"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 hover:text-white transition-colors"
          >
            <Phone class="w-5 h-5 text-white shrink-0" />
            <span>0812345678234</span>
          </a>

          <a
            href="mailto:usernameemail@yahoo.com"
            class="flex items-center gap-3 hover:text-white transition-colors"
          >
            <Mail class="w-5 h-5 text-white shrink-0" />
            <span>crustexample@cnd.com</span>
          </a>
        </div>
      </div>

      <!-- brand & credit for desktop -->
      <div
        class="hidden md:flex flex-col items-end justify-between self-stretch text-right"
      >
        <span class="text-xl font-semibold text-white">
          Crusts &amp; Daisies
        </span>
        <p class="text-xs text-white/60 font-light">
          Made w love from kurnikov, lowaa, &amp; reno.
        </p>
      </div>
    </div>

    <!-- credit for mobile -->
    <div class="border-t border-white/10 py-4 text-center md:hidden">
      <p class="text-xs text-white/60 font-light">
        Made w love from kurnikov, lowaa, &amp; reno.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Phone, Mail } from "lucide-vue-next";
</script>
