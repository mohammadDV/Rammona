<template>
    <div class="blog-first-part">
        <img class="blog-image" :src="article.file"/>
    </div>
    <div class="blog-second-part">
        <div class="first-head">
            <h4 class="title">
                <router-link :to="'/blog/' + article.id">{{ article.title }}</router-link>
            </h4>
        </div>
        <article>{{ article.summary }}</article>
        <div class="blog-third-part">
            <router-link :to="'/blog/' + article.id"  class="show-details">متن کامل را بخوانید</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    article: {
    type: Object,
    default: {}
  },
})


</script>

<style>

</style>