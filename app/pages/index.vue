<template>
  <div class="bg-yellow min-h-screen overflow-clip">
    <!-- hero section -->
    <div class="relative max-w-screen-sm md:max-w-screen-md mx-auto pt-16 px-6">
      <!-- logo container -->
      <div
        class="relative w-72 md:w-90 md:translate-x-48 sm:translate-x-48 translate-x-12 mx-auto"
      >
        <img
          src="/assets/img/logo.png"
          alt="Crusts & Daisies Logo"
          class="w-full h-auto select-none"
        />
        <!-- gradient thingy -->
        <div
          class="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-yellow via-yellow/70 to-transparent backdrop-blur-[2px]"
          style="mask-image: linear-gradient(to top, black 50%, transparent)"
        ></div>
      </div>

      <!-- call to action -->
      <div
        class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-32 md:-mt-36 relative z-10"
      >
        <!-- title and desc -->
        <div class="max-w-md">
          <h1 class="text-display font-bold text-brown">Crusts & Daisies</h1>
          <p class="text-heading font-semibold text-brown mt-1">
            krʌsts ænd ˈdeɪziz
          </p>

          <p class="text-body font-regular text-brown mt-2">
            Crust & Daisies adalah perpaduan antara kue kering yang renyah dan
            menyenangkan dengan rasa dan suasana yang hangat.
          </p>
        </div>

        <!-- order button -->
        <div class="flex md:justify-end">
          <button
            class="flex flex-row bg-green hover:bg-[#cdd15e] active:scale-[0.99] transition-all rounded-[10px] py-3 px-8 font-semibold text-black text-[16px] border-[1.5px] border-[#2A2A2A] shadow-[0px_2px_0px_0px_#2A2A2A] cursor-pointer"
          >
            <a href="/order" class="px-2 text-brown text-heading font-semibold">
              Pesan Sekarang!
            </a>

            <!-- <img src="/icons/out.svg" alt="Pesan Sekarang!" /> -->
          </button>
        </div>
      </div>
    </div>

    <!-- polaroids -->
    <div
      class="md:mt-28 mt-16 h-[350px] md:h-[450px] md:max-w-4xl max-w-xl mx-auto px-6"
    >
      <Polaroids />
    </div>

    <!-- about us -->
    <div
      id="about"
      class="pt-8 max-w-screen-sm md:max-w-screen-md mx-auto px-6"
    >
      <h1 class="text-display font-bold text-brown">About Us</h1>

      <p class="text-body font-regular text-brown mt-2">
        Crust & Daisies berdiri atas kolaborasi antara Fayza dan Nadia untuk
        mencari produktifitas selama liburan akhir semester.
        <br />
        <br />

        Crust & Daisies menghadirkan berbagai kue seperti pie apel, pastry,
        dessert box, dan lain lain.
        <span class="font-bold">Toko kami menerima pembelian pre-order </span>
        dan <span class="font-bold">open order.</span>

        <br />
        <br />

        Dibawah ini merupakan beberapa delicacies yang kami tawarkan... Happy
        Browsing :D
      </p>
    </div>

    <!-- carousel -->
    <div class="w-full">
      <Carousel />
    </div>
  </div>
</template>
