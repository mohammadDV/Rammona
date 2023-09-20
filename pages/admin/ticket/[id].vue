<template>
  <div>
    <template v-if="loading">
      <ThemeSkeletonLoading height="200px" />
      <ThemeSkeletonLoading height="200px" class="mt-gap" />
    </template>
    <div v-else>
      <BulmaCard v-if="ticketStore.ticket" class="p-gap mb-gap">
        <h2>
          <span class="opacity-50 font-sm mx-4">
            {{ $t("table.title") }} {{ $t("apps.ticket") }}
          </span>
          {{ ticketStore.ticket.title }}
        </h2>
      </BulmaCard>
      <BulmaCard v-if="ticketStore.ticket" class="px-gap py-6">
        <div class="mr-gap pl-3">
          <AppTicketReplyItem
            :item="ticketStore.ticket"
            :type="
              ticketStore.ticket.sender.username === authStore.profile?.username
                ? 'sender'
                : 'receiver'
            "
          />
        </div>
        <div class="ml-gap pr-3" v-if="ticketStore.ticket.reply_ticket.length > 0">
          <AppTicketReplyItem
            v-for="item in ticketStore.ticket.reply_ticket"
            :key="item.id"
            class="mt-gap"
            :item="item"
            :type="
              item.sender.username === authStore.profile?.username ? 'sender' : 'receiver'
            "
          />
        </div>
      </BulmaCard>
      <AppTicketReply v-if="ticketStore.ticket?.can_reply" class="mt-gap" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";
import { useTicketStore } from "~~/store/ticket";
const ticketStore = useTicketStore();
const authStore = useAuthStore();
const route = useRoute();
const loading = ref(true);

onMounted(() => {
  ticketStore.getTicket().then(() => {
    loading.value = false;
  });
});

const title = computed(() => `تیکت - ${route.params.id}`);
useHead({ title: title });
</script>
