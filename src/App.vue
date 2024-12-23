<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-700">
        Consulta de CEP
      </h1>

      <div class="flex flex-col gap-4">
        <input
          v-model="cep"
          type="text"
          placeholder="Digite o CEP"
          class="border border-gray-300 rounded p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        <div class="flex gap-2">
          <button
            @click="fetchAddress"
            class="flex-1 bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
          <button
            @click="clearFilters"
            class="flex-1 bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
          >
            Limpar
          </button>
        </div>
      </div>

      <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>

      <div v-if="address" class="mt-6 text-gray-700">
        <p><strong>Rua:</strong> {{ address.logradouro }}</p>
        <p><strong>Bairro:</strong> {{ address.bairro }}</p>
        <p><strong>Cidade:</strong> {{ address.localidade }}</p>
        <p><strong>Estado:</strong> {{ address.uf }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import type { Address } from "./types/address";

export default defineComponent({
  setup() {
    const cep = ref("");
    const address = ref<Address | null>(null);
    const error = ref("");

    const fetchAddress = async () => {
      error.value = "";
      address.value = null;

      const cepPattern = /^[0-9]{8}$/;
      if (!cepPattern.test(cep.value)) {
        error.value = "CEP inválido! Insira 8 números.";
        return;
      }

      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep.value}/json/`
        );
        if (response.data.erro) {
          error.value = "CEP não encontrado!";
        } else {
          address.value = response.data;
        }
      } catch (err) {
        error.value = "Erro ao buscar o CEP!";
      }
    };

    const clearFilters = () => {
      cep.value = "";
      address.value = null;
      error.value = "";
    };

    return { cep, address, error, fetchAddress, clearFilters };
  },
});
</script>
