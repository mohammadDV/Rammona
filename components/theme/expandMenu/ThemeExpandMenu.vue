<template>
  <div class="menu">
    <BulmaBtn
      v-bind="btnProps"
      @click="handleClick"
      :class="['menu-btn', (active || modelValue) && 'active']"
    >
      <div class="is-flex is-align-items-center">
        <ThemeIcon v-if="icon" size="20px">
          {{ icon }}
        </ThemeIcon>
        <span class="mx-4 menu-title">
          {{ title }}
        </span>
        <slot name="btn" />
        <ThemeIcon solid class="down-icon" v-if="icon" size="14px">
          menu-down
        </ThemeIcon>
      </div>
    </BulmaBtn>
    <Transition
      @beforeEnter="beforeEnter"
      @enter="onEnter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @afterLeave="afterLeave"
    >
      <ul v-if="active || modelValue" class="menu__ul">
        <slot />
      </ul>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import "./index.sass";
interface Props {
  btnProps?: object;
  title: string;
  icon?: string;
  modelValue?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  btnProps: undefined,
  modelValue: undefined,
});
const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
}>();
const active = ref(false);
function handleClick() {
  if (props.modelValue === undefined) {
    active.value = !active.value;
  } else {
    emit("update:modelValue", !props.modelValue);
  }
}
// transition functions
function beforeEnter(el: HTMLElement) {
  el.classList.remove("collapse");
  el.style.display = "block";
}
function onEnter(el: HTMLElement, done: () => void) {
  el.classList.add("collapsing");
  el.style.height = `${el.scrollHeight}px`;
}
function afterEnter(el: HTMLElement) {
  el.classList.remove("collapsing");
  el.classList.add("collapse", "in");
}
function beforeLeave(el: HTMLElement) {
  el.classList.add("collapsing");
  el.classList.remove("collapse", "in");
  el.style.height = "0px";
}
function afterLeave(el: HTMLElement) {
  el.classList.remove("collapsing");
  el.classList.add("collapse");
  el.style.display = "none";
}
</script>
