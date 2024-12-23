<template>
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Favorite Addresses</h2>
    <div v-if="favorites.length === 0" class="text-gray-500">
      No favorite addresses saved yet
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="favorite in favorites"
        :key="favorite.id"
        class="p-4 border rounded"
      >
        <p><strong>Rua:</strong> {{ favorite.logradouro }}</p>
        <p><strong>Bairro:</strong> {{ favorite.bairro }}</p>
        <p><strong>Cidade:</strong> {{ favorite.localidade }}</p>
        <p><strong>Estado:</strong> {{ favorite.uf }}</p>
        <button
          @click="removeFavorite(favorite.id)"
          class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Address } from "../types/address";

interface FavoriteAddress extends Address {
  id: number;
  savedAt: string;
}

const favorites = ref<FavoriteAddress[]>([]);

onMounted(() => {
  loadFavorites();
});

const loadFavorites = () => {
  const saved = localStorage.getItem("favoriteAddresses");
  if (saved) {
    favorites.value = JSON.parse(saved);
  }
};

const removeFavorite = (id: number) => {
  favorites.value = favorites.value.filter((fav) => fav.id !== id);
  localStorage.setItem("favoriteAddresses", JSON.stringify(favorites.value));
};
</script>
