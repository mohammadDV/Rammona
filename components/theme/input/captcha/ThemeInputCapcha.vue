<template>
  <div class="my-gap captcha-input">
    <ThemeInput
      :model-value="modelValue"
      @update:modelValue="(e:any) => emit('update:modelValue', e)"
      :validation="{ required: true }"
      :reset="reset"
      name="captcha_value"
      :readonly="!capcha"
    />
    <ThemeIcon @click="emit('refresh')">refresh</ThemeIcon>
    <img
      v-if="capcha"
      width="100"
      height="100"
      :src="`data:image/png;base64, ${capcha}`"
      alt="captcha"
    />
    <ThemeSkeletonLoading v-else />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  modelValue: string | null;
  capcha?: string;
  reset: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "refresh"): void;
}>();
</script>
