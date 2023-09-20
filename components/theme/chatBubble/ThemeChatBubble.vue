<template>
  <div
    :class="['talk-bubble tri-right round', `${type}`]"
    :style="{
      ...colors[type],
      '--talk-bubble-parent-background': `var(--${parentBg})`,
    }"
  >
    <div class="talktext">
      <span class="talk-bubble__creator" v-if="creator">{{ creator }}</span>
      <p class="talk-bubble__text">
        <slot />
      </p>
      <span class="talk-bubble__date" v-if="date">{{ date }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.sass";
interface Props {
  type?: "sender" | "receiver";
  parentBg?: "background" | "card";
  creator?: string;
  date?: string;
}
withDefaults(defineProps<Props>(), {
  type: "receiver",
  parentBg: "background",
});
const colors = computed(() => ({
  sender: {
    "--talk-bubble-bg": "#0B93F6",
    "--talk-bubble-color": "white",
  },
  receiver: {
    "--talk-bubble-bg": "#ddd",
    "--talk-bubble-color": "#000",
  },
}));
</script>
