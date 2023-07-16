<template>
  <el-header class="header-box">
    <div class="log">谢红尘</div>

    <el-menu
      :default-active="activeIndex"
      class="menu-box"
      mode="horizontal"
      background-color="rgba(0,0,0,0)"
    >
      <el-menu-item
        v-for="item in menuList"
        @click="gotRoute(item.path)"
        :index="item.path"
        :key="item.id"
      >
        <el-icon>
          <component :is="icon[item.id - 1]"></component>
        </el-icon>
        {{ item.authName }}
      </el-menu-item>
    </el-menu>

    <div v-if="userInfo" class="login">登录</div>
    <div v-else class="view-box my-flex">
      <div class="background">后台</div>
      <div class="exit">退出</div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const activeIndex = ref('home')
const menuList = reactive([
  {
    id: 1,
    authName: '首页',
    path: 'home',
  },
  {
    id: 2,
    authName: '随笔',
    path: 'essay',
  },
  {
    id: 3,
    authName: '项目',
    path: 'project',
  },
  {
    id: 4,
    authName: '留言',
    path: 'message',
  },
  {
    id: 5,
    authName: '关于我',
    path: 'about',
  },
])
const icon = reactive(['House', 'ChatSquare', 'Folder', 'Document', 'User'])

const router = useRouter()
const gotRoute = (path: string) => {
  router.push(path)
}
const userInfo = localStorage.getItem('userInfo')
// console.log(userInfo)
</script>

<style scoped lang="scss">
.el-menu--horizontal {
  border-bottom: 0;
}
.header-box {
  line-height: 60px;
  display: flex;
  .log {
    padding: 0 20px;
  }
  .login {
    padding: 0 20px;
  }
  .view-box {
    .background {
      padding: 0 20px;
    }
    .exit {
      padding: 0 20px;
    }
  }
  .menu-box {
    flex: 1;
    display: flex;
    justify-content: center;
    .el-menu-item {
      display: flex;
      align-items: center;
      .el-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
