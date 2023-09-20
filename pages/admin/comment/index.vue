<template>
  <div class="ticket">
    <BulmaCard class="mb-gap is-flex p-gap is-justify-content-space-between">
      <h2 class="is-flex is-align-items-center">
        <ThemeIcon size="20px" color="#000" class="mx-2">Comment</ThemeIcon>
        {{ $t("apps.comment_list") }}
      </h2>
    </BulmaCard>
    <Transition name="fade-multi" mode="out-in">
        <AppCommentList :loading="loading">
          <ThemePagination :limit="commentStore.pageLimit" @change="fetchData" />
        </AppCommentList>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { useCommentStore } from "~~/store/comment";
import  AppCommentList  from "../../../components/app/comment/list/AppCommentList.vue";
useHead({ title: "پیام" });

const commentStore = useCommentStore();
const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  try {
    await commentStore.getComments();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
