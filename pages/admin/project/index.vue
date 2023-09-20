<template>
  <div class="project-list">
    <div class="projects-section-line">
      <div class="projects-status">
        <div class="item-status">
          <span class="status-number">
            {{ dashboardStore.dashboard.in_progress_projects }}
          </span>
          <span class="status-type">پروژه‌های در جریان</span>
        </div>
        <div class="item-status">
          <span class="status-number">{{
            dashboardStore.dashboard.finished_projects
          }}</span>
          <span class="status-type">پروژه‌های تکمیل شده</span>
        </div>
        <div class="item-status">
          <span class="status-number">
            {{ dashboardStore.dashboard.all_projects }}
          </span>
          <span class="status-type">کل پروژه‌ها</span>
        </div>
      </div>
    </div>
    <AppProjectList />
  </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from "~~/store/dashboard";
import { useProjectStore } from "~~/store/project";
const dashboardStore = useDashboardStore();
const projectStore = useProjectStore();
const { fetchLoading, handleFetchData } = useStoreFetch(dashboardStore.initDashbaord);
</script>
