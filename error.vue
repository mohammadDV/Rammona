<template>
  <div class="error">
    <div class="text-center">
      <img
        width="50%"
        :src="`/img/error/${
          String(error.statusCode) === '404' ? '404.svg' : 'error.svg'
        }`"
      />
      <p class="mt-5">{{ errorMessage }}</p>
      <h2 class="mt-5">{{ error.statusCode }}</h2>
      <BulmaBtn class="elevation-0 mt-5 font-iransans" @click="handleError">
        بازگشت به صفحه اصلی
      </BulmaBtn>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: `خطا ${useError().value.statusCode}`,
});
const props = defineProps({
  error: Object,
});
const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case "404":
      return "صفحه مورد نظر یافت نشد!";
    default:
      return props.error.message;
  }
});

const handleError = () => clearError({ redirect: "/" });
</script>
<style>
.error {
  font-family: IRANSansWeb_Medium !important;
  direction: rtl;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  background: white;
  font-size: x-large;
}
.error svg {
  max-width: 300px;
  max-height: 300px;
}
.error svg path {
  filter: drop-shadow(0px 0px 1px var(--secondary));
}
.error button {
  font-family: IRANSansWeb_Medium !important;
}
</style>