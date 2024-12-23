<template>
  <div v-if="address" class="mt-6 text-gray-700">
    <p><strong>Rua:</strong> {{ address.logradouro }}</p>
    <p><strong>Bairro:</strong> {{ address.bairro }}</p>
    <p><strong>Cidade:</strong> {{ address.localidade }}</p>
    <p><strong>Estado:</strong> {{ address.uf }}</p>
    <button
      @click="$emit('addFavorite', address)"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Adicionar aos Favoritos
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Address } from "../types/address";

defineProps<{
  address: Address;
}>();

defineEmits(["addFavorite"]);
</script>
