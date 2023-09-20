<template>
  <BulmaCard class="slideshow-list p-gap">
    <h2 class="mb-gap">{{ $t("apps.slideshow") }}</h2>
    <BulmaTable
      :loading="fetchLoading"
      :length="websiteStore.slideshows.length"
      :headers="['image', 'action']"
    >
      <tr v-for="(item, index) in websiteStore.slideshows" :key="index">
        <td><img :src="getFileUrl(item.image)" width="100" height="100" /></td>
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
        :title="$t('apps.slideshow')"
        :id="dialog.selected"
      />
    </BulmaDialog>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";

const websiteStore = useWebsiteStore();
const { fetchLoading } = useStoreFetch(websiteStore.getSlideshows);
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
  websiteStore.deleteSlideshow(id).then(() => {
    resetDialog();
  });
}
</script>
