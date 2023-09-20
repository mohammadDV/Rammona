<template>
  <BulmaCard class="about-us__content_list">
    <h3 class="p-gap">{{ $t("table.content") }}</h3>
    <hr class="my-0" />
    <BulmaTable
      :length="userStore.aboutus.content.length"
      :headers="['content', 'action']"
    >
      <tr v-for="(item, index) in userStore.aboutus.content" :key="index">
        <td>{{ item.content.split(" ").slice(0, 5).join(" ") }} ...</td>
        <td>
          <BulmaBtn
            color="danger"
            :loading="loading && selected === item.id"
            :title="$t('action.delete')"
            @click="handleDelete(item.id)"
          >
            <ThemeIcon color="white">delete</ThemeIcon>
          </BulmaBtn>
        </td>
      </tr>
    </BulmaTable>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useUserStore } from "~~/store/user";
const userStore = useUserStore();
const loading = ref(false);
const selected = ref<null | number>(null);
function handleDelete(id: number) {
  selected.value = id;
  loading.value = true;
  return userStore.removeAboutusContent(id).finally(() => {
    loading.value = false;
  });
}
</script>
