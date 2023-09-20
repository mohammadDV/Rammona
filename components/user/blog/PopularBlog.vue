<template>
    <ul class="pop-posts">
        <li v-for="(article, key) in posts" :key="key" >
            <div class="thumb">
                <a href=""><img alt="" :src="article.file"></a>
            </div>
            <div class="text">
                <router-link :to="'/blog/' + article.id"  >{{ article.title }}</router-link>

                <i>{{ article.create_date }}</i>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/store/user";
import { ref, onMounted } from 'vue';

import { useArticleStore } from "~~/store/article";

const posts = ref([]);

const articleStore = useArticleStore();
    try {
        await articleStore.getPopularArticles().then(response => {
          posts.value = response;
            if(posts.value.length > 5){
              posts.value = posts.value.slice(0,5)
            }
        })
    } finally {

    }


definePageMeta({
  layout: "user",
});
useHead({
  title: "بلاگ",
});
</script>


<style>

</style>