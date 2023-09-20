<template>
    <div class="blog">
      <main class="blog-container">
        <div class="blog-title">
          <h3>وبلاگ</h3>
          </div>
          <div class="blog-grid-container posts" >
              <div v-for="(article, key) in blogs" :key="key" :class="'b-box ' + changeBlogClass(key, article?.type)">
                <blogBox :article="article"> </blogBox>
              </div>
          </div>      
          <div class="show-more">
              <button class="more-btn" @click="loadMore" v-show="hasMore">نمایش بیشتر</button>
          </div>
      </main>
    </div>
  </template>
  <script setup lang="ts">
  import { useUserStore } from "~~/store/user";
  import { useArticleStore } from "~~/store/article";
  import { ref, onMounted } from 'vue';

import blogBox from "~/components/user/blog/BlogBox.vue";
  const { getFileUrl } = useFunctions();
  const userStore = useUserStore();

  const blogs = ref([]);
  const currentPage = ref(1);
  const hasMore = ref(true);


  const articleStore = useArticleStore();
  const loading = ref(true);
  const getBlogs = async () => {
    loading.value = true;
    try {
      await articleStore.getArticles().then(response => {

        if(response?.length < 1){
          hsaMore.value = false
        } 
        else {
          blogs.value = [
            ...blogs.value ,...response
          ]
        }   
      })
    } finally {
      loading.value = false;
    }
  }

  const loadMore = () => {
        currentPage.value += 1;
        getBlogs(currentPage.value);
      };
  
      onMounted(() => {
        getBlogs(currentPage.value);
      });
   
  function changeBlogClass(key, type = 1) {
        if (type == null || type == undefined) {
          type = 1;
        }
  
        var result = "grid-box-";
        if (key == 0) {
          type = 4;
          result = "head-post grid-box-";
        }
        
        return result + type;
      }
  //
  definePageMeta({
    layout: "user",
  });
  useHead({
    title: "بلاگ",
  });
  </script>
