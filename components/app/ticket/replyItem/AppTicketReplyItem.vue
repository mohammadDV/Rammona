<template>
  <ThemeChatBubble
    parentBg="card"
    :type="type"
    :creator="item.sender.username"
    :date="toDate(item.create_date)"
  >
    {{ item.content }}
    <div v-if="item.file" class="pt-gap">
      <a
        class="is-flex button is-small is-light is-info"
        style="width: 150px; gap: 5px"
        :href="getFileUrl(item.file)"
        target="_blank"
      >
        <ThemeIcon color="inherit">download</ThemeIcon>
        {{ $t("action.download") }} {{ $t("table.file") }}
      </a>
    </div>
  </ThemeChatBubble>
</template>
<script setup lang="ts">
import { TicketModel } from "~~/types";
const { getFileUrl } = useFunctions();
interface Props {
  item: TicketModel;
  type?: "sender" | "receiver";
}

withDefaults(defineProps<Props>(), {
  type: "sender",
});
const { toDate } = useMomentJalaali();
</script>
