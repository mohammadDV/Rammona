<template>
    <div class="coments">
         <div class="coment-grid">
             <h4>ثبت نظر</h4>
             <p>
                 لطفا نظرات خود را برای ما ارسال نمایید
             </p>
             <form id="contactForm" @submit.prevent="submitComment()">
                 <div class="flex-input">
                     <div class="coment-name">
                         <input v-model="userName" name="name" id="name" title=""  class="input_txt" type="text" placeholder="نام">
                     </div>
                     <div class="coment-emali">
                         <input v-model="userEmail" name="email" id="email" title="" class="input_txt " type="email" placeholder="ایمیل">
                     </div>
                 </div>
                 <div class="coment-text">
                     <textarea v-model="userComments" name="comment" id="comment" title="" class=" " cols="5" rows="10" placeholder="متن پیام"></textarea>
                 </div>
                 <div class="comment-btn">
                     <button  class=" subscribe">ثبت نظر</button>
                 </div>
             </form>
             <div v-if="errorMessage" class="blog-comment-suc-msg">  {{ errorMessage }} </div>
             <div v-if="successMessage" class="blog-comment-suc-msg">  {{ successMessage }} </div>
         </div>
     </div> 
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
import { useCommentStore } from "../../../../store/comment";
useHead({ title: "پیام" });
 
 const commentStore = useCommentStore();

 console.log("saxasxasxas");
 console.log(commentStore.comments);
 
 const userName = ref('');
 const userEmail = ref('');
 const userComments = ref('');
 const errorMessage = ref('')
 const successMessage= ref('');

 const form = reactive({
           comment: userComments,
           name: userName, 
           email: userEmail,
         });
 
 function submitComment(){
     if (userComments.value.length < 5) {
         errorMessage.value = "لطفا نظر خود را به صورت کامل بنویسید."; 
     }
     if (userEmail.value.length < 5) {
         errorMessage.value = "لطفا ایمیل خود را به صورت کامل بنویسید."; 
     }
     if (userName.value.length < 2) {
         errorMessage.value = "لطفا نام خود را به صورت کامل بنویسید."; 
     }
 
     if(errorMessage.value.length == 0){
         errorMessage.value = ''
         
 
      setTimeout(() => {
           successMessage.value = '';
         }, 3000);
 
     }    
     else {
         setTimeout(() => {
           errorMessage.value = '';
         }, 3000);
 
     }
 }
 
  
 </script>
 