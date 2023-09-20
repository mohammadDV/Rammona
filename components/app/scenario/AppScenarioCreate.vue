<template>
  <BulmaCard class="senario-form p-gap dir-auto z-index-1 w-100">
    <div class="form">
      <div class="input-container">
        <ThemeInput
          :reset="reset"
          v-model="form.content"
          :label="`${$t('table.title')} ${$t('apps.scenario')}`"
          name="projectType"
        />
      </div>
      <div class="input-container">
        <ThemeAutocomplete
          :reset="reset"
          v-model="form.category"
          :label="`${$t('table.category')} ${$t('apps.scenario')}`"
          name="projectType"
          style="font-size: 10px; min-width: 100px"
          :items="createSelectList(SCENARIO_CATEGORY)"
        />
      </div>
      <div class="input-container">
        <ThemeInput
          v-model="form.severity_high"
          :label="`${$t('table.severity_high')}`"
          name="projectType"
          type="number"
          :reset="reset"
        />
      </div>
      <div class="input-container">
        <ThemeInput
          v-model="form.severity_low"
          :label="`${$t('table.severity_low')}`"
          name="projectType"
          type="number"
          :reset="reset"
        />
      </div>
      <div class="input-container">
        <ThemeInput
          v-model="form.probability_high"
          :label="`${$t('table.probability_high')}`"
          name="projectType"
          type="number"
          :reset="reset"
        />
      </div>
      <div class="input-container">
        <ThemeInput
          v-model="form.probability_low"
          :label="`${$t('table.probability_low')}`"
          name="projectType"
          type="number"
          :reset="reset"
        />
      </div>
      <div class="action">
        <BulmaBtn
          :loading="loading"
          color="success"
          block
          @click="handleSubmit"
        >
          {{ $t(`action.${data ? "edit" : "create"}`) }}
        </BulmaBtn>
      </div>
    </div>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useRiskProfileStore } from "~~/store/risk-profile";
import { SCENARIO_CATEGORY } from "~~/const";
import { ScenarioModel } from "~~/types";
const { createSelectList } = useFunctions();
interface Props {
  data?: ScenarioModel;
  count: number;
}

const props = defineProps<Props>();
const reset = ref(false);
const form = reactive({
  content: "",
  severity_high: "",
  severity_low: "",
  probability_high: "",
  probability_low: "",
  number: "",
  category: "",
});
//
const emit = defineEmits<{
  (e: "submit", data: any): void;
}>();
//
const riskProfileStore = useRiskProfileStore();
const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  if (!props.data) {
    form.number = `SC${props.count + 1}`;
  }
  try {
    let newData: ScenarioModel | null = null;
    if (!props.data) {
      await riskProfileStore.createScenario({ ...form });
    } else {
      newData = await riskProfileStore.updateScenario(
        { ...form },
        props.data.id
      );
      await riskProfileStore.getRiskProfileChart();
    }
    emit("submit", form);
    handleReset(newData as ScenarioModel);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
function handleReset(newData: ScenarioModel) {
  for (const i in form) {
    if (!newData) {
      form[i] = "";
    } else {
      form[i] = newData[i];
    }
  }
  if (!newData) {
    reset.value = true;
    setTimeout(() => {
      reset.value = false;
    }, 100);
  }
  return true;
}
// if data
watch(
  () => props.data,
  () => {
    if (props.data) {
      console.log(props.data);
      for (const i in props.data) {
        form[i] = props.data[i];
      }
    } else {
      form.number = `SC${props.count + 1}`;
    }
  },
  { immediate: true }
);
</script>
