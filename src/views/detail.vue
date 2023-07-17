<template>
  <!-- <el-input
    type="textarea"
    v-model="value"
    @input="change"
    :autosize="true"
  ></el-input> -->
  <div class="box">
    <div v-html="markedContent" class="markdown-context"></div>
    <div v-html="markdownToHtml" class="markdown-context"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import MarkdownIt from 'markdown-it'
import { ref, onMounted } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import api from '@/api'

const md = new MarkdownIt({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, code).value
        }</code></pre>`
      } catch (error) {
        console.log(error)
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
  },
})
const value = ref('')
const markdownToHtml = ref('')
const markedContent = ref('')
onMounted(() => {
  api.blog.getBlogDetail().then((res) => {
    value.value = res.data
    markdownToHtml.value = marked(value.value, {
      renderer: renderer,
      headerIds: false,
      mangle: false,
    })
    markedContent.value = md.render(value.value)
  })
})

<<<<<<< Updated upstream
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  // 高亮的语法规范
  highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
})
console.log('111')
const value = ref('')
const markdownToHtml = shallowRef('')
markdownToHtml.value = marked(value.value)

const change = (value: string) => {
  markdownToHtml.value = marked(value)
=======
const renderer = new marked.Renderer()
// const toc = new MarkedToc()
renderer.code = (code, language) => {
  const validLanguage = hljs.getLanguage(language as string)
    ? (language as string)
    : 'plaintext'
  const highlightedCode = hljs.highlight(code, {
    language: validLanguage,
  }).value
  return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`
>>>>>>> Stashed changes
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  .markdown-context {
    border: 1px solid;
    height: 100%;
    width: 50%;
    margin: 0 5px;
    font-size: 20px;
  }
}
</style>
