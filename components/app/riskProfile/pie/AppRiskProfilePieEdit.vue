<template>
  <div class="edit-pie-chart">
    <div>
      <ThemeInput name="" v-model="form.less_than" :label="$t('table.less_than')" />
    </div>
    <div>
      <ThemeInput name="" v-model="form.between_1" :label="$t('table.between_1')" />
    </div>
    <div>
      <ThemeInput name="" v-model="form.between_2" :label="$t('table.between_2')" />
    </div>
    <div>
      <ThemeInput name="" v-model="form.more_than" :label="$t('table.more_than')" />
    </div>
    <div class="action">
      <BulmaBtn
        width="100%"
        :loading="loading"
        :disabled="!isValid"
        height="40px"
        @click="handleSubmit"
        >{{ $t("action.edit") }}</BulmaBtn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRiskProfileStore } from "~~/store/risk-profile";

const riskProfileStore = useRiskProfileStore();
const form = reactive({
  less_than: "",
  between_1: "",
  between_2: "",
  more_than: "",
});
const isValid = computed(() => {
  return form.less_than || form.between_1 || form.between_2 || form.more_than;
});
const loading = ref(false);
function handleSubmit() {
  if (!isValid.value) return;
  loading.value = true;
  riskProfileStore.filterRiskProfileChart({ ...form }).finally(() => {
    loading.value = false;
  });
}
</script>
