<template>
  <div
    ref="div"
    :class="[validScreen === 'mobile' ? 'd-desktop-none' : 'd-mobile-none']"
    v-if="show"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    validScreen?: "mobile" | "desktop";
  }>(),
  {
    validScreen: "mobile",
  }
);

const div = ref<HTMLDivElement>();
const sm = ref(900);
const { width, height } = useWindowSize();
const show = computed(() => {
  if (props.validScreen === "desktop") {
    return width.value >= sm.value;
  } else {
    return width.value < sm.value;
  }
});
onMounted(() => {
  nextTick(() => {
    sm.value = Number(
      getComputedStyle(document.body).getPropertyValue("--sm").replace("px", "")
    );
  });
});
</script>
