<template>
  <div v-auto-animate class="p-8 flex flex-col items-center justify-center mb-32">
    <div
      :key="action.id"
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
        <span @click="renameAction(action.id)" class="mb-5 cursor-pointer"
          ><PencilIcon
            class="h-5 w-5 hover:text-gray-800 text-gray-400"
            aria-hidden="true"
        /></span>
        <span @click="deleteAction(action.id)" class="cursor-pointer"
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
                      >Edit Action Modal</DialogTitle
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
                  @click="editNewAction()"
                >
                  Submit
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
// import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { computed,ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { TrashIcon, PencilIcon } from "@heroicons/vue/20/solid";

const getSelectedValue = ref()
const descriptionInput = ref()
const valueInput = ref()
const open = ref(false);
const store = useStore();
const actions = computed(() => store.getters.getActions);
const lastAction = ref()

const renameAction = (actionid) =>{
  let action = store.getters.getActions
  for(let i in action){
    if(action[i].id==actionid){
      action = action[i]
    }
  }
  lastAction.value = action

  getSelectedValue.value = action.currency
  descriptionInput.value = action.explanation
  valueInput.value = action.amount

  open.value = true  
}

const editNewAction = () =>{
  let payload = {
    id: lastAction.value.id,
    currency: getSelectedValue.value,
    type: lastAction.value.type,
    explanation: descriptionInput.value,
    amount: valueInput.value,
    date: new Date(),
  };
  store.commit("editActionByID", payload);
  store.commit("setOriginalActionsToOrgnActions", store.state.actions);
  open.value = false  
}

const deleteAction = (action) =>{
  store.commit("deleteActionByID", action);
  store.commit("setOriginalActionsToOrgnActions", store.state.actions);
}
</script>
