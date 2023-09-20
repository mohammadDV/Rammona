<template>
  <BulmaCard class="p-gap pt-5">
    <form class="form" @submit.prevent="handleSubmit">
      <div>
        <ThemeAutocomplete
          :label="$t('table.status')"
          v-model="form.ticket_status"
          :items="statuses"
          clearable
          :reset="reset"
        />
      </div>
      <div>
        <ThemeInput
          name="content"
          v-model="form.content"
          v-model:valid="formValid.content"
          :reset="reset"
          :validation="{ required: true }"
          :label="$t('table.content')"
        />
      </div>
      <div>
        <ThemeFileInput
          :validation="{ type: 'image', maxSize: 2 }"
          name="file"
          v-model="form.file"
          v-model:valid="formValid.file"
        />
      </div>
      <div>
        <BulmaBtn
          type="submit"
          block
          color="success"
          :loading="loading"
          :disabled="!isValid"
        >
          {{ $t("action.reply") }} {{ $t("apps.ticket") }}
        </BulmaBtn>
      </div>
    </form>
  </BulmaCard>
</template>
<script setup lang="ts">
import { TICKET } from "~~/const";
import { useTicketStore } from "~~/store/ticket";

const route = useRoute();
const ticketStore = useTicketStore();
//
const statuses = computed(() => {
  return TICKET.replyStatus.map((i) => ({ title: i, value: i }));
});
//
const form = reactive({
  ticket_status: "",
  content: null,
  file: null,
});
const formValid = reactive({
  content: false,
  file: false,
});
const reset = ref(false);
const loading = ref(false);
const isValid = computed(() => {
  return formValid.content && (!form.file || (form.file && formValid.file));
});
function handleSubmit() {
  loading.value = true;
  return ticketStore
    .replyTicket({ ...form })
    .then(() => {
      reset.value = true;
      const t = setTimeout(() => {
        reset.value = false;
        clearTimeout(t);
      }, 100);
      form.content = null;
      form.file = null;
    })
    .finally(() => {
      loading.value = false;
    });
}
//
</script>
