<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-700">
        Consulta de CEP
      </h1>

      <CepForm @search="fetchAddress" @clear="clearFilters" />

      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>

      <div>
        <AddressDisplay
          v-if="address"
          :address="address"
          @add-favorite="favoritesBoxRef.addFavorite"
        />
        <FavoritesBox ref="favoritesBoxRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cepService } from "./services/cepService";
import CepForm from "./components/CepForm.vue";
import AddressDisplay from "./components/AddressDisplay.vue";
import FavoritesBox from "./components/FavoritesBox.vue";
import type { Address } from "./types/address";

const address = ref<Address | null>(null);
const error = ref("");
const favoritesBoxRef = ref();

const fetchAddress = async (cep: string) => {
  error.value = "";
  address.value = null;

  const cepPattern = /^[0-9]{8}$/;
  if (!cepPattern.test(cep)) {
    error.value = "CEP inválido! Insira 8 números.";
    return;
  }

  try {
    const data = await cepService.fetchAddress(cep);
    if (data.erro) {
      error.value = "CEP não encontrado!";
    } else {
      address.value = data;
    }
  } catch (err) {
    error.value = "Erro ao buscar o CEP!";
  }
};

const clearFilters = () => {
  address.value = null;
  error.value = "";
};
</script>
