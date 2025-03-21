<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const props = defineProps<{
  data: {
    timestamp: number;
    pid: number;
    bytes_cdn?: number;
    bytes_p2p?: number;
    bytes_p2p_upload?: number;
  }[];
}>();

// API Data Simulation
const apiData = ref(props.data || [
  { timestamp: 1740801600000, pid: 434 },
  { timestamp: 1740805200000, pid: 311 },
  { timestamp: 1740808800000, pid: 283 },
]);

const chartData = ref({
  labels: apiData.value.map((entry) =>
    new Date(entry.timestamp).toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
    })
  ),
  datasets: [
    {
      label: "Viewers",
      data: apiData.value.map((entry) => entry.pid),
      borderColor: "#4a90e2", // Line color
      backgroundColor: "rgba(74, 144, 226, 0.3)", // ✅ Properly working soft fill
      fill: true, // ✅ Ensures the area under the line is filled
      tension: 0.4, // ✅ Smooth curve effect
      borderWidth: 2, // ✅ Makes the line bolder
      pointRadius: 0, // ✅ Removes dots on the line
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hides the legend
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      grid: {
        display: true, // ✅ Keeps X-axis grid lines
        color: "rgba(0, 0, 0, 0.1)", // Light gray grid lines
      },
      ticks: {
        color: "#6B7280", // Dark gray text for labels
      },
    },
    y: {
      grid: {
        display: true, // ✅ Keeps Y-axis grid lines
        color: "rgba(0, 0, 0, 0.2)", // Slightly darker Y-axis grid
      },
      ticks: {
        color: "#6B7280", // Dark gray text for labels
        stepSize: 100, // Adjusted step size for better readability
      },
    },
  },
})
</script>

<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-2">Viewers</h3>
    <div class="h-72">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
