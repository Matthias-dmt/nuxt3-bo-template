<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps, watchEffect } from "vue";
import { Doughnut } from 'vue-chartjs';
import { type ChartData, type ChartOptions } from "chart.js/auto";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Define TypeScript interface for props
interface DonutChartProps {
  v2vPercentage: number; // Example: 13.2%
  totalData: number; // Example: 162.19 TB
  v2vData: number; // Example: 21.39 TB
}

// Define props with strong typing
const props = defineProps<DonutChartProps>();

// Reference for the canvas
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const chartData: ChartData<"doughnut"> = ref({
  labels: ["V2V", "CDN"],
  datasets: [
    {
      data: [props.v2vPercentage, 100 - props.v2vPercentage], // V2V and remaining percentage
      backgroundColor: ["#f3d43b", "#97b9e9"], // Yellow and light blue
      borderWidth: 0, // Removes borders between segments
      borderRadius: 10, // ✅ Adds rounded edges to segments
      hoverBorderWidth: 0, // ✅ Prevents border effects on hover
    },
  ],
});

const chartOptions: ChartOptions<"doughnut"> = ref({
  responsive: true,
  maintainAspectRatio: true,
  cutout: "75%", // Creates the hollow center
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      enabled: false, // Hide default tooltips
    },
  },
})
</script>

<template>
  <div class="p-4 text-center w-80">
    <h3 class="text-lg font-semibold">V2V Percent</h3>

    <!-- Doughnut Chart -->
    <div class="relative flex items-center justify-center h-40">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="absolute text-black text-sm font-semibold">
        V2V: {{ v2vPercentage }}%
      </div>
    </div>

    <!-- Description Below Chart -->
    <p class="text-gray-700 text-sm mt-4">
      During the period, <span class="font-semibold">{{ totalData }} TB</span> has been consumed,
      in which <span class="font-semibold">{{ v2vData }} TB ({{ v2vPercentage }}%)</span> is offloaded by EasyBroadcast V2V tech.
    </p>
  </div>
</template>
