<template>
  <BulmaCard class="client-create p-gap">
    <h2 class="is-flex is-justify-content-space-between is-align-items-center">
      {{ $t("action.create") }} {{ $t("apps.client") }}
      <BulmaBtn @click="emit('update:modelValue')">{{
        modelValue ? $t("action.close") : $t("action.create")
      }}</BulmaBtn>
    </h2>
    <Transition>
      <div v-if="modelValue">
        <hr class="my-gap" />
        <form class="form" @submit.prevent="handleSubmit">
          <div class="input-container">
            <ThemeFileInput
              :reset="reset"
              v-model="form.logo"
              name="logo"
              :label="$t('table.logo')"
            />
          </div>
          <div class="action">
            <BulmaBtn
              block
              color="success"
              :loading="loading"
              :disabled="!isValid"
              type="submit"
            >
              {{ $t("action.submit") }}
            </BulmaBtn>
          </div>
        </form>
      </div>
    </Transition>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";

const websiteStore = useWebsiteStore();
//
defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue"): void;
}>();
//
const form = reactive({
  logo: "",
});
//
const loading = ref(false);
const isValid = computed(() => {
  for (const i in form) {
    if (!form[i]) return false;
  }
  return true;
});
const reset = ref(false);
function handleReset() {
  for (const i in form) {
    form[i] = "";
  }
  reset.value = true;
  setTimeout(() => {
    reset.value = false;
  }, 100);
  emit("update:modelValue");
}
function handleSubmit() {
  if (isValid.value) {
    loading.value = true;
    websiteStore
      .createClient({ ...form })
      .then(() => handleReset())
      .finally(() => {
        loading.value = false;
      });
  }
}
</script>
