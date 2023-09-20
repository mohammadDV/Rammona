<template>
  <ClientOnly>
    <VueApexCharts
      v-bind="$attrs"
      class="donut-chart"
      type="donut"
      :height="props.height"
      :options="chartOptions"
      :series="series"
    />
  </ClientOnly>
</template>
<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
interface Props {
  chartData: { values: (number | string)[]; label: (string | number)[] };
  type?: "pie" | "donut";
  height?: string;
  isSemi?: boolean;
  showLegend?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  height: "100%",
  type: "pie",
  isSemi: false,
  showLegend: true,
});
const colors = [
  "#A6E3E9",
  "#F38181",
  "#DCB12D",
  "#A8D8EA",
  "#FCBAD3",
  "#00B8A9",
  "878ECD",
];
const isWalletEmpty = computed(() => {
  let empty = true;
  props.chartData.values.map((i) => {
    if (i !== 0) {
      empty = false;
    }
  });
  return empty;
});
const series = computed(() => {
  return props.chartData.values;
});
const chartOptions = computed(() => {
  const semiConfig = {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
      },
    },
  };
  const configs = {
    chart: {
      type: props.type,
      width: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    colors,
    labels: props.chartData.label,
    stroke: {
      show: false,
    },
    legend: {
      show: props.showLegend,
    },
    tooltip: {
      enabled: !props.showLegend,
      x: {
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: (value) => {
          return value;
          // showNumber(value * 100)
          //   .toString()
          //   .substr(0, 5) + " %"
        },
      },
    },
    responsive: [
      {
        breakpoint: 3000,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: props.isSemi ? "top" : "bottom",
            fontWeight: 600,
          },
        },
      },
    ],
  };
  if (props.isSemi) {
    return { ...configs, ...semiConfig };
  }
  return { ...configs };
});
</script>
