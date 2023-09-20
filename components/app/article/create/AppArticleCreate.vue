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
        name="summary"
        v-model="form.summary"
        v-model:valid="formValid.summary"
        :reset="reset"
        :validation="{ required: true }"
        :placeholder="$t('table.summary')"
        inputType="textarea"
      />
    </div>
    <div class="mb-5">
      <ThemeAutocomplete
        :items="createSelectList(types)"
        v-model="form.type"
        :label="`* ${$t('table.type')}`"
        name="type"
      />
    </div>
    <div class="mb-5">
      <ContentEditor 
        v-model="form.content"
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
        {{ $t("action.submit") }} {{ $t("apps.article") }}
      </BulmaBtn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useArticleStore } from "~~/store/article";
import ContentEditor from "../../../bulma/editors/ContentEditor.vue"
const emit = defineEmits<{
  (e: "success"): void;
}>();
const articleStore = useArticleStore();

// select lists
const { createSelectList } = useFunctions();
//
const form = reactive({
  title: "",
  summary: "",
  content: "",
  type: "1",
  file: null,
});

const types = [
  "1",
  "2",
  "3",
  "4"
];

const formValid = reactive({
  title: false,
  file: false,
});
const reset = ref(false);
const loading = ref(false);
const isValid = computed(() => {
  return (
    formValid.title &&
    formValid.summary &&
    (form.file && formValid.file)
  );
});
function handleSubmit() {
  loading.value = true;
  articleStore
    .storeArticle({ ...form })
    .then(() => {
      // emit("success");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
