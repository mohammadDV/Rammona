<template>
  <Teleport to="body">
    <div :class="['modal', activeClass && activeClass]">
      <div
        class="modal-background"
        @click="emit('update:modelValue', false)"
      ></div>
      <div class="modal-content" :style="{ height, width }">
        <button
          @click="emit('update:modelValue', false)"
          class="modal-close"
          aria-label="close"
        ></button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import "./index.sass";
interface Props {
  modelValue: boolean;
  height?: string;
  width?: string;
}
const props = withDefaults(defineProps<Props>(), {
  height: "auto",
  width: "fit-content",
});
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
//
const activeClass = ref<string | null>(null);
function handleTimeout(cb: () => void) {
  const timeout = setTimeout(() => {
    cb();
    clearTimeout(timeout);
  }, 500);
}
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      activeClass.value = "is-active opacity-0";
      handleTimeout(() => {
        activeClass.value = "is-active";
      });
    } else {
      activeClass.value = "is-active opacity-0";
      handleTimeout(() => {
        activeClass.value = null;
      });
    }
  }
);
</script>
