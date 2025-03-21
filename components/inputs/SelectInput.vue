<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';

interface Option {
  id: number;
  name: string;
  icon: string;
}

const props = defineProps<{ 
  options: Option[];
  selectedOption: Option;
}>();

// Define emits
const emit = defineEmits<{
  (event: "update:selectedOption", value: Option): void;
}>();

const isOpen = ref(false);
</script>

<template>
  <Listbox :modelValue="props.selectedOption" @update:modelValue="(val) => emit('update:selectedOption', val)">
    <div class="relative w-64">
      <!-- Button -->
      <ListboxButton 
        class="relative w-full flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-50 transition">
        <span class="flex items-center">
          <span class="text-lg">{{ props.selectedOption.icon }}</span>
          <span class="ml-2 text-gray-900">{{ props.selectedOption.name }}</span>
        </span>
        <span class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </ListboxButton>

      <!-- Dropdown Options -->
      <ListboxOptions 
        class="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <ListboxOption v-for="option in props.options" :key="option.id" :value="option" v-slot="{ active, selected }">
          <li 
            class="cursor-pointer select-none relative flex items-center gap-3 px-4 py-2 transition"
            :class="{
              'bg-gray-100': active,
              'font-semibold': selected
            }">
            <span class="text-lg">{{ option.icon }}</span>
            <span class="text-gray-900">{{ option.name }}</span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>

<style scoped>
/* Add custom styling if needed */
</style>
