<template>
  <BulmaCard class="client-list p-gap">
    <h2 class="mb-gap">{{ $t("apps.client") }}</h2>
    <BulmaTable
      :loading="fetchLoading"
      :length="websiteStore.clients.length"
      :headers="['logo', 'action']"
    >
      <tr v-for="(item, index) in websiteStore.clients" :key="index">
        <td><img :src="getFileUrl(item.logo)" width="100" height="100" /></td>
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
        :title="$t('apps.client')"
        :id="dialog.selected"
      />
    </BulmaDialog>
  </BulmaCard>
</template>
<script setup lang="ts">
import { useWebsiteStore } from "~~/store/website";

const websiteStore = useWebsiteStore();
const { getFileUrl } = useFunctions();
const { fetchLoading } = useStoreFetch(websiteStore.getClients);
const dialog = reactive({
  selected: null,
  show: false,
});
function resetDialog() {
  dialog.show = false;
  dialog.selected = null;
}
function handleDelete(id: number) {
  websiteStore.deleteClient(id).then(() => {
    resetDialog();
  });
}
</script>
