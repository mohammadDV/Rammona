<template>
  <BulmaCard class="create-turbine p-gap dir-auto w-inherit">
    <h1 class="pr-5">{{ $t("action.create") }} {{ $t("apps.turbine") }}</h1>
    <hr class="mt-gap mb-5" />
    <form @submit.prevent="handleSubmit" class="form">
      <div class="input-container">
        <ThemeAutocomplete
          :items="turbinesList"
          v-model="form.model_brand"
          :label="$t('table.turbine_type')"
          name="powerPlantEfficiency"
        />
      </div>
      <div class="input-container">
        <ThemeInput v-model="form.count" :label="$t('table.count')" name="count" />
      </div>
      <div class="action">
        <BulmaBtn block color="success" type="submit">
          {{ $t("action.create") }} {{ $t("apps.turbine") }}
        </BulmaBtn>
      </div>
    </form>
  </BulmaCard>
</template>
<script setup lang="ts">
import { TURBINES } from "~~/const";
import { useProjectStore } from "~~/store/project";
import { TurbineModel } from "~~/types";
const projectStore = useProjectStore();
//
const props = defineProps<{
  turbine_project: any[];
}>();
const emit = defineEmits<{
  (e: "submit", data: TurbineModel): void;
}>();
//
const { createSelectList } = useFunctions();
const turbinesList = computed(() => {
  const list = TURBINES.filter((item) => !props.turbine_project.includes(item));
  return createSelectList(list);
});
//
const form = reactive({
  model_brand: "",
  count: "",
});
const loading = ref(false);
function handleSubmit() {
  loading.value = true;
  projectStore
    .createTurbine({ ...form })
    .then((res) => {
      emit("submit", res);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
