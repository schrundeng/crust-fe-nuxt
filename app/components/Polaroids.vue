<template>
  <div>
    <div class="relative mb-20 w-full min-w-[360px] left-1/2 -translate-x-1/2">
      <!-- First Polaroid -->
      <div
        class="absolute -left-5 -top-4 bg-white p-4 pb-4 shadow-lg -rotate-12 w-48 md:w-72"
      >
        <img
          class="w-full aspect-square object-cover"
          src="/assets/img/apple_pie.jpg"
          alt="Apple Pie"
        />
        <p class="text-sm text-brown mt-3">Apple Pie</p>
      </div>

      <!-- Second Polaroid -->
      <div
        class="absolute left-1/2 -translate-x-1/2 top-24 bg-white p-4 pb-4 shadow-lg rotate-4 w-48 md:w-72 z-0"
      >
        <img
          class="w-full aspect-square object-cover"
          src="/assets/img/eclair_pastry.jpg"
          alt="Eclair Pastry"
        />
        <p class="text-sm text-brown mt-3">Eclair Pastry</p>
      </div>

      <!-- Third Polaroid -->

      <div
        class="absolute -right-16 top-0 bg-white p-4 pb-4 shadow-lg rotate-12 w-48 md:w-72"
      >
        <img
          class="w-full aspect-square object-cover"
          src="/assets/img/caramel_pudding.jpg"
          alt="Caramel Pudding"
        />
        <p class="text-sm text-brown mt-3">Caramel Pudding</p>
      </div>
    </div>
  </div>
</template>
