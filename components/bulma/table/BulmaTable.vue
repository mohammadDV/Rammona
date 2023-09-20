<template>
  <div :style="{ height, overflowY }" class="position-relative">
    <Transition mode="out-in">
      <template v-if="!loading">
        <table v-if="length > 0" class="table font-sm" style="width: 100%">
          <thead
            :style="
              fixedHeader
                ? 'position: sticky; top: 0; background: var(--card);z-index:1'
                : ''
            "
          >
            <tr>
              <th class="no-wrap" v-for="item in headers" :key="item">
                {{ $t(`table.${item}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <slot />
          </tbody>
        </table>
        <div class="empty-table" v-else>
          <div
            class="empty-table__header px-3 py-3 border-y"
            v-if="headers.length > 0"
          >
            <span
              v-for="item in headers"
              :key="item"
              class="empty-table__header_item"
              >{{ $t(`table.${item}`) }}
            </span>
          </div>
          <div class="empty-table__body" style="height: 200px">
            <div class="has-text-centered">
              <ThemeIcon stroke-width="1px" size="50px">empty</ThemeIcon>
              <p>
                {{ $t("table.empty") }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <div v-else>
        <div class="is-flex is-justify-content-space-around px-3 py-3 border-y">
          <span v-for="item in headers" :key="item" class="font-sm">{{
            $t(`table.${item}`)
          }}</span>
        </div>
        <ThemeSkeletonTableLoading :rows="10" />
      </div>
    </Transition>
    <ThemePagination
      v-if="pageLimit && length > 0"
      :limit="pageLimit"
      @change="(page:number) => emit('fetchData',page)"
    />
  </div>
</template>

<script setup lang="ts">
import "./index.sass";
interface Props {
  headers: string[];
  fixedHeader?: boolean;
  height?: string;
  loading?: boolean;
  length: number;
  pageLimit?: number;
  overflowY?: "auto" | "hidden";
}
withDefaults(defineProps<Props>(), {
  fixedHeader: true,
  height: "auto",
  loading: false,
  overflowY: "auto",
});
const emit = defineEmits<{
  (e: "fetchData", page: number): void;
}>();
</script>
