<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
let emit = defineEmits(['selectBlog'])
onMounted(() => {
  getBlogList()
})

const number = ref<number>()
const clickTag = (item: string) => {
  emit('selectBlog', '', item)
}
// function selectblog(classType?: string, label?: string) {
//   console.log(classType)
//   console.log(label)
// }
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
const router = useRouter()
const goDetail = (id: number) => {
  router.push(`/detail?id=${id}`)
}
const currentPage = ref(1)
const pageSize = ref(5)
const sizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const currentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped>
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
</style>
