<template>
  <div class="box" ref="box">
    <div
      v-html="markdownToHtml"
      ref="markedHtml"
      class="markdown-context"
      @click="handleButtonClick($event)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { ref, onBeforeMount, nextTick, onUnmounted } from 'vue'
import ClipboardJS from 'clipboard'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import api from '@/api'
import { ElMessage } from 'element-plus'

let clipboard: ClipboardJS | null = null
const markdownToHtml = ref('')
const markedHtml = ref<Element>()
const box = ref<Element>()
const type = ref('')
onBeforeMount(async () => {
  api.blog.getBlogDetail().then((res) => {
    // console.log(res)
    markdownToHtml.value = marked(res.data, {
      renderer: renderer,
      mangle: false,
      headerIds: false,
    })
    // console.log(markdownToHtml.value)
    // markdownToHtml.value = markdownToHtml.value.replace(
    //   '<pre><code class="hljs js">',
    //   '<pre><code class="hljs js">',
    // )
  })
  await nextTick()
  // console.log(box)
  // console.log(markedHtml)
})
onUnmounted(() => {
  if (clipboard) {
    clipboard.destroy()
  }
})

const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  const validLanguage = hljs.getLanguage(language as string)
    ? (language as string)
    : 'plaintext'
  type.value = validLanguage
  const highlightedCode = hljs.highlight(code, {
    language: validLanguage,
  }).value
  return `<pre><div class="code-header"><div class="code-language">${validLanguage}</div><div data-clickable="true" class="code-copy">复制</div></div><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`
}
const handleButtonClick = (event: any) => {
  const target = event.target
  // console.log(event)
  // 判断点击的元素是否为添加了 data-clickable 属性的按钮
  if (target && target.dataset.clickable === 'true') {
    const codeText = target.parentElement.nextElementSibling.textContent
    // console.log('Code Text:', codeText)
    // console.log('Clicked:', target.textContent)
    if (clipboard) {
      clipboard.destroy() // 销毁之前的 clipboard 实例
    }
    clipboard = new ClipboardJS('.code-copy', {
      text: () => codeText,
    })
    clipboard.on('success', (e: any) => {
      console.log(e)
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
      e.clearSelection() // 清除选中状态
    })

    // 监听复制失败事件
    clipboard.on('error', () => {
      ElMessage({
        message: '复制成功',
        type: 'error',
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 10px 200px;
  height: 1000px;
  font-size: 20px;

  .markdown-context {
    border: 1px solid;
    background-color: white;
    padding: 0 20px;
  }
}

:deep(blockquote) {
  margin: 0;
  border-left: 3px solid gray;

  p {
    margin: 0 0 0 5px;
  }
}

:deep(li) {
  code {
    background-color: antiquewhite;
  }
}

:deep(.code-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(39, 39, 50);
  color: rgb(160, 160, 172);
  padding: 10px 20px 0;
  z-index: 10;

  .code-language {
    font-size: 20px;
    font-weight: bold;
  }

  .code-copy {
    cursor: pointer;
  }
}
</style>
