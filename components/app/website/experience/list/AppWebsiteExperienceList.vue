<template>
  <BulmaCard class="experience-list p-gap">
    <h2 class="mb-gap">{{ $t("apps.experience") }}</h2>
    <BulmaTable
      :loading="fetchLoading"
      :length="websiteStore.experiences.length"
      :headers="['title', 'feature_text', 'action']"
    >
      <tr v-for="(item, index) in websiteStore.experiences" :key="index">
        <td>{{ item.title }}</td>
        <td>{{ item.feature_text }}</td>
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
        :title="$t('apps.experience')"
        :id="dialog.selected"
      />
    </BulmaDialog>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";

const websiteStore = useWebsiteStore();
const { fetchLoading } = useStoreFetch(websiteStore.getExperiences);
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
  websiteStore.deleteExperience(id).then(() => {
    resetDialog();
  });
}
</script>
