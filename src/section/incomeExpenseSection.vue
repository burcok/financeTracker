<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
const open = ref(false);

const descriptionInput = ref("");
const valueInput = ref();

const store = useStore();
const con = computed(() => store.getters.getBaseCurrency);
// store.commit("getSelectedCurrencies", "BOB");

const selected = ref(store.state.currencies[0]);
const getSelectedValue = ref("");

const addTrackFunction = (type) => {
  let payload = {
    id: store.state.actions.length + 1,
    currency: getSelectedValue.value,
    type: type,
    explanation: descriptionInput.value,
    amount: valueInput.value,
    date: new Date(),
  };
  store.commit("addNewAction", payload);
  store.commit("setOriginalActionsToOrgnActions", store.state.actions);
  store.commit("addNewBalanceToBaseCurrency", payload);

  valueInput.value = "";
  descriptionInput.value = "";
  open.value = false;
};
</script>

<template>
  <div class="w-full md:w-3/12 bg-gray-800 flex flex-col py-32 items-center">
    <div class="w-2/3">
      <Listbox as="div" v-model="selected">
        <ListboxLabel class="block text-2xl font-medium leading-6 text-gray-200"
          >Base Currency</ListboxLabel
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
                  @click="store.commit('getSelectedCurrencies', currencies.id)"
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
    <div class="text-xl w-full px-14 text-gray-200 font-semibold">
      <button
        @click="open = true"
        class="duration-300 w-full h-12 mt-10 rounded-2xl bg-blue-700 hover:bg-blue-950 text-gray-400 hover:text-gray-300"
      >
        Add New Track
      </button>
    </div>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="w-full">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                      >Income - Expense Modal</DialogTitle
                    >
                    <div class="mt-2 flex flex-col">
                      <div class="mt-4 relative h-14 w-full min-w-[200px]">
                        <input
                          class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                          v-model="valueInput"
                        />
                        <label
                          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Enter the value
                        </label>
                      </div>
                      <div class="my-6 relative h-14 w-full min-w-[200px]">
                        <input
                          class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                          v-model="descriptionInput"
                        />
                        <label
                          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Enter the description
                        </label>
                      </div>
                      <p>Select Currency Type</p>
                      <select
                        id="getSelected"
                        v-model="getSelectedValue"
                        onchange="getSelectedValue = this.value"
                        class="block overflow-scroll appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option v-for="currencies in store.state.currencies">
                          {{ currencies.id }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="duration-300 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto"
                  @click="addTrackFunction('Income')"
                >
                  Income
                </button>
                <button
                  type="button"
                  class="duration-300 inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-950 sm:ml-3 sm:w-auto"
                  @click="addTrackFunction('Expense')"
                  ref="cancelButtonRef"
                >
                  Expense
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
