<template>
  <div class="md:p-8 w-full h-full">
    <div class="flex items-center flex-wrap p-8">
      <div class="w-full md:w-2/5">
        <Listbox
          as="div"
          v-model="selected"
          onchange="currenciesSelectedValue(this.value)"
        >
          <ListboxLabel class="block text-2xl font-medium leading-6 text-gray-700"
            >Filter Currencies</ListboxLabel
          >
          <div class="relative mt-2">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <span class="flex items-center">
                <span class="ml-3 text-xl block truncate font-semibold">{{
                  selected.id
                }}</span>
              </span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
              >
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in-out duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="currencies in store.state.currencies"
                  :key="currencies.id"
                  :value="currencies"
                  v-slot="{ active, selected }"
                >
                  <li
                    @click="currenciesFunction(currencies.id)"
                    :class="[
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    ]"
                  >
                    <div class="flex items-center">
                      <span
                        :class="[
                          selected ? 'font-semibold' : 'font-normal',
                          'ml-3 block truncate',
                        ]"
                        >{{ currencies.id }}</span
                      >
                    </div>

                    <span
                      v-if="selected"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="w-full my-8 md:w-2/5">
        <Listbox as="div" v-model="selectedIncomeExpense">
          <ListboxLabel class="block text-2xl font-medium leading-6 text-gray-700"
            >Filter Income-Expense</ListboxLabel
          >
          <div class="relative mt-2">
            <ListboxButton
              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <span class="flex items-center">
                <span class="ml-3 text-xl block truncate font-semibold">{{
                  selectedIncomeExpense.name
                }}</span>
              </span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
              >
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in-out duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="incomeExpense in incomeExpense"
                  :key="incomeExpense.name"
                  :value="incomeExpense"
                  v-slot="{ active, selectedIncomeExpense }"
                >
                  <li
                    @click="incomeExpenseFunction(incomeExpense.name)"
                    :class="[
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    ]"
                  >
                    <div class="flex items-center">
                      <span
                        :class="[
                          selectedIncomeExpense ? 'font-semibold' : 'font-normal',
                          'ml-3 block truncate',
                        ]"
                        >{{ incomeExpense.name }}</span
                      >
                    </div>

                    <span
                      v-if="selectedIncomeExpense"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="w-full md:w-1/5 flex items-center justify-center">
        <button
          @click="clearFilter()"
          class="w-full xl:w-1/2 h-12 font-semibold text-lg text-gray-200 bg-red-900 hover:bg-red-950 duration-300 rounded-xl active:border-0 focus:border-0"
        >
          Clear Filter
        </button>
      </div>
    </div>
    <actionsScreen />
    <div class="w-full md:w-1/2 mx-auto overflow-auto">
      <h2 class="text-2xl font-medium leading-6">Multiplier Chart</h2>
      <div id="chart"></div>
    </div>
  </div>
</template>

<script setup>
import ApexCharts from "apexcharts";
import actionsScreen from "./actionsScreen.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const store = useStore();

const multiplier = computed(() => store.getters.getCurrenciesValueAsList);
const names = computed(() => store.getters.getCurrenciesIdAsList);

const incomeExpense = [{ name: "None" }, { name: "Income" }, { name: "Expense" }];

const selectedIncomeExpense = ref(incomeExpense[0]);
const selected = ref(store.state.currencies[0]);


const lastFilter = ref("");

const currenciesFunction = (value) => {
  if ((lastFilter.value = "currenciesFunction")) {
    clearFilter();
  }
  lastFilter.value = "currenciesFunction";
  store.commit("getFilteredCurrencyName", value);
};

const incomeExpenseFunction = (value) => {
  if (value === "None") {
    clearFilter();
  } else {
    if ((lastFilter.value = "incomeExpenseFunction")) {
      clearFilter();
    }
    lastFilter.value = "incomeExpenseFunction";
    store.commit("getFilteredCurrencyType", value);
  }
};

const clearFilter = () => {
  const originalData = [...store.state.orgnActions];

  store.commit("setOriginalActions", originalData);
  selectedIncomeExpense.value = incomeExpense[0];
  selected.value = store.state.currencies[0];
};
onMounted(() => {
  var options = {
    chart: {
      width: "100%",
      height: 500,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: -1,
      colors: ["#fff"],
    },
    series: [
      {
        name: "Multiplier",
        data: multiplier.value,
      },
    ],
    xaxis: {
      categories: names.value,
    },
    legend: {
      position: "right",
      verticalAlign: "top",
      containerMargin: {
        left: 35,
        right: 60,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 400,
            width: "100%",
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
            containerMargin: {
              left: 0,
              right: 0,
            },
          },
        },
      },
    ],
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();
});
</script>
