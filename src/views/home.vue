<template>
  <div class="blog-box">
    <blogList @selectBlog="selectBlog" />
    <div class="blog-right">
      <classification @selectBlog="selectBlog" />
      <blogLabel @selectBlog="selectBlog" />
    </div>
  </div>
</template>

<script setup lang="ts">
import blogList from '@/components/home/blogList.vue'
import classification from '@/components/home/classification.vue'
import blogLabel from '@/components/home/blogLabel.vue'
function selectBlog(classType?: string, label?: string) {
  console.log(classType)
  console.log(label)
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}

.item {
  position: absolute;
  transition: all 0.3s;
}

.item:hover {
  transform: scale(1.2);
}

.blog-box {
  height: 100%;
  display: flex;
  justify-content: center;
  .blog-right {
    flex-direction: column;
    width: 20%;
    padding: 0 20px;
    right: 30px;
  }
}
</style>
