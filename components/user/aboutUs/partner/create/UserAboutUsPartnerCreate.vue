<template>
  <div class="about-us__partner_create">
    <div class="form">
      <div>
        <ThemeFileInput v-model="form.logo" :label="$t('table.logo')" name="logo" />
      </div>
      <div>
        <ThemeInput
          v-model="form.link"
          name="link"
          :lable="$t('table.link')"
          :label="$t('table.link')"
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
  link: "",
  logo: "",
});
const userStore = useUserStore();
const loading = ref(false);
function handleReset() {
  form.link = "";
  form.logo = "";
}
function handleSubmit() {
  loading.value = true;
  return userStore
    .createAboutusPartner(form)
    .then(() => {
      handleReset();
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
