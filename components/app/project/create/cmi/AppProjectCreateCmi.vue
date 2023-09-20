<template>
  <BulmaCard class="create-clause dir-auto p-gap w-inherit">
    <h1 class="pr-5">{{ $t("action.create") }} {{ $t("apps.cmi_coverage") }}</h1>
    <hr class="mt-gap mb-5" />
    <form @submit.prevent="handleSubmit" class="form">
      <div class="input-container">
        <ThemeAutocomplete
          :items="createSelectList(CMI_COVERAGE)"
          v-model="form.main_coverage_cmi"
          :label="$t('table.main_coverage_CMI')"
          name="mainCoverageCMI"
        />
      </div>
      <div class="action">
        <BulmaBtn block :loading="loading" color="success" type="submit">
          {{ $t("action.create") }} {{ $t("apps.cmi_coverage") }}
        </BulmaBtn>
      </div>
    </form>
  </BulmaCard>
</template>
<script setup lang="ts">
import { CMI_COVERAGE } from "~/const";
import { useProjectStore } from "~~/store/project";
const projectStore = useProjectStore();
const emit = defineEmits<{
  (e: "submit", data: any): void;
}>();
//
const { createSelectList } = useFunctions();
//
const form = reactive({
  main_coverage_cmi: "" as typeof CMI_COVERAGE[number],
});
const loading = ref(false);
function handleSubmit() {
  loading.value = true;
  projectStore
    .createCmi({ ...form })
    .then((cmi) => {
      console.log(cmi);
      emit("submit", cmi);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
