<template>
  <div class="countdown">
    <span
      class="my-3"
      :style="{ color: remainedTime < 10 ? 'var(--error)' : undefined }"
      dir="ltr"
      >{{ timer }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  timeLimit: string | number;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "timeover"): void;
}>();
const timer = ref("- - : - - : - -");
function checkTime(time: number) {
  return String(time).length === 1 ? `0${time}` : time;
}
const remainedTime = ref(0);
onMounted(() => {
  remainedTime.value = Number(props.timeLimit);
  // Update the count down every 1 second
  const x = setInterval(() => {
    var days = Math.floor(remainedTime.value / (60 * 60 * 24)),
      hours = Math.floor((remainedTime.value % (60 * 60 * 24)) / (60 * 60)),
      minutes = Math.floor((remainedTime.value % (60 * 60)) / 60),
      seconds = Math.floor(remainedTime.value % 60);

    // Output the result in an element with id="demo"
    timer.value = `${checkTime(hours)}:${checkTime(minutes)}:${checkTime(
      seconds
    )}`;
    --remainedTime.value;
    // If the count down is over, write some text
    if (remainedTime.value < 0) {
      clearInterval(x);
      timer.value = "- - : - - : - -";
      emit("timeover");
    }
  }, 1000);
});
</script>
