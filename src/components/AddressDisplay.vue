<template>
  <div v-if="address" class="mt-6 text-gray-700">
    <p><strong>Rua:</strong> {{ address.logradouro }}</p>
    <p><strong>Bairro:</strong> {{ address.bairro }}</p>
    <p><strong>Cidade:</strong> {{ address.localidade }}</p>
    <p><strong>Estado:</strong> {{ address.uf }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Address } from "../types/address";

defineProps<{
  address: Address;
}>();
</script>
