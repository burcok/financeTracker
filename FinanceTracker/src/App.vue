<script setup>
import incomeExpenseSection from "./section/incomeExpenseSection.vue";
import mainSection from "./section/mainSection.vue";
import navbar from "./components/navbar.vue";
</script>

<template>
  <div class="md:overflow-x-hidden">
    <navbar />
    <div class="w-screen h-full flex md:flex-row flex-col">
      <incomeExpenseSection />
      <mainSection />
    </div>
  </div>
</template>
