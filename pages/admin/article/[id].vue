<template>
  <div>
    <template v-if="loading">
      <ThemeSkeletonLoading height="200px" />
      <ThemeSkeletonLoading height="200px" class="mt-gap" />
    </template>
    <div v-else>
      <BulmaCard v-if="articleStore.article" class="p-gap mb-gap">
        <h2>
          <span class="opacity-50 font-sm mx-4">
            {{ $t("table.title") }} {{ $t("apps.article") }}
          </span>
          {{ articleStore.article.title }}
        </h2>
      </BulmaCard>
        <BulmaCard v-if="articleStore.article" class="p-gap mb-gap">
          <form @submit.prevent="handleSubmit">
            <div class="mb-5 mt-3">
              <ThemeInput
                name="title"
                v-model="form.title"
                v-model:valid="formValid.title"
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
              <ContentEditor v-model="form.content"></ContentEditor>
            </div>
            <div>
              <img v-if="articleStore?.article?.file?.length > 0" class="image-thumbnail" :src="articleStore.article.file" alt="">
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
      </BulmaCard>
    </div>
  </div>
</template>


<style>
.image-thumbnail {
    padding: 0.25rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    max-width: 200px;
    height: auto;
}

</style>

<script setup lang="ts">
import { useArticleStore } from "~~/store/article";
import ContentEditor from "../../../components/bulma/editors/ContentEditor.vue"
const articleStore = useArticleStore();
const route = useRoute();
const loading = ref(true);

// select lists
const { createSelectList } = useFunctions();

const formValid = reactive({
  title: false,
  summary: false,
  file: false,
});

const types = [
  "1",
  "2",
  "3",
  "4"
];

const form = reactive({
  title: "",
  content: "",
  summary: "",
  type: "1",
  file: null,
});

const isValid = computed(() => {
  return true
});


onMounted(() => {
  articleStore.getArticle().then((response) => {
    form.title = response.title;
    form.summary = response.summary;
    form.content = response.content;
    form.type = response.type;
    loading.value = false;
  });
});

const title = computed(() => `مقاله - ${route.params.id}`);
useHead({ title: title });

function handleSubmit() {
  loading.value = true;
  articleStore
    .updateArticle(route.params.id ,{ ...form })
    .then(() => {
      navigateTo("/admin/article");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
