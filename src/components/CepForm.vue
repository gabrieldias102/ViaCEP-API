<template>
  <div class="flex flex-col gap-4">
    <input
      v-model="cep"
      type="text"
      placeholder="Digite o CEP"
      class="border border-gray-300 rounded p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
    />
    <div class="flex gap-2">
      <button
        @click="search"
        class="flex-1 bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
      <button
        @click="clear"
        class="flex-1 bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
      >
        Limpar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["search", "clear"],
  setup(_, { emit }) {
    const cep = ref("");

    const search = () => emit("search", cep.value);
    const clear = () => {
      cep.value = "";
      emit("clear");
    };

    return { cep, search, clear };
  },
});
</script>
