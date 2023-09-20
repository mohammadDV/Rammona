<template>
  <img
    v-bind="$attrs"
    loading="lazy"
    ref="img"
    class="custom-img"
    :width="width?.replace('px', '')"
    :height="height?.replace('px', '')"
  />
</template>
<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>
<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
  width?: string;
  height?: string;
}>();
const { getFileUrl } = useFunctions();
const img = ref<HTMLImageElement>();
const lazyload = () => {
  if (img.value) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            let src = props.src;
            if (!src.includes("http")) src = getFileUrl(props.src);
            if (img.value) {
              img.value.src = src;
              img.value.classList.add("fade-in");
            }
          }, 0);
          observer.disconnect();
        }
      });
    });
    io.observe(img.value);
  } else {
    console.log("ThemeImg: DOM is not loaded yet");
  }
};
onMounted(() => {
  lazyload();
});
</script>
