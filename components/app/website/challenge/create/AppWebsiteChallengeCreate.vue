<template>
  <BulmaCard class="challenge-create p-gap">
    <h2
      :title="$t('action.create')"
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      {{ $t("action.create") }} {{ $t("apps.challenge") }}
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
              v-model="form.icon"
              name="icon"
              :label="$t('table.icon')"
            />
          </div>
          <div class="input-container">
            <ThemeInput
              :reset="reset"
              v-model="form.title"
              name="title"
              :label="$t('table.title')"
            />
          </div>
          <div class="input-container">
            <ThemeInput
              :reset="reset"
              v-model="form.content"
              name="content"
              :label="$t('table.content')"
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
defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue"): void;
}>();
//
const form = reactive({
  icon: "",
  title: "",
  content: "",
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
      .createChallenge({ ...form })
      .then(() => handleReset())
      .finally(() => {
        loading.value = false;
      });
  }
}
</script>
