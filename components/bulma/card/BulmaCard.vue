<template>
  <div
    class="card fade-in"
    ref="card"
    :class="[
      theme === 'dark' ? 'theme-dark' : 'theme-light',
      'custom-card',
      color && !bgColor && `is-${color}`,
      to && `is-clickable`,
    ]"
    :style="[
      height && `height:${height}`,
      width && `width:${width}`,
      maxWidth && `max-width:${maxWidth}`,
      minWidth && `min-width:${minWidth}`,
      bgColor && `background-color:${bgColor}`,
    ]"
  >
    <BulmaProgressbar v-if="loading" class="position-absolute top-0" />
    <slot name="header" class="card-header"></slot>
    <slot name="image" class="card-image"></slot>
    <slot name="content" class="card-content"></slot>
    <slot />
    <slot name="footer" class="card-footer"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  height?: string | null;
  width?: string | null;
  maxWidth?: string | null;
  minWidth?: string | null;
  color?: string;
  bgColor?: string | null; // like #ddd
  shadow?: number | string | null;
  to?: string | null;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  height: null,
  width: null,
  maxWidth: null,
  minWidth: null,
  color: "card",
  shadow: null,
  bgColor: null,
  to: null,
  loading: false,
});
//
const { theme } = useThemeConfig();
// card
const card = ref<HTMLElement>();
onMounted(() => {
  if (props.to && card.value) {
    card.value.addEventListener("click", () => {
      navigateTo(props.to);
    });
  }
});
</script>
