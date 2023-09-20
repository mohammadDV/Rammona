<template>
  <div class="ticket">
    <BulmaCard class="mb-gap is-flex p-gap is-justify-content-space-between">
      <h2 class="is-flex is-align-items-center">
        <ThemeIcon size="20px" color="#000" class="mx-2">Article</ThemeIcon>
        {{ $t("apps.article") }}
      </h2>
      <BulmaBtn @click="showList = !showList" type="button">
        {{ showList ? $t("action.submit") : $t("action.list") }}
        {{ $t("apps.article") }}
      </BulmaBtn>
    </BulmaCard>
    <Transition name="fade-multi" mode="out-in">
      <BulmaCard v-if="!showList" class="p-gap">
        <AppArticleCreate @success="refreshPage" />
      </BulmaCard>
      <template v-else>
        <AppArticleList :loading="loading">
          <ThemePagination :limit="articleStore.pageLimit" @change="fetchData" />
        </AppArticleList>
      </template>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from "~~/store/article";
import  AppArticleCreate  from "../../../components/app/article/create/AppArticleCreate.vue";
import  AppArticleList  from "../../../components/app/article/list/AppArticleList.vue";
useHead({ title: "مقاله" });
const showList = ref(true);

const articleStore = useArticleStore();
const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  try {
    await articleStore.getArticles();
  } finally {
    loading.value = false;
  }
};
const refreshPage = async () => {
  location.reload();
}

onMounted(() => {
  fetchData();
});
</script>
