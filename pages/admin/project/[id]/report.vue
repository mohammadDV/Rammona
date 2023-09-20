<template>
  <div class="project-report">
    <BulmaCard class="p-gap form">
      <h1 class="pt-gap pr-gap">
        {{ $t("action.submit") }} {{ $t("action.report") }}
        {{ $t("apps.project") }}
        {{ $route.params.id }}
      </h1>
      <hr />
      <form @submit.prevent="handleSubmit">
        <div class="form">
          <div class="input-container">
            <ThemeFileInput
              v-model="form.main_report"
              :label="$t('table.main_report')"
              name="main_report"
            />
          </div>
          <div class="input-container">
            <ThemeFileInput
              v-model="form.brief_report"
              :label="$t('table.brief_report')"
              name="briefReport"
            />
          </div>
          <div class="action">
            <BulmaBtn color="success" type="submit">{{
              $t("action.submit")
            }}</BulmaBtn>
          </div>
        </div>
      </form>
    </BulmaCard>
  </div>
</template>
<script setup lang="ts">
import { useProjectStore } from "~~/store/project";
const form = reactive({
  main_report: "",
  brief_report: "",
});
const loadindg = ref(false);
const projectStore = useProjectStore();
function handleSubmit() {
  loadindg.value = true;
  projectStore
    .updateProject({ ...form }, true)
    .then(() => {
      navigateTo("/admin/project");
    })
    .finally(() => {
      loadindg.value = false;
    });
}
</script>
