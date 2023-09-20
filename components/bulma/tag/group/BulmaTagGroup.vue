<template>
  <div class="field is-grouped is-grouped-multiline">
    <div
      class="control mx-1 is-cursor-pointer no-select"
      v-for="(item, id) in list"
      :key="id"
      @click="handleClick(item)"
    >
      <div class="tags has-addons">
        <span :class="['tag', color && `is-${color}`, light && 'is-light']">
          {{ item[title] }}
        </span>
        <a class="tag position-relative">
          <BulmaCheckbox :type="type" :model-value="isChecked(item)" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Color =
  | "black"
  | "dark"
  | "light"
  | "white"
  | "primary"
  | "link"
  | "info"
  | "success"
  | "danger";
type Size = "normal" | "medium" | "large";
interface Item {
  title: string;
  value: string;
  [key: string]: string;
}
interface Props {
  modelValue?: any;
  list: Item[];
  color?: Color;
  light?: boolean;
  size?: Size;
  rounded?: boolean;
  title?: string;
  value?: string;
  single?: boolean;
  type?: "checkbox" | "radio";
}
const props = withDefaults(defineProps<Props>(), {
  light: false,
  color: "light",
  size: "normal",
  isDelete: false,
  rounded: false,
  hasAddons: false,
  title: "title",
  value: "value",
  single: true,
  type: "checkbox",
});
const emit = defineEmits<{
  (event: "update:modelValue", val: string[] | string): void;
}>();
function handleClick(item: Item) {
  if (props.single) {
    emit("update:modelValue", item.value);
  } else {
    let data = [...props.modelValue];
    if (data.includes(item[props.value])) {
      data = data.filter((i) => i !== item[props.value]);
    } else data = [item[props.value], ...data];
    emit("update:modelValue", data);
  }
}
//
const slot = useSlots();
//
function isChecked(item: Item) {
  if (!props.modelValue) return false;
  return props.single
    ? props.modelValue === item[props.value]
    : props.modelValue.includes(item[props.value]);
}
</script>
