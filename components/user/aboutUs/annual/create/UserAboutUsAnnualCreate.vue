<template>
  <div class="about-us__annual_create">
    <div class="form">
      <div>
        <ThemeInput v-model="form.year" name="year" :label="$t('table.year')" />
      </div>
      <div>
        <ThemeInput
          input-type="textarea"
          v-model="form.content"
          name="content"
          :label="$t('table.content')"
        />
      </div>
      <div class="action">
        <BulmaBtn @click="handleSubmit" :loading="loading" color="success">
          {{ $t("action.submit") }}
        </BulmaBtn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";

const form = reactive({
  content: "",
  year: "",
});
const userStore = useUserStore();
const loading = ref(false);
function handleReset() {
  form.content = "";
  form.year = "";
}
function handleSubmit() {
  loading.value = true;
  return userStore
    .createAboutusAnnual(form)
    .then(() => {
      handleReset();
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
