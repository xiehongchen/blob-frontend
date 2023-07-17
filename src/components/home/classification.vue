<template>
  <div class="blog-classification">
    <div class="class-title">分类</div>
    <div class="class-box">
      <div
        class="class-item"
        v-for="item in classList"
        @click="clickClass(item.title)"
        :key="item.id"
      >
        <div class="class-img">
          <img src="@/assets/vue.svg" />
        </div>
        <div class="class-name">
          {{ item.title }}
        </div>
        <div class="class-num">
          {{ item.number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
const emit = defineEmits(['selectBlog'])
const classList = ref<any>([])
function getClassify() {
  api.blog.getClassify().then((res) => {
    classList.value = res
  })
}
const clickClass = (item: string) => {
  emit('selectBlog', item, '')
}
onMounted(() => {
  getClassify()
})
</script>

<style lang="scss" scoped>
.blog-classification {
  background-color: #fff;
  border-radius: 10px;
  height: 340px;
  margin-bottom: 20px;
  padding: 5px;
  overflow: hidden;

  .class-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .class-box {
    height: 300px;
    overflow: scroll;

    .class-item {
      display: flex;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      cursor: pointer;

      .class-img {
        height: 100%;
        width: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
