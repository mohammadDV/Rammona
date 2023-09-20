<template>
  <div
    :style="{
      height,
    }"
    class="list-selection overflow-y-auto px-2"
  >
    <div
      class="list-selection__item"
      @click="handleClick(item)"
      v-for="(item, id) in list"
      :key="id"
    >
      <slot name="item" :data="item" />
      <BulmaCheckbox
        class="checkbox"
        :modelValue="
          multi ? modelValue.includes(item[value]) : modelValue === item[value]
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import "./index.sass";
type Item = {
  [key: string]: [value: any];
};
interface Props {
  modelValue: any;
  list: Item[];
  height?: string;
  title?: string;
  value?: string;
  multi?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  height: "100px",
  title: "title",
  value: "value",
  multi: false,
});
const emit = defineEmits<{
  (event: "update:modelValue", val: string[]): void;
}>();
//
function handleClick(item: Item) {
  if (props.multi) {
    let data = [...props.modelValue];
    if (data.includes(item[props.value]))
      data = data.filter((i) => i !== item[props.value]);
    else data = [item[props.value], ...data];
    emit("update:modelValue", data);
  } else {
    emit("update:modelValue", item[props.value]);
  }
}
</script>
