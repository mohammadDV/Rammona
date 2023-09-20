<template>
  <button
    :type="type"
    ref="btn"
    :class="[
      !isCloseBtn && 'button',
      color && `is-${color}`,
      light && `is-light`,
      size && `is-${size}`,
      loading && `is-loading`,
      outlined && `is-outlined`,
      (inverted || text) && `is-inverted`,
      isCloseBtn && 'delete',
      block && 'is-fullwidth',
      'is-responsive',
      rounded && 'is-btn-rounded',
    ]"
    :style="{
      background: inverted || text ? 'transparent' : '',
      width,
      height,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import "./index.sass";
type BtnSize = "small" | "normal" | "medium" | "large";
type Colors =
  | "white"
  | "light"
  | "dark"
  | "black"
  | "text"
  | "ghost"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger";
interface Props {
  size?: BtnSize;
  color?: Colors | string;
  light?: boolean;
  isCloseBtn?: boolean;
  outlined?: boolean;
  text?: boolean;
  inverted?: boolean;
  rounded?: boolean;
  loading?: boolean;
  block?: boolean;
  to?: string | null;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: "normal",
  color: "primary",
  light: false,
  isCloseBtn: false,
  outlined: false,
  text: false,
  inverted: false,
  rounded: false,
  loading: false,
  block: false,
  to: null,
  type: "button",
});
const slot = useSlots();
// props.to handling
const btn = ref<HTMLElement>();
onMounted(() => {
  if (props.to && btn.value) {
    btn.value.addEventListener("click", () => {
      navigateTo(props.to);
    });
  }
});
</script>
