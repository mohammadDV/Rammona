<template>
  <BulmaCard class="create-clause dir-auto p-gap w-inherit">
    <h1 class="pr-5">{{ $t("action.create") }} {{ $t("apps.clause") }}</h1>
    <hr class="mt-gap mb-5" />
    <form @submit.prevent="handleSubmit" class="form">
      <div class="input-container">
        <ThemeAutocomplete
          :label="$t('table.clause_template')"
          v-model="form.clause"
          :items="clauseTemplatesList"
        />
      </div>
      <div class="input-container">
        <ThemeInput v-model="form.text" :label="$t('table.text')" name="clause_text" />
      </div>
      <div class="action">
        <BulmaBtn block :loading="loading" color="success" type="submit">
          {{ $t("action.create") }} {{ $t("apps.clause") }}
        </BulmaBtn>
      </div>
    </form>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useProjectStore } from "~~/store/project";
const projectStore = useProjectStore();
const emit = defineEmits<{
  (e: "submit", data: any): void;
}>();
//
const clauseTemplatesList = computed(() =>
  projectStore.clauseTemplates.map((i) => ({ title: i.title, value: i.id }))
);
//
const form = reactive({
  clause: "",
  text: "",
});
const loading = ref(false);
function handleSubmit() {
  loading.value = true;
  projectStore
    .createClause({ ...form })
    .then((product) => {
      emit("submit", product);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
