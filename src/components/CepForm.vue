<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        v-model="cep"
        @input="formatCep"
        type="text"
        maxlength="9"
        placeholder="Digite o CEP"
        class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="flex space-x-2">
      <button
        @click="search"
        class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Buscar
      </button>
      <button
        @click="clear"
        class="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        Limpar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["search", "clear"]);
const cep = ref("");

const formatCep = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");

  if (value.length > 5) {
    value = value.substring(0, 5) + "-" + value.substring(5);
  }

  cep.value = value;
};

const search = () => {
  const cleanCep = cep.value.replace(/\D/g, "");
  emit("search", cleanCep);
};

const clear = () => {
  cep.value = "";
  emit("clear");
};
</script>
