<template>
  <BulmaCard>
    <BulmaTable
      :loading="loading"
      :headers="headers"
      :length="ticketStore.tickets.length"
    >
      <tr
        v-for="item in ticketStore.tickets"
        :key="item.id"
        :class="{
          unread: !item.seen,
        }"
      >
        <td>{{ item.title }}</td>
        <td
          class="px-3"
          style="
            max-width: 200px;
            width: 200px;
            overflow: hidden;
            white-space: break-spaces;
          "
        >
          {{ item.content }}
        </td>
        <td>{{ item.category }}</td>
        <td>
          <a v-if="item.file" :href="getFileUrl(item.file)" target="_blank">
            دانلود فایل
          </a>
          <ThemeIcon v-else size="30px" color="red">empty</ThemeIcon>
        </td>
        <td>
          <BulmaTag :color="statusColor[item.ticket_status as keyof typeof statusColor]"
            >{{ item.ticket_status }}
          </BulmaTag>
        </td>
        <td>{{ item.receiver.map((item) => item.username).join("-") ?? "-" }}</td>
        <td>{{ item.sender.username }}</td>
        <td class="date">
          {{ item.update_date ? toDate(item.update_date) : toDate(item.create_date) }}
        </td>
        <td>
          <BulmaBtn size="small" color="info" :to="`/admin/ticket/${item.id}`">
            {{ $t("action.readmore") }}
          </BulmaBtn>
        </td>
      </tr>
    </BulmaTable>
    <slot />
    <!-- <BulmaDialog v-model="dialog">
      <AppTicketDetail width="300px" v-if="selected" :item="selected" />
    </BulmaDialog> -->
  </BulmaCard>
</template>
<script setup lang="ts">
import { useTicketStore } from "~~/store/ticket";
const { getFileUrl } = useFunctions();
const { toDate } = useMomentJalaali();
const headers = [
  "title",
  "content",
  "department",
  "file",
  "status",
  "receiver",
  "sender",
  "date",
  "action",
];
//
interface Props {
  statusColor: object;
  loading: boolean;
}
defineProps<Props>();
//
const ticketStore = useTicketStore();
//
const selected = ref(null);
const dialog = ref(false);
// function handleReadMore(item) {
//   selected.value = item;
//   dialog.value = true;
// }
</script>
