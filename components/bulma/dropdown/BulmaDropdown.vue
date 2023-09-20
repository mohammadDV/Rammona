<template>
  <div
    v-click-outside="handleClickoutside"
    :class="[
      'dropdown',
      showMenu && 'is-active',
      hover && 'is-hoverable',
      align === 'right' && 'is-right',
      position === 'top' && 'is-top',
    ]"
    ref="dropdown"
  >
    <div class="dropdown-trigger">
      <BulmaBtn @click="showMenu = true" class="button" v-bind="btnProps">
        <span class="mx-1"><slot /></span>
        <ThemeIcon size="13px" type="solid">{{
          `menu-${showMenu ? "up" : "down"}`
        }}</ThemeIcon>
      </BulmaBtn>
    </div>
    <div
      ref="dropdownMenu"
      class="dropdown-menu"
      id="dropdown-menu"
      :style="{
        width: width,
        minWidth: width,
      }"
    >
      <div class="dropdown-content" v-if="showMenu">
        <slot name="list" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean;
  position?: "top" | "bottom";
  align?: "left" | "right";
  btnProps?: object;
  width?: string;
}
const props = withDefaults(defineProps<Props>(), {
  hover: false,
  position: "bottom",
  align: "left",
  btnProps: { text: true },
  width: "140px",
});
//
const showMenu = ref(false);
interface HTMLElementClickoutside extends HTMLElement {
  clickOutsideEvent: (e: any) => void;
}
const vClickOutside = {
  beforeMount(el: HTMLElementClickoutside, binding: any) {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: HTMLElementClickoutside) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
function handleClickoutside() {
  showMenu.value = false;
}
//
const dropdownMenu = ref<HTMLElement>();
const dropMenuOverflowLeft = ref(false);
const dropMenuOverflowRight = ref(false);
watch(showMenu, (n) => {
  const eleInfo = dropdownMenu.value?.getBoundingClientRect();
  dropMenuOverflowLeft.value = eleInfo.left < 0;
  dropMenuOverflowRight.value = eleInfo.right < document.body.clientWidth;
});
const autoAlign = computed(() => {
  return dropMenuOverflowLeft
    ? "left"
    : dropMenuOverflowRight
    ? "right"
    : props.align;
});
//
const dropdown = ref<HTMLDivElement>();
onMounted(() => {
  if (props.hover) {
    dropdown.value?.addEventListener("mouseenter", () => {
      showMenu.value = true;
    });
    dropdown.value?.addEventListener("mouseleave", () => {
      showMenu.value = false;
    });
  }
});
</script>
