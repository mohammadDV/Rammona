<template>
  <div class="pagination">
    <div class="pagination__list">
      <BulmaBtn
        title="قبلی"
        @click="handleClick(currentPage - 1)"
        color="secondary"
        :class="{ disabled: currentPage === 1 }"
        text
      >
        &laquo;
      </BulmaBtn>
      <template v-for="page in pageList" :key="page">
        <BulmaBtn
          @click="handleClick(page)"
          color="info"
          :text="currentPage !== page"
          >{{ page }}
        </BulmaBtn>
      </template>
      <BulmaBtn
        title="بعدی"
        color="secondary"
        @click="handleClick(currentPage + 1)"
        :class="{ disabled: currentPage === limit }"
        text
      >
        &raquo;
      </BulmaBtn>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.sass";
interface Props {
  limit: number;
}
const props = withDefaults(defineProps<Props>(), {});
const route = useRoute();
const currentPage = computed(() => {
  return Number(route.query.page) || 1;
});
const pageList = computed(() => {
  if (props.limit === 1) {
    return [1];
  } else if (currentPage.value > 1 && currentPage.value < props.limit) {
    return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
  } else if (currentPage.value === 1 && props.limit > 2) {
    return [1, 2, 3];
  } else if (props.limit === 2) {
    return [1, 2];
  } else if (currentPage.value === props.limit) {
    return [currentPage.value - 1, currentPage.value];
  }
  return [1];
});
//
const emit = defineEmits<{
  (e: "change", page: number): void;
}>();
const router = useRouter();
function handleClick(page: number) {
  if (page > props.limit || page < 1) {
    return;
  }
  const query = { ...route.query };
  if (page !== Number(query.page)) {
    navigateTo({ query: { ...query, page } });
    const t = setTimeout(() => {
      emit("change", Number(page));
      clearTimeout(t);
    }, 0);
  }
}
//
// watch(
//   () => route.query.page,
//   () => {
//     if (route.query.page) {

//     }
//   }
// );
</script>
