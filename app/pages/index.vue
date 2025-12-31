<template>
  <div class="bg-yellow relative">
    <div class="mt-60 mx-6 absolute z-60">
      <h1 class="text-display font-bold text-brown">Crust & Daisies</h1>
      <p class="text-heading font-semibold text-brown mt-2 max-w-md">
        krʌsts ænd ˈdeɪziz
      </p>

      <p class="text-body font-regular text-brown mt-2 max-w-md">
        Crust & Daisies adalah perpaduan antara kue kering yang renyah dan
        menyenangkan dengan rasa dan suasana yang hangat.
      </p>
    </div>

    <div
      class="mt-56 backdrop-blur-sm w-screen h-30 z-50 absolute"
      style="mask-image: linear-gradient(to top, white 60%, transparent)"
    />
    <div
      class="mt-56 bg-linear-to-t from-yellow from-10% via-yellow/20 via-30% to-100% w-screen h-20 z-40 absolute"
    />

    <div class="mt-76 bg-yellow w-screen absolute">
      <div class="mt-30 flex justify-end px-6">
        <button
          class="flex flex-row bg-green px-4 py-3 rounded-lg drop-shadow-lg/25 hover:bg-green/80 transition-colors active:scale-95 active:bg-black/20"
        >
          <a href="/order" class="px-2 text-brown text-heading font-semibold">
            Pesan Sekarang!
          </a>

          <img src="/icons/out.svg" alt="Order Now!" />
        </button>
      </div>

      <!-- Polaroids -->
      <!-- <div class="flex">

        <div class="p-4 pb-4 bg-white rotate-349">
          <img
            class="h-38 w-38 object-cover"
            src="/assets/img/firefly-1.jpg"
            alt="Inikah my..."
          />
          <p class="text-info font-extralight pt-3">Bukankah ini...</p>
        </div>

        <div class="mt-30 p-4 pb-4 bg-white rotate-4  ">
          <img
            class="h-38 w-38 object-cover"
            src="/assets/img/firefly-2.jpg"
            alt="Inikah my..."
          />
          <p class="text-info font-extralight pt-3">kpn yh.</p>
        </div>
      </div> -->

      <!-- Polaroids Section -->
      <div class="relative mt-20 mb-32 px-6">
        <!-- First Polaroid (Blue border, rotated left) -->
        <div
          class="absolute left-6 top-0 bg-white p-4 pb-8 shadow-lg -rotate-12 w-48"
        >
          <img
            class="w-full aspect-square object-cover"
            src="/assets/img/firefly-1.jpg"
            alt="Inikah my..."
          />
          <p class="text-sm text-brown mt-3">bukankah ini...</p>
        </div>

        <!-- Second Polaroid (White, rotated right) -->
        <div
          class="absolute right-6 top-0 bg-white p-4 pb-8 shadow-lg rotate-12 w-48"
        >
          <img
            class="w-full aspect-square object-cover"
            src="/assets/img/firefly-2.jpg"
            alt="ckp bgt Allahuakbar"
          />
          <p class="text-sm text-brown mt-3">ckp bgt Allahuakbar</p>
        </div>

        <!-- Third Polaroid (Center, slight rotation) -->
        <div
          class="absolute left-1/2 -translate-x-1/2 top-24 bg-white p-4 pb-8 shadow-lg rotate-6 w-44 z-10"
        >
          <img
            class="w-full aspect-square object-cover"
            src="/assets/img/firefly-3.png"
            alt="kpn yh"
          />
          <p class="text-sm text-brown mt-3">kpn yh</p>
        </div>
      </div>
    </div>

    <div
      class="bg-linear-to-t from-40% to-yellow-gradient/40 w-screen h-40 z-20 absolute"
    />

    <img
      src="/assets/img/firefly-roti.png"
      alt="my lagi makan roti"
      class="w-96 mx-auto pt-6 z-10"
    />
  </div>
</template>
