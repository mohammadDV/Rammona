<template>
  <div class="ticket">
    <BulmaCard class="mb-gap is-flex p-gap is-justify-content-space-between">
      <h2 class="is-flex is-align-items-center">
        <ThemeIcon size="20px" color="#000" class="mx-2">ticket</ThemeIcon>
        {{ $t("apps.ticket") }}
      </h2>
      <BulmaBtn @click="showList = !showList" type="button">
        {{ showList ? $t("action.send") : $t("action.list") }}
        {{ $t("apps.ticket") }}
      </BulmaBtn>
    </BulmaCard>
    <Transition name="fade-multi" mode="out-in">
      <BulmaCard v-if="!showList" class="p-gap">
        <AppTicketCreate @success="showList = true" />
      </BulmaCard>
      <template v-else>
        <AppTicketList :loading="loading" :statusColor="statusColor">
          <ThemePagination :limit="ticketStore.pageLimit" @change="fetchData" />
        </AppTicketList>
      </template>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { useTicketStore } from "~~/store/ticket";
useHead({ title: "تیکت" });
const showList = ref(true);
const statusColor = {
  جدید: "success",
  "در انتظار پاسخ مشتری": "warning",
  "در حال پیگیری": "warning",
  "بسته شده": "dark",
};
const ticketStore = useTicketStore();
const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  try {
    await ticketStore.getTickets();
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchData();
});
</script>
