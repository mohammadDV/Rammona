<template>
  <div class="project-scenario">
    <BulmaCard class="p-gap form">
      <h1 class="pt-gap pr-gap">
        {{ $t("apps.scenario") }} {{ $t("apps.project") }}
        {{ $route.params.id }}
      </h1>
      <hr />
      <template v-if="!fetchLoading">
        <div class="list" v-if="riskProfileStore.scenarios?.length > 0">
          <ul>
            <li
              class="scenario-list mb-gap"
              :style="`grid-template-columns: repeat(${headers.length},${
                95 / headers.length
              }%);`"
            >
              <div v-for="(item, id) in headers" :key="id">
                {{ $t(`table.${item}`) }}
              </div>
            </li>
            <hr />
            <template
              v-for="(item, index) in riskProfileStore.scenarios"
              :key="index"
            >
              <li
                v-if="!actions.editData || actions.editData !== item"
                class="scenario-list mb-gap"
                :style="`grid-template-columns: repeat(${headers.length},${
                  95 / headers.length
                }%);`"
              >
                <div>{{ item.number }}</div>
                <div>{{ item.content }}</div>
                <div>{{ item.category }}</div>
                <div>{{ item.probability_high.toFixed(2) }}</div>
                <div>{{ item.probability_low.toFixed(2) }}</div>
                <div>{{ item.severity_high.toFixed(2) }}</div>
                <div>{{ item.severity_low.toFixed(2) }}</div>
                <div class="scenario-list__action">
                  <BulmaBtn
                    color="danger"
                    @click="handleDeleteDialog(item.id)"
                    :loading="deleteLoading === item.id"
                    height="30px"
                    width="30px"
                  >
                    <ThemeIcon color="#fff">delete</ThemeIcon>
                  </BulmaBtn>
                  <BulmaBtn
                    color="warning"
                    @click="handleEditScenario(item)"
                    height="30px"
                    width="30px"
                  >
                    <ThemeIcon color="#fff">edit</ThemeIcon>
                  </BulmaBtn>
                </div>
              </li>
              <AppScenarioCreate
                v-else
                :data="actions.editData"
                :count="riskProfileStore.scenarios?.length"
              />
            </template>
          </ul>
        </div>
      </template>
      <template v-else>
        <ThemeSkeletonLoading v-for="i in 5" class="my-gap" :key="i" />
      </template>
      <hr v-if="riskProfileStore.scenarios?.length > 0" />
      <AppScenarioCreate
        @submit="handleCreatedScenario"
        :count="riskProfileStore.scenarios?.length ?? 0"
      />
      <div class="senario-action">
        <BulmaBtn color="success" :loading="loading" @click="submitScenarios">
          {{ $t("action.submit") }} {{ $t("apps.scenarios") }}
        </BulmaBtn>
      </div>
      <BulmaDialog v-model="deleteDialog.dialog">
        <AppProjectDeleteConfirm
          v-if="deleteDialog.dialog"
          @delete="handleDeleteScenario"
          :title="$t('apps.scenario')"
          :id="deleteDialog.id"
        />
      </BulmaDialog>
    </BulmaCard>
  </div>
</template>
<script setup lang="ts">
import { useRiskProfileStore } from "~~/store/risk-profile";
// fetch data
const riskProfileStore = useRiskProfileStore();
const { fetchLoading } = useStoreFetch(riskProfileStore.getScenarioByProjectId);
//
const actions = reactive({
  editData: undefined,
  dialog: false,
});
function handleCreatedScenario() {
  actions.dialog = false;
  actions.editData = undefined;
}
// delete
const deleteDialog = reactive({
  dialog: false,
  id: null,
});
const deleteLoading = ref<boolean | number>(false);
function handleDeleteScenario() {
  deleteLoading.value = deleteDialog.id;
  riskProfileStore.deleteScenario(deleteDialog.id).finally(() => {
    deleteLoading.value = false;
    deleteDialog.dialog = false;
    deleteDialog.id = null;
  });
}
function handleDeleteDialog(id: number) {
  deleteDialog.dialog = true;
  deleteDialog.id = id;
}
// edit
function handleEditScenario(item) {
  actions.editData = item;
  actions.dialog = true;
}
const headers = [
  "id",
  "content",
  "category",
  "probability_high",
  "probability_low",
  "severity_high",
  "severity_low",
  "action",
];
//
const loading = ref(false);
function submitScenarios() {
  loading.value = true;
  return riskProfileStore
    .createRiskProfile(riskProfileStore.defaultScenarios.length > 0)
    .finally(() => {
      loading.value = false;
    });
}
</script>
