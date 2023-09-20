<template>
  <BulmaCard class="challenge-list p-gap">
    <h2 class="mb-gap">{{ $t("apps.challenge") }}</h2>
    <BulmaTable
      :length="websiteStore.challenges.length"
      :loading="fetchLoading"
      :headers="['icon', 'title', 'content', 'action']"
    >
      <tr v-for="(item, index) in websiteStore.challenges" :key="index">
        <td><img :src="getFileUrl(item.icon)" width="100" height="100" /></td>
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>
          <BulmaBtn
            @click="
              () => {
                dialog.selected = item.id;
                dialog.show = true;
              }
            "
          >
            <ThemeIcon color="white">delete</ThemeIcon>
          </BulmaBtn>
        </td>
      </tr>
    </BulmaTable>
    <BulmaDialog v-model="dialog.show">
      <AppProjectDeleteConfirm
        v-if="dialog.show"
        @delete="handleDelete"
        :title="$t('apps.solution')"
        :id="dialog.selected"
      />
    </BulmaDialog>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";
const websiteStore = useWebsiteStore();
const { fetchLoading } = useStoreFetch(websiteStore.getChallenges);
const { getFileUrl } = useFunctions();
const dialog = reactive({
  selected: null,
  show: false,
});
function resetDialog() {
  dialog.show = false;
  dialog.selected = null;
}
function handleDelete(id: number) {
  websiteStore.deleteChallenge(id).then(() => {
    resetDialog();
  });
}
</script>
