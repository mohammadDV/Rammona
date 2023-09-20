<template>
  <BulmaCard class="about-us__partner_list">
    <h3 class="p-gap">{{ $t("table.partner") }}</h3>
    <hr class="my-0" />
    <BulmaTable
      :length="userStore.aboutus.partner.length"
      :headers="['logo', 'link', 'action']"
    >
      <tr v-for="(item, index) in userStore.aboutus.partner" :key="index">
        <td><img :src="getFileUrl(item.logo)" height="60" width="60" /></td>
        <td>{{ item.link }}</td>
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
const { getFileUrl } = useFunctions();
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
