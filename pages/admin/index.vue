<template>
  <div class="dashboard">
    <BulmaCard class="p-gap grid">
      <template v-if="!loading && dashboardStore.dashboard">
        <div
          v-for="(item, index) in Object.keys(dashboardStore.dashboard)"
          :key="index"
          class="dashboard__box"
          :style="index < 1 ? { cursor: 'auto' } : {}"
          @click="() => handleClick(item)"
        >
          <div class="dashboard-box__title">
            {{ $t(`table.${item}`) }}
          </div>
          <div class="dashboard-box__text">
            {{ index }}
          </div>
        </div>
      </template>
    </BulmaCard>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "~~/store/dashboard";
const dashboardStore = useDashboardStore();
//
const { fetchLoading: loading, handleFetchData } = useStoreFetch(
  dashboardStore.initDashbaord
);
//
function handleClick(item: string) {
  if (item.includes("project")) {
    navigateTo("/admin/project");
  } else if (item.includes("ticket")) {
    navigateTo("/admin/ticket");
  }
}
//
useHead({ title: "داشبورد" });
</script>
