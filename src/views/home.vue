<template>
  <div class="blog-box">
    <div class="blog-content">
      <div class="title">
        <div>全部博客</div>
        <div>
          共
          <span style="color: aquamarine">{{ number }}</span>
          篇
        </div>
      </div>
      <div class="card-box">
        <div
          class="card"
          v-for="item in blogList"
          @click="goDetail(item.id)"
          :key="item.id"
        >
          <div class="card-img">
            <img src="@/assets/vue.svg" />
          </div>
          <div class="card-right">
            <div class="card-title">
              {{ item.title }}
            </div>
            <div class="card-introduction">
              {{ item.introduction }}
            </div>
            <div class="card-bottom">
              <div class="user-img">
                <img src="@/assets/vue.svg" />
              </div>
              <div class="user">
                {{ item.author }}
              </div>
              <div class="time">
                {{ item.time }}
              </div>
              <div class="tags">
                <el-tag
                  class="tag"
                  v-for="i in item.tag"
                  @click.stop="clickTag(i)"
                  :key="i"
                >
                <el-tag
                  class="tag"
                  v-for="i in item.tag"
                  @click.stop="clickTag(i)"
                  :key="i"
                >
                  {{ i }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="pagination"
        background
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blogList.length"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <div class="blog-right">
      <div class="blog-classification">
        <div class="class-title">分类</div>
        <div class="class-box">
          <div
            class="class-item"
            v-for="item in classList"
            @click="clickClass(item.title)"
            :key="item.id"
          >
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
      <div class="blog-label">
        <div class="label-title">标签</div>
        <div class="container">
          <div class="tag-box" ref="tagBox">
            <!-- <div
              class="tag-item"
              v-for="item in styleTag"
              :key="item.id"
              :style="{
                fontWeight: item.weight,
                fontSize: item.size + 'px',
                color: item.color,
                height: item.size + 'px',
              }"
              @click="clickTag(item.title)"
            >
              {{ item.title }}
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
const number = ref<number>()

const clickTag = (item: string) => {
  selectblog("", item);
};
const clickClass = (item: string) => {
  selectblog(item, "");
};
function selectblog(classType?: string, label?: string) {
  console.log(classType);
  console.log(label);
}
const router = useRouter();
const goDetail = (id: number) => {
  router.push(`/detail?id=${id}`)
}
const blogList = ref<any>([])
function getBlogList() {
  api.blog.getBlogList().then((res) => {
    blogList.value = res
    number.value = blogList.value.length
    blogList.value.forEach((item: any) => {
      item.tag = item.tag.split(',')
    })
  })
}

const classList = ref<any>([])
function getClassify() {
  api.blog.getClassify().then((res) => {
    classList.value = res
  })
}
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
        goDetail(item.id)
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
  getBlogList()
  getTags()
  getClassify()
})
</script>

<style lang="scss" scoped>
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
  overflow: hidden;

  .blog-content {
    width: 50%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    overflow: scroll;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 20px;
    }

    .card-box {
      padding: 5px 5px;

      .card {
        width: 100%;
        height: 150px;
        border-bottom: 2px solid bisque;
        display: flex;

        .card-img {
          padding: 5px;
          width: 150px;
          height: 100%;
          box-sizing: border-box;

          img {
            width: 100%;
          }
        }

        .card-right {
          flex: 1;
          display: flex;
          flex-direction: column;

          .card-title {
            margin: 5px;
            font-size: 20px;
            font-weight: 700;
          }

          .card-introduction {
            margin: 5px;
            font-size: 15px;
            font-weight: 500;
            flex: 1;
            line-height: 1.5;
            text-indent: 2em;
          }

          .card-bottom {
            height: 20px;
            margin: 5px;
            display: flex;
            align-items: center;

            .user-img {
              width: 20px;
              height: 100%;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 10px;

              img {
                width: 100%;
              }
            }

            .user {
              color: red;
              margin-right: 20px;
            }

            .time {
              line-height: 20px;
            }

            .tags {
              flex: 1;
              display: flex;
              justify-content: flex-end;

              .tag {
                margin: 0 5px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .pagination {
      padding-top: 20px;
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  .blog-right {
    flex-direction: column;
    width: 20%;
    padding: 0 20px;
    position: fixed;
    right: 30px;

    .blog-classification {
      background-color: #fff;
      border-radius: 10px;
      height: 340px;
      margin-bottom: 20px;
      padding: 5px;
      overflow: hidden;
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
  }
}
</style>
