<template>
  <BulmaCard class="create-product p-gap dir-auto w-inherit">
    <h1 class="pr-5">{{ $t("action.create") }} {{ $t("apps.product") }}</h1>
    <hr class="mt-gap mb-5" />
    <form @submit.prevent="handleSubmit" class="form">
      <div class="input-container">
        <ThemeInput v-model="form.name" :label="$t('table.title')" name="title" />
      </div>
      <div class="input-container">
        <ThemeInput
          v-model="form.capacity"
          :label="$t('table.capacity')"
          name="capacity"
        />
      </div>
      <div class="input-container">
        <ThemeAutocomplete
          v-model="form.capacity_currency"
          :items="createSelectList(PRODUCT_CAPACITIES)"
          :label="$t('table.capacity_currency')"
        />
      </div>
      <div class="action">
        <BulmaBtn block color="success" type="submit">
          {{ $t("action.create") }} {{ $t("apps.product") }}
        </BulmaBtn>
      </div>
    </form>
  </BulmaCard>
</template>
<script setup lang="ts">
import { PRODUCT_CAPACITIES } from "~~/const";
import { useProjectStore } from "~~/store/project";
import { ProductModel } from "~~/types";
const projectStore = useProjectStore();
//
const emit = defineEmits<{
  (e: "submit", data: ProductModel): void;
}>();
const { createSelectList } = useFunctions();
//
const form = reactive({
  name: "",
  capacity: "",
  capacity_currency: "",
});
const loading = ref(false);
const route = useRoute();
function handleSubmit() {
  loading.value = true;
  const nForm = { ...form };
  if (route.params.id) {
    Object.assign(nForm, { project: route.params.id });
  }
  projectStore
    .createProduct(nForm)
    .then((product) => {
      emit("submit", product);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
