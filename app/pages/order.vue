<template>
  <div class="bg-yellow relative min-h-screen pb-24 flex flex-col items-center">
    <CrustHeader class="w-full" />

    <div class="w-full max-w-3xl">
      <!-- Title -->
      <div class="py-8 pb-4 mx-6">
        <h1
          class="text-[32px] font-bold text-brown leading-none font-['Livvic'] tracking-tight"
        >
          Checkout
        </h1>
      </div>

      <!-- Subtitle Description -->
      <div class="mx-6 mb-6">
        <p class="text-[14px] text-black leading-snug">
          Isi kolom-kolom dibawah dengan data yang asli<br
            class="hidden sm:inline"
          />
          agar admin bisa menghubungi kalian apabila terdapat kendala yaa :D
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="mx-6 space-y-5">
        <!-- Input Username -->
        <div class="flex flex-col gap-[7px]">
          <label
            for="username"
            class="text-[16px] font-semibold text-[#2A2A2A]"
          >
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Isi namamu disini"
            required
            class="w-full bg-[#FFFFFF] border-[1.5px] border-[#2A2A2A] rounded-[10px] px-5 py-3 text-[14px] text-[#2A2A2A] placeholder:text-[#9F9F9F] shadow-[0px_2px_0px_0px_#2A2A2A] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
          />
        </div>

        <!-- Input Email -->
        <div class="flex flex-col gap-[7px]">
          <label for="email" class="text-[16px] font-semibold text-[#2A2A2A]">
            E-mail Aktif
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Isi e-mail mu disini"
            required
            class="w-full bg-[#FFFFFF] border-[1.5px] border-[#2A2A2A] rounded-[10px] px-5 py-3 text-[14px] text-[#2A2A2A] placeholder:text-[#9F9F9F] shadow-[0px_2px_0px_0px_#2A2A2A] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
          />
        </div>

        <!-- Input Nomor Telp / WhatsApp -->
        <div class="flex flex-col gap-[7px]">
          <label for="phone" class="text-[16px] font-semibold text-[#2A2A2A]">
            Nomor Telp/WhatsApp
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="Isi nomormu disini"
            required
            class="w-full bg-[#FFFFFF] border-[1.5px] border-[#2A2A2A] rounded-[10px] px-5 py-3 text-[14px] text-[#2A2A2A] placeholder:text-[#9F9F9F] shadow-[0px_2px_0px_0px_#2A2A2A] focus:outline-none focus:ring-2 focus:ring-brown/20 transition-all"
          />
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full bg-green hover:bg-[#cdd15e] active:scale-[0.99] transition-all rounded-[10px] py-3 px-8 font-semibold text-black text-[16px] border-[1.5px] border-[#2A2A2A] shadow-[0px_2px_0px_0px_#2A2A2A] cursor-pointer"
          >
            Konfirmasi Pesananmu!
          </button>
        </div>
      </form>

      <!-- Important Notice -->
      <div class="mx-6 mt-6 text-black text-[14px]">
        <h2 class="text-[16px] font-semibold mb-2">Pemberitahuan Penting:</h2>
        <ol
          class="list-decimal list-inside space-y-1 text-[14px] leading-relaxed"
        >
          <li class="pl-1">
            Kami menyarankan agar klient memesan di hari Senin sampai Jumat.
          </li>
          <li class="pl-1">
            Kami tidak menerima <em class="italic">cancellation</em> dan pesanan
            di hari Sabtu dan Minggu.
          </li>
          <li class="pl-1">
            Apabila terdapat kendala atau ingin melakukan
            <em class="italic">cancellation</em> silahkan menghubungi kontak
            kami.
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  username: "",
  email: "",
  phone: "",
});

const handleSubmit = () => {
  console.log("Order submitted:", form);
};
</script>
