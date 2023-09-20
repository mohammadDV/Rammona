<template>
  <BulmaCard class="ticket-detail dir-auto p-gap" v-if="item">
    <div class="ticket-detail__header">
      <h2>
        {{ item.title }}
      </h2>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.content") }}</h5>
      <p
        class="overflow-y-auto is-narrow-scrollbar font-sm"
        style="height: 100px"
      >
        {{ item.content }}
      </p>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.department") }}</h5>
      <p>{{ item.department }}</p>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.file") }}</h5>
      <p v-if="item.file">{{ item.file }}</p>
      <ThemeIcon v-else size="30px" color="red">empty</ThemeIcon>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.status") }}</h5>
      <p>
        <BulmaTag :color="statusColor[item.ticket_status]">{{
          item.ticket_status
        }}</BulmaTag>
      </p>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.receiver_username") }}</h5>
      <p>{{ item.receiver.username }}</p>
    </div>
    <div class="ticket-detail__list">
      <h5>{{ $t("table.sender_username") }}</h5>
      <p>{{ item.sender.username }}</p>
    </div>
  </BulmaCard>
  <div v-else></div>
</template>
<script setup lang="ts">
import { TicketModel } from "~~/types";

const statusColor = {
  جدید: "info",
  "در انتظار پاسخ مشتری": "warning",
  "در حال پیگیری": "warning",
  "بسته شده": "dark",
};
defineProps<{ item: TicketModel }>();
</script>
