<template>
  <BulmaCard width="300px" class="is-rounded">
    <h3
      :class="`py-3 has-text-centered has-background-danger is-rounded is-rounded-b-0`"
    >
      <ThemeIcon size="50px" color="white">warningTriangle</ThemeIcon>
    </h3>
    <p class="has-text-align-auto px-3 py-5">
      آیا میخواهید {{ title }} مورد نظر را حذف کنید؟
    </p>
    <div class="action py-4 is-flex is-justify-content-center">
      <BulmaBtn color="success" :loading="loading" @click="handleDelete()">
        {{ $t(`action.accept`) }}
      </BulmaBtn>
      <BulmaBtn text color="secondary" class="mx-1" @click="emit('close')">
        {{ $t("action.close") }}
      </BulmaBtn>
    </div>
  </BulmaCard>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  id: number;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "delete", id: number): void;
}>();
const loading = ref(false);
function handleDelete() {
  loading.value = true;
  emit("delete", props.id);
}
</script>
