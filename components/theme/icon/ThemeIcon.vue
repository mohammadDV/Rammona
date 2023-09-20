<template>
  <span
    class="icon"
    :style="`color:${
      color || 'var(--text-color)'
    };width:${iconSize};height:${iconSize}`"
  >
    <template v-if="icon">
      <KeepAlive>
        <component
          :class="[
            !!className && className,
            slot.default
              ? camelToDashCase(String(slot.default()[0].children).trim())
              : '',
          ]"
          style="width: inherit; height: inherit"
          :is="icon"
        />
      </KeepAlive>
    </template>
  </span>
</template>
<script setup lang="ts">
import "./index.sass";
import icons from "./icons";

interface Props {
  size?: string | number;
  color?: string | null;
  small?: boolean;
  xSmall?: boolean;
  type?: "solid" | "outline";
  solid?: boolean;
  strokeWidth?: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  color: null,
  size: "20px",
  small: false,
  xSmall: false,
  type: "outline",
  solid: false,
  strokeWidth: null,
});
const slot = useSlots();
const iconName = computed<string>(() =>
  slot.default ? (slot.default()[0].children as string).trim() ?? "" : ""
);
const toCamelCase = (t: string) => {
  return t
    .trim()
    .split("-")
    .map((i) => i.replace(/^\w/, (c) => c.toUpperCase()))
    .join("");
};
const className = computed(() => {
  if (iconName.value.includes("right")) return "rotate-90";
  else if (iconName.value.includes("left")) return "rotate-270";
  else if (iconName.value.includes("down")) return "rotate-180";
});
const text = computed(() => {
  if (iconName.value) {
    const i = iconName.value.replace(
      /-right|-left|-down|-up|/g,
      ""
    ) as keyof typeof icons;
    return icons[i];
  }
  return null;
});
const icon = computed(() => {
  const color = props.color ?? "text-color";
  if (!!text) {
    const s = +(iconSize.value as string).replace("px", "");
    const c = color.includes("#") ? color : `var(--${color})`;
    return h("svg", {
      style: {
        strokeWidth: props.strokeWidth ? props.strokeWidth : "2px",
        color: c,
      },
      fill: props.type === "outline" && !props.solid ? "none" : c,
      xmlns: "http://www.w3.org/2000/svg",
      // class: "mb-n2",
      viewBox: `0 0 24 24`,
      innerHTML: text.value,
      stroke: "currentColor",
    });
  }
});

const iconSize = computed(() => {
  if (props.small) return "20px";
  else if (props.xSmall) return "15px";
  else if (props.size) {
    if (!Number(props.size)) {
      if (props.size === "x-small") return "15px";
      else if (props.size === "small") return "20px";
      return props.size;
    } else return `${props.size}px`;
  }
  return "10px";
});
const camelToDashCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
</script>
