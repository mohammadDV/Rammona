<template>
  <BulmaCard class="p-gap form">
    <h1 class="pt-gap pr-gap">{{ $t("apps.project") }}</h1>
    <hr />
    <div class="product-filter">
      <div class="is-flex gap">
        <BulmaCheckbox
          v-model="form.send_to_manager"
          class="font-xsm no-wrap is-align-items-center has-text-right gap"
          :label="$t('table.send_to_manager')"
        />
        <ThemeAutocomplete
          v-model="form.status"
          class="font-xsm"
          :label="$t('table.status')"
          :reset="reset"
          :items="createSelectList(['عدم تایید', 'تایید', 'پروژه های در انتظار تایید'])"
        />
      </div>
      <div class="action is-flex gap">
        <BulmaBtn
          class="h-100"
          color="success"
          @click="() => projectStore.getProjects({ ...form })"
        >
          {{ $t("action.filter") }}
        </BulmaBtn>
        <BulmaBtn class="h-100" color="info" light @click="handleReset">
          {{ $t("action.reset") }}
        </BulmaBtn>
      </div>
    </div>
    <div class="project-table">
      <hr v-if="projectStore.projects.length > 0" class="mb-0" />
      <BulmaTable
        :page-limit="projectStore.pageLimit"
        @fetch-data="projectStore.getProjects()"
        :length="projectStore.projects.length"
        overflow-y="hidden"
        :headers="['title', 'project_category', 'project_type', 'date', 'action']"
      >
        <tr v-for="(item, index) in projectStore.projects" :key="index">
          <td class="no-wrap">
            {{ item.title }}
          </td>
          <td class="no-wrap">
            {{ item.project_type ?? "-" }}
          </td>
          <td class="no-wrap">
            {{ item.category ?? "-" }}
          </td>
          <td class="no-wrap date">
            {{ toDate(item.create_date) }}
          </td>
          <td class="no-wrap">
            <div class="is-flex gap">
              <BulmaBtn
                size="small"
                color="primary"
                rounded
                light
                :to="`/admin/project/${item.id}`"
              >
                {{ $t("table.detail") }} {{ $t("apps.project") }}
              </BulmaBtn>
              <BulmaBtn
                size="small"
                color="success"
                rounded
                light
                :to="`/admin/project/${item.id}/scenario`"
              >
                {{ $t("apps.scenario") }}
              </BulmaBtn>
              <BulmaBtn
                size="small"
                color="danger"
                rounded
                light
                :to="`/admin/project/${item.id}/risk-profile`"
              >
                {{ $t("table.risk_profile") }}
              </BulmaBtn>
              <BulmaBtn
                size="small"
                color="info"
                rounded
                light
                :to="`/admin/project/${item.id}/report`"
              >
                {{ $t("action.upload") }} {{ $t("table.reports") }}
              </BulmaBtn>
              <BulmaBtn
                size="small"
                color="info"
                rounded
                light
                :loading="item.id === loading"
                @click="downloadScenarioReport(item.id)"
              >
                {{ $t("action.download") }} {{ $t("table.report") }}
                {{ $t("apps.scenario") }}
              </BulmaBtn>
            </div>
          </td>
        </tr>
      </BulmaTable>
    </div>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useProjectStore } from "~~/store/project";

const projectStore = useProjectStore();
const { fetchLoading, handleFetchData } = useStoreFetch(projectStore.getProjects);
//
const { createSelectList } = useFunctions();
//
const reset = ref(false);
const form = reactive({
  status: "",
  send_to_manager: false,
});
function handleReset() {
  for (const i in form) {
    form[i] = null;
  }
  reset.value = !reset.value;
  projectStore.getProjects();
}
//
const { toDate } = useMomentJalaali();
//
const loading = ref<number | boolean>(false);
function downloadScenarioReport(id: number) {
  loading.value = id;
  return projectStore.downloadScenarioReport(id).finally(() => {
    loading.value = false;
  });
}
</script>
