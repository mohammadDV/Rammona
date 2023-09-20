<template>
  <div class="about-us__content_create">
    <div class="form">
      <div>
        <ThemeInput v-model="form.content" name="content" :label="$t('table.content')" />
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
});
const userStore = useUserStore();
const loading = ref(false);
function handleReset() {
  form.content = "";
}
function handleSubmit() {
  loading.value = true;
  return userStore
    .createAboutusContent(form)
    .then(() => {
      handleReset();
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
