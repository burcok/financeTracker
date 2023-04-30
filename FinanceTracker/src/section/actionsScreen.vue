<template>
  <div v-auto-animate class="p-8 flex flex-col items-center justify-center mb-32">
    <div
      :key="action.date"
      v-for="action in actions"
      :class="
        action.type == 'Income'
          ? 'bg-cyan-900 hover:bg-cyan-950'
          : 'bg-orange-900 hover:bg-red-950'
      "
      class="duration-500 w-full 2xl:w-1/2 my-4 rounded-2xl shadow-2xl text-gray-300 font-semibold h-32 flex flex-col items-center justify-center"
    >
      <div
        class="absolute flex flex-col text-black right-9 md:right-20 2xl:right-[420px]"
      >
        <span class="mb-5 cursor-pointer"
          ><PencilIcon
            class="h-5 w-5 hover:text-gray-800 text-gray-400"
            aria-hidden="true"
        /></span>
        <span class="cursor-pointer"
          ><TrashIcon
            class="h-5 w-5 hover:text-gray-800 text-gray-400"
            aria-hidden="true"
        /></span>
      </div>
      <div class="flex justify-around">
        <div class="flex">
          <span
            :class="action.type == 'Income' ? 'text-green-600' : 'text-red-400'"
            class="flex text-center flex-col"
            ><span class="text-gray-100">Type </span>{{ action.type }}</span
          ><span class="mx-4 md:mx-20 flex text-center text-gray-400 flex-col">
            <span class="text-gray-100">Amount</span>{{ action.amount }}
            {{ action.currency }}</span
          ><span class="flex text-center text-gray-400 flex-col">
            <span class="text-gray-100">Explanation</span>{{ action.explanation }}</span
          >
        </div>
      </div>
      <div class="flex justify-between text-center mt-5 text-gray-500">
        {{ action.date }}
      </div>
    </div>
  </div>
</template>
<script setup>
// import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";

import { TrashIcon, PencilIcon } from "@heroicons/vue/20/solid";

const store = useStore();
const actions = computed(() => store.getters.getActions);
</script>
