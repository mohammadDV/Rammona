<template>
    <div>
        <template v-if="loading">
            <ThemeSkeletonLoading height="200px" />
            <ThemeSkeletonLoading height="200px" class="mt-gap" />
        </template>
        <main v-else class="blog-details-container">
        <div class="blog-details-flex">
            <aside id="side" class="blog-side-bar">
                <div class="popular-blog-box">
                    <h4>مقالات محبوب</h4>
                    <div class="popular-blog">
                        <PopularBlog :article="article"></PopularBlog>
                    </div>           
                </div>       
            </aside>
            <div class="blog-part">
                <section>
                    <h1 class="blog-h1-title">  
                        {{ articleStore.article.title }}
                    </h1>
                    <div class="author-date">
                        <span> {{ articleStore.article.create_date }}</span>
                    </div>
                    <article class="description">
                        <div v-html="articleStore.article.summary">
                        </div>
                    </article>
                    <img :src="articleStore.article.file" alt="">
                </section>
                <article class="description">
                        <div v-html="articleStore.article.content">
                        </div>
                    </article>
                <section>
                    <div class="related-post">
                        <div class="headline">
                            <h3>مقالات مرتبط</h3></div>
                        <div class="post-list">
                            <div v-for="(article, key) in relatedPosts" :key="key" class="b-box grid-box-1 ">
                                <BlogBox :article="article"> </BlogBox>
                            </div>                   
                        </div>
                    </div>
                </section>             
            </div>            
        </div> 
        <section>
            <CommentBlog />
        </section>  
    </main>
    </div>
  </template>
  <script setup lang="ts">
 
import { useUserStore } from "~~/store/user";
import { ref, onMounted } from 'vue';

import BlogBox from "~/components/user/blog/BlogBox.vue";
import PopularBlog from "~/components/user/blog/PopularBlog.vue";
import CommentBlog from "~/components/user/blog/CommentBlog.vue";
import { useArticleStore } from "~~/store/article";

const { getFileUrl } = useFunctions();
const userStore = useUserStore();
const route = useRoute();
const loading = ref(true);
const relatedPosts = ref([]);

const articleStore = useArticleStore();

    // Get the article 
    await articleStore.getArticle().then(response => {
        loading.value = false;
    })

    // Get the related article 
    await articleStore.getRelatedArticles().then(response => {
        relatedPosts.value = response;
        if(relatedPosts.value.length > 3){
            relatedPosts.value = relatedPosts.value.slice(0,3)
        }
    })

    // Handle sticky blogs
    const leftPart = document.querySelector('.blog-side-bar');

    window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop >  300) {
        const elementById = document.getElementById('side');
        elementById.classList.add('fixed');
    }
});
  


  definePageMeta({
    layout: "user",
  });
  useHead({
    title: "بلاگ",
  });
  </script>
  