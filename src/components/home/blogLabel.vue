<template>
  <div class="blog-label">
    <div class="label-title">标签</div>
    <div class="container">
      <div class="tag-box" ref="tagBox"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import api from '@/api'
const emit = defineEmits(['selectBlog'])
const styleTag = ref<any>([])
const tagBox: Ref<HTMLElement | null> = ref(null)
console.log(tagBox)
function getTags() {
  api.blog.getTags().then((res) => {
    styleTag.value = res
    styleTag.value.forEach((item: any) => {
      const div = document.createElement('div')
      div.textContent = item.title
      div.style.fontSize = `${item.number}px`
      div.style.color = getRandomColor()
      div.style.position = 'absolute'
      div.style.cursor = 'pointer'
      div.classList.add('item')
      div.onclick = () => {
        emit('selectBlog', '', item.title)
      }
      tagBox.value?.appendChild(div)

      setTimeout(() => {
        // const elemtnWidth = div.offsetWidth
        // const elemtnHeight = div.offsetHeight

        // console.log(elemtnWidth, elemtnHeight)
        setRandomPosition(div)
      }, 0)
    })
  })
}
// 随机生成颜色
function getRandomColor() {
  return '#' + Math.random().toString(16).slice(2, 8)
}
// 随机生成位置
function setRandomPosition(element: HTMLElement) {
  if (!tagBox.value) return
  const containerWidth = tagBox.value.offsetWidth
  const containerHeight = tagBox.value.offsetHeight
  const elementWidth = element.offsetWidth
  const elementHeight = element.offsetHeight

  // 计算可用的最大左偏移和上偏移
  const maxLeft = containerWidth - elementWidth
  const maxTop = containerHeight - elementHeight

  // 生成随机的左偏移和上偏移，并确保不超出边界
  const randomLeft = Math.max(0, Math.min(maxLeft, Math.random() * maxLeft))
  const randomTop = Math.max(0, Math.min(maxTop, Math.random() * maxTop))

  element.style.left = `${randomLeft}px`
  element.style.top = `${randomTop}px`
}
onMounted(() => {
  // getBlogList()
  getTags()
  // getClassify()
})
</script>

<style lang="scss" scoped>
.blog-label {
  background-color: #fff;
  border-radius: 10px;
  height: 300px;
  margin-bottom: 20px;
  padding: 5px;

  .label-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .container {
    height: 260px;

    .tag-box {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}
</style>
