<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-5 mt-3">
      <ThemeInput
        name="title"
        v-model="form.title"
        v-model:valid="formValid.title"
        :reset="reset"
        :validation="{ required: true }"
        :label="$t('table.title')"
      />
    </div>
    <div class="mb-5">
      <ThemeInput
        name="content"
        v-model="form.content"
        v-model:valid="formValid.content"
        :reset="reset"
        :validation="{ required: true }"
        :placeholder="$t('table.content')"
        inputType="textarea"
      />
    </div>
    <div class="mb-5">
      <ThemeAutocomplete
        :label="$t('table.category')"
        clearable
        v-model="form.category"
        :items="categories"
      />
    </div>
    <div class="mb-5">
      <ThemeAutocomplete
        :label="$t('table.receiver')"
        clearable
        v-model="form.receiver"
        :items="receiversList"
        multiChoice
      />
    </div>
    <div class="mb-5">
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
        {{ $t("action.send") }} {{ $t("apps.ticket") }}
      </BulmaBtn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useTicketStore } from "~~/store/ticket";
import { UserModel } from "~~/types/auth";
const emit = defineEmits<{
  (e: "success"): void;
}>();
const ticketStore = useTicketStore();
//
const categories = computed(() => {
  const d = ["پروژه", "مالی"];
  return d.map((i) => ({ title: i, value: i }));
});
//
const receivers = ref<UserModel[]>([]);
const receiversList = computed(() => {
  return receivers.value.map((i) => ({
    title: i.first_name ? `${i.first_name} ${i.last_name}` : i.username,
    value: i.id,
  }));
});
const form = reactive({
  title: "",
  content: "",
  category: null,
  file: null,
  receiver: [],
});
const formValid = reactive({
  title: false,
  content: false,
  file: false,
});
const reset = ref(false);
const loading = ref(false);
const isValid = computed(() => {
  return (
    formValid.content &&
    formValid.title &&
    form.category &&
    form.receiver &&
    (!form.file || (form.file && formValid.file))
  );
});
function handleSubmit() {
  loading.value = true;
  ticketStore
    .sendTicket({ ...form })
    .then(() => {
      emit("success");
    })
    .finally(() => {
      loading.value = false;
    });
}
//
onMounted(() => {
  ticketStore.sendTicketInit().then((data) => {
    receivers.value = data;
  });
});
</script>
