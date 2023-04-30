<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const balance = computed(() => store.getters.getBaseCurrency);
</script>
<template>
  <nav
    class="w-full h-24 bg-gray-800 shadow-2xl flex items-center justify-between px-5 md:px-32"
  >
    <h1 class="text-gray-300 font-bold font-sans text-lg md:text-3xl">Finance Tracker</h1>
    <h2 class="text-gray-300 font-bold font-sans text-lg md:text-3xl">
      Balance:<span class="text-gray-400 ml-2 md:ml-4"
        >{{ balance[1] }} {{ balance[0] }}</span
      >
    </h2>
  </nav>
</template>
