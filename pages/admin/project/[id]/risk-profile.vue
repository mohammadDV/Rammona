<template>
  <div class="risk-profile">
    <BulmaCard class="p-gap form">
      <h1 class="pt-gap pr-gap">
        {{ $t("apps.risk_profile") }} {{ $t("apps.project") }}
        {{ $route.params.id }}
      </h1>
      <hr />
      <template v-if="!fetchLoading">
        <div class="list" v-if="riskProfileStore.scenarios?.length > 0">
          <template v-for="(item, index) in riskProfileStore.scenarios" :key="index">
            <AppScenarioCreate
              :data="item"
              :count="riskProfileStore.scenarios.length"
              @submit="handleEditedScenario"
            />
          </template>
        </div>
        <div v-else style="height: 200px" class="is-center">
          <BulmaBtn :to="`/admin/project/${$route.params.id}/scenario`">
            {{ $t("action.create") }} {{ $t("apps.scenario") }}
          </BulmaBtn>
        </div>
      </template>
      <div v-else>
        <ThemeSkeletonLoading v-for="i in 5" class="my-gap" height="30px" :key="i" />
      </div>
      <hr />
      <div class="charts" v-if="!fetchLoading">
        <AppChartLineBar
          :chart-data="riskProfileStore.barChart.series"
          :color="['#f14668', '#12a9db']"
          title="test 1"
          :label="[]"
          type="bar"
        />
        <AppChartLineBar
          :chart-data="riskProfileStore.lineChart.series"
          :color="['#f14668', '#12a9db']"
          title="test 1"
          :label="[]"
        />
      </div>
    </BulmaCard>
    <BulmaCard class="mt-gap p-gap pt-5">
      <AppRiskProfilePieEdit />
      <AppChartPie
        v-if="
          riskProfileStore.pieChart?.values.length > 0 &&
          riskProfileStore.pieChart.values.reduce((a, b) => a + b) !== 0
        "
        :chart-data="riskProfileStore.pieChart"
        title="test"
        type="pie"
        height="200px"
      />
      <div v-else class="is-center is-justify-content-center" style="height: 200px">
        <div class="text-center">
          <ThemeIcon color="primary" size="100px">chartPie</ThemeIcon>
          <p>{{ $t("table.empty") }}</p>
        </div>
      </div>
      <!-- <AppChartPie :chart-data="{ values: [], label: [] }" />
        <AppChartBar /> -->
    </BulmaCard>
  </div>
</template>
<script setup lang="ts">
import { useRiskProfileStore } from "~~/store/risk-profile";
// fetch data
const riskProfileStore = useRiskProfileStore();
const { fetchLoading } = useStoreFetch(riskProfileStore.getRiskProfileChart);
const isUpdateMode = ref(false);
watchEffect(() => {
  if (riskProfileStore.scenarios) {
    isUpdateMode.value = riskProfileStore.scenarios.length > 0;
  }
});
//
const actions = reactive({
  editData: undefined,
});
function handleEditedScenario() {
  actions.editData = undefined;
}
</script>
