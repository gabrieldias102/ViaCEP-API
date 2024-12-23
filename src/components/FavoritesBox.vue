<template>
  <div class="mt-6 p-4 border rounded-lg bg-gray-50">
    <h2 class="text-xl font-bold text-gray-700 mb-4">Endereços Salvos</h2>
    <div v-if="favorites.length === 0" class="text-gray-500">
      Ainda não há endereços salvos.
    </div>
    <div v-else class="grid gap-4">
      <div
        v-for="favorite in favorites"
        :key="favorite.cep"
        class="p-4 border rounded bg-white text-gray-700"
      >
        <p><strong>Rua:</strong> {{ favorite.cep }}</p>
        <p><strong>Rua:</strong> {{ favorite.logradouro }}</p>
        <p><strong>Bairro:</strong> {{ favorite.bairro }}</p>
        <p><strong>Cidade:</strong> {{ favorite.localidade }}</p>
        <p><strong>Estado:</strong> {{ favorite.uf }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Address } from "../types/address";
import type { Favorite } from "../types/favorite";

const favorites = ref<Favorite[]>([]);

const addFavorite = (address: Address) => {
  if (!favorites.value.some((fav) => fav.cep === address.cep)) {
    favorites.value.push(address);
  }
};

defineExpose({
  addFavorite,
});
</script>
