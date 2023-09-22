<template>
  <BulmaCard>
    <BulmaTable
      :loading="loading"
      :headers="headers"
      :length="articleStore?.articles?.length"
    >
      <tr
        v-for="item in articleStore.articles"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td
          class="px-3"
          style="
            max-width: 200px;
            width: 200px;
            overflow: hidden;
            white-space: break-spaces;
          "
        >
          {{ item.summary }}
        </td>
        <td>
          <a v-if="item.file" :href="getFileUrl(item.file)" target="_blank">
            دانلود فایل
          </a>
          <ThemeIcon v-else size="30px" color="red">empty</ThemeIcon>
        </td>
        <td>{{ item.type }}</td>
        <td>{{ item.article_view }}</td>
        <td class="date">
          {{ item.update_date ? toDate(item.update_date) : toDate(item.create_date) }}
        </td>
        <td>
          <BulmaBtn class="ml-2"
            color="info"
            :to="`/admin/comment/${item.id}`"
            :title="$t('apps.comment_list')"
          >
            <ThemeIcon color="white">map</ThemeIcon>
          </BulmaBtn>
          <BulmaBtn class="ml-2"
            color="success"
            :to="`/admin/article/${item.id}`"
            :title="$t('action.edit')"
          >
            <ThemeIcon color="white">edit</ThemeIcon>
          </BulmaBtn>
          <BulmaBtn
            color="danger"
            :title="$t('action.delete')"
            @click="handleDelete(item.id)"
          >
            <ThemeIcon color="white">delete</ThemeIcon>
          </BulmaBtn>
        </td>
      </tr>
    </BulmaTable>
    <slot />
  </BulmaCard>
</template>

<script setup lang="ts">
  import { useArticleStore } from "~~/store/article";
  const { getFileUrl } = useFunctions();
  const { toDate } = useMomentJalaali();
  const headers = [
    "id",
    "title",
    "summary",
    "file",
    "type",
    "view",
    "date",
    "action",
  ];
  //
  interface Props {
    loading: boolean;
  }
  defineProps<Props>();

  const articleStore = useArticleStore();

  function handleDelete(id: number) {

    if(confirm("بعد از حذف, این مقاله دیگر در دسترس نخواهد بود. مطمئن هستید؟")){
      articleStore.removeArticle(id).finally(() => {
      }).finally(() => {
        articleStore.getArticles();
      });
    }

    
  }

</script>
