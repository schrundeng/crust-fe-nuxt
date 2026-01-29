<template>
  <div class="bg-yellow relative">
    <div
      class="mt-56 backdrop-blur-sm w-full h-30 z-50 absolute left-0 right-0"
      style="mask-image: linear-gradient(to top, white 60%, transparent)"
    />
    <div
      class="mt-56 bg-linear-to-t from-yellow/20 from-10% to-100% h-20 z-40 absolute left-0 right-0"
    />
    <div
      class="bg-linear-to-t from-40% to-yellow-gradient/40 w-full h-40 z-20 absolute left-0 right-0"
    />

    <!-- Hero text content -->
    <div class="relative max-w-screen-sm mx-auto">
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

      <img
        src="/assets/img/logo.png"
        alt="Crust and Daisies Logo"
        class="w-96 mx-auto pt-6 pl-16 pr-2 pb-20 z-10"
      />
    </div>

    <!-- Full-width yellow background section -->
    <div class="bg-yellow w-full absolute left-0 right-0">
      <div class="max-w-screen-sm mx-auto">
        <div class="flex justify-end px-6">
          <button
            class="flex flex-row bg-green px-4 py-3 rounded-lg drop-shadow-lg/25 hover:bg-green/80 transition-colors active:scale-95 active:bg-black/20"
          >
            <a href="/order" class="px-2 text-brown text-heading font-semibold">
              Pesan Sekarang!
            </a>

            <img src="/icons/out.svg" alt="Order Now!" />
          </button>
        </div>

        <div class="bg-yellow overflow-clip pt-2">
          <Polaroids />

          <div class="pt-100 mx-6">
            <h1 class="text-display font-bold text-brown">About Us</h1>

            <p class="text-body font-regular text-brown mt-2 max-w-md">
              Crust & Daisies berdiri atas kolaborasi antara Fayza dan Nadia
              untuk mencari produktifitas selama liburan akhir semester.
              <br />
              <br />

              Crust & Daisies menghadirkan berbagai kue seperti pie apel,
              pastry, dessert box, dan lain lain.
              <span class="font-bold"
                >Toko kami menerima pembelian pre-order
              </span>
              dan <span class="font-bold">open order.</span>

              <br />
              <br />

              Dibawah ini merupakan beberapa delicacies yang kami tawarkan...
              Happy Browsing :D
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
