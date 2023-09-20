<template>
  <ClientOnly>
    <VueApexCharts
      v-bind="$attrs"
      class="d-flex justify-center total-assets"
      style="direction: ltr"
      :options="chartOptions"
      :series="series"
      :height="props.height"
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
  chartData: { name: string; data: any[] }[];
  label: any[];
  height?: number | string;
  color?: string[];
  showDownloadOptions?: boolean;
  type?: "line" | "area" | "bar";
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: 350,
  color: () => ["var(--text-color)"],
  showLegend: true,
  showDownloadOptions: true,
  type: "line",
});
const { theme } = useThemeConfig();
const loading = reactive({
  page: true,
});
onMounted(() => {
  nextTick(() => (loading.page = false));
});
const series = computed(() => {
  return props.chartData;
});
const chartOptions = computed(() => {
  return {
    chart: {
      height: props.height,
      width: "100%",
      type: props.type,
      zoom: {
        enabled: false,
      },
      background: "var(--card)",
      toolbar: {
        show: props.showDownloadOptions,
        export: {
          csv: {
            filename: "گزارش",
          },
          svg: {
            filename: "گزارش",
          },
          png: {
            filename: "گزارش",
          },
        },
      },
      locales: [
        {
          name: "fa",
          options: {
            toolbar: {
              exportToSVG: "SVG دانلود",
              exportToPNG: "PNG دانلود",
              exportToCSV: "CSV دانلود",
            },
          },
        },
      ],
      defaultLocale: "fa",
    },
    theme: {
      mode: theme.value === "dark" ? "dark" : "light",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1.75,
    },
    fill: {
      colors: props.color,
      opacity: 1,
    },
    colors: props.color,
    xaxis: {
      type: "category",
      categories: props.label,
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: "10px",
          fontFamily: "IRANSansWeb_FaNum_Black",
          fontWeight: 300,
          // cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
        format: undefined,
        formatter: undefined,
        datetimeUTC: true,
      },
    },
    grid: {
      // borderColor:theme.value === "dark" ? "#dddddd38" : "#ddd",
    },
    // xaxis: isYear
    //   ? { categories: props.xaxisData }
    //   : { numeric: props.xaxisData },
  };
});
</script>
