// import { DirectiveBinding } from 'vue'

// // 自定义指令：v-html-click
// const clickHtml = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     el.innerHTML = binding.value

//     const dynamicElement = el.firstElementChild
//     if (dynamicElement) {
//       const clickHandler = dynamicElement.getAttribute('@click')
//       dynamicElement.removeAttribute('@click')

//       if (clickHandler) {
//         // 添加新的事件监听
//         dynamicElement?.addEventListener('click', () => {
//           // 执行点击事件处理函数
//           this[clickHandler]()
//         })
//       }
//     }
//   },
// }

// export default clickHtml
