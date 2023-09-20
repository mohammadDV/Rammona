<template>
  <BulmaCard>
    <BulmaTable
      :loading="loading"
      :headers="headers"
      :length="commentStore?.comments?.length"
    >
      <tr
        v-for="item in commentStore.comments"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td><div
          class="px-3"
          style="
            max-width: 300px;
            width: 300px;
            max-height: 200px;
            overflow: auto;
            white-space: break-spaces;
          "
        >
          {{ item.content }}
        </div>
        </td>
        <td>
          {{ item.article_comment }}
        </td>
        <td class="date">
          {{ item.date ? toDate(item.date) : '' }}
        </td>
        <td>
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
  import { useCommentStore } from "~~/store/comment";
  const { getFileUrl } = useFunctions();
  const { toDate } = useMomentJalaali();
  const headers = [
    "id",
    "name",
    "email",
    "comment",
    "article_comment",
    "date",
    "action",
  ];
  //
  interface Props {
    loading: boolean;
  }
  defineProps<Props>();

  const commentStore = useCommentStore();

  function handleDelete(id: number) {

    if(confirm("بعد از حذف, این پیام دیگر در دسترس نخواهد بود. مطمئن هستید؟")){
      commentStore.removeComment(id).finally(() => {
      }).finally(() => {
        commentStore.getComments();
      });
    }

    
  }

</script>
