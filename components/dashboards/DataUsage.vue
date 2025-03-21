<template>
  <div class="bg-gray-100 p-6">
    <InputsSelectInput 
      :options="statsOriginPickerOptions"
      :selectedOption="selectedOption"
      @update:selectedOption="selectedOption = $event"
      class="pb-4"
    />

    <!-- WITH TAILWINDCSS -->
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white p-6 rounded-lg text-white shadow-lg">
          <ChartsLineChart :data="groupedData" />
        </div>

        <div class="bg-white p-6 rounded-lg text-white shadow-lg">
          <h2 class="text-xl font-semibold">Block 2</h2>
          <p>Spans 1 column.</p>
        </div>

        <div class="lg:col-span-2 bg-white p-6 rounded-lg text-white shadow-lg">
          <ChartsLineChart/>
        </div>

        <div class="bg-white p-6 rounded-lg text-white shadow-lg flex justify-center items-center">
          <ChartsDonutChart :v2vPercentage="13.2" :totalData="162.19" :v2vData="21.39" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define TypeScript interfaces for your data
interface StatsOriginOption {
  id: number;
  name: string;
  icon: string;
}

// Define options as a ref array
const statsOriginPickerOptions = ref<StatsOriginOption[]>([
  { id: 1, name: "Forja", icon: "📦" },
  { id: 2, name: "Other Option", icon: "🔧" }
]);

// Define the selected option as a ref
const selectedOption = ref<StatsOriginOption>(statsOriginPickerOptions.value[0]);

const apiData = ref([
  { timestamp: 1740801600000, pid: 434 },
  { timestamp: 1740801600000, pid: 434 },
  { timestamp: 1740805200000, pid: 311 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 },
  { timestamp: 1740808800000, pid: 283 }
  // {
  //     timestamp: 1740805200000,
  //     pid: 311,
  //     bytes_cdn: 266158069650,
  //     bytes_p2p: 3703165323,
  //     bytes_p2p_upload: 3109602410
  // },
  // {
  //     timestamp: 1740808800000,
  //     pid: 283,
  //     bytes_cdn: 236967662089,
  //     bytes_p2p: 546960920,
  //     bytes_p2p_upload: 846844589
  // },
]);

// Function to group and sum data by timestamp
const groupedData = computed(() => {
  const groupedMap = new Map();

  apiData.value.map(({ timestamp, pid }) => {
    if (!groupedMap.has(timestamp)) {
      groupedMap.set(timestamp, 0);
    }
    groupedMap.set(timestamp, groupedMap.get(timestamp) + pid);
  });

  return Array.from(groupedMap, ([timestamp, pid]) => ({ timestamp, pid }));
});

console.log(groupedData.value);

</script>

<style lang="scss" scoped>
.container {
  display: grid;
  gap: 16px;
  
  // Desktop Layout (6 Columns, 4 Rows)
  @media (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr); // 6 equal columns
    grid-template-rows: repeat(4, auto); // 4 equal rows

    .block1 {
      grid-column: 1 / 5; // Span columns 1 to 4
      grid-row: 1 / 3; // Span rows 1 to 2
    }

    .block2 {
      grid-column: 1 / 5; // Span columns 1 to 4
      grid-row: 3 / 5; // Span rows 3 to 4
    }

    .block3 {
      grid-column: 5 / 7; // Span columns 5 to 6
      grid-row: 1 / 3; // Span rows 1 to 2
    }

    .block4 {
      grid-column: 5 / 7; // Span columns 5 to 6
      grid-row: 3 / 5; // Span rows 3 to 4
    }
  }

  // Mobile Layout (1 Column, 4 Rows)
  @media (max-width: 767px) {
    grid-template-columns: 1fr; // Single column
    grid-template-rows: repeat(4, auto); // 4 rows for each block

    .block1, .block2, .block3, .block4 {
      grid-column: auto;
      grid-row: auto;
    }
  }

  .block {
    background-color: #f3f3f3;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    font-size: 1.2rem;
  }
}
</style>
