<template>
  <div
    @click="handleClick"
    class="theme-checkbox is-grid is-cursor-pointer"
    style="grid-template-columns: 40px 1fr"
  >
    <span
      class="position-relative is-flex is-justify-content-center is-align-items-center"
      style="width: 15px"
    >
      <ThemeIcon
        color="#615f5f"
        class="fade-in position-absolute left-0 mx-0"
        size="17px"
      >
        circle
      </ThemeIcon>
      <template v-if="modelValue">
        <ThemeIcon
          color="#615f5f"
          class="svg-animation position-absolute mx-0"
          style="left: 3px"
          size="11px"
          stroke-width="3px"
          v-if="type === 'checkbox'"
        >
          check
        </ThemeIcon>
        <ThemeIcon
          v-else
          solid
          style="transform: scale(0.5)"
          color="#615f5f"
          class="fade-in position-absolute left-0 mx-0"
          size="17px"
        >
          circle
        </ThemeIcon>
      </template>
    </span>
    <label class="is-cursor-pointer">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  type?: "checkbox" | "radio";
  label?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
});
const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
}>();
function handleClick() {
  emit("update:modelValue", !props.modelValue);
}
</script>
