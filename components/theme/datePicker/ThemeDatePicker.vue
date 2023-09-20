<template>
  <div class="date-picker">
    <ThemeInput
      :model-value="toDateLabel(modelValue)"
      input-class="date-picker__input"
      name="date-picker"
      :validation="{}"
      :placeholder="placeholder"
      :label="label"
      @click="show = true"
    />
    <ClientOnly>
      <Vue3PersianDatetimePicker
        :show="show"
        :color="color"
        :model-value="modelValue"
        @update:modelValue="handleUpdate"
        format="YYYY-MM-DD"
        display-format="jDD jMMMM jYYYY"
        custom-input=".date-picker__input"
      />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: any;
  color?: string;
  label?: string;
  placeholder?: string;
}
withDefaults(defineProps<Props>(), {
  color: "var(--primary)",
});
const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
function handleUpdate(e: string) {
  emit("update:modelValue", e);
}
const show = ref(false);
const date = ref(null);
const { toDateLabel } = useMomentJalaali();
</script>
