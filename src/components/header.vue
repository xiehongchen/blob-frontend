<template>
  <el-affix :offset="0">
    <el-header class="header-box">
      <div class="log">
        谢红尘
        <div class="userInfo">
          <el-icon size="50" class="icon" @click="goUserInfo(1)"
            ><Discount
          /></el-icon>
          <el-icon size="50" class="icon" @click="goUserInfo(2)"
            ><ChatDotRound
          /></el-icon>
          <el-icon size="50" class="icon" @click="goUserInfo(3)"
            ><ChatDotRound
          /></el-icon>
        </div>
      </div>

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

      <div></div>

      <div v-if="!userInfo" class="login button" @click="login">登录</div>
      <div v-else class="view-box my-flex button">
        <div class="background" @click="back">后台</div>
        <div class="exit" @click="exit">退出</div>
      </div>
    </el-header>
  </el-affix>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { userInfo } from "@/utils/user.ts";

const activeIndex = ref("home");
const menuList = reactive([
  {
    id: 1,
    authName: "首页",
    path: "home",
  },
  {
    id: 2,
    authName: "随笔",
    path: "essay",
  },
  {
    id: 3,
    authName: "项目",
    path: "project",
  },
  {
    id: 4,
    authName: "留言",
    path: "message",
  },
  {
    id: 5,
    authName: "关于我",
    path: "about",
  },
]);
const icon = reactive(["House", "ChatSquare", "Folder", "Document", "User"]);

const router = useRouter();
const gotRoute = (path: string) => {
  router.push(path);
};
// const userInfo = localStorage.getItem("userInfo");
// console.log(userInfo);

const goUserInfo = (index: number) => {
  let url = "";
  if (index === 1) {
    url = userInfo.gitHubUrl;
  } else if (index === 2) {
    url = userInfo.giteeUrl;
  }
  // 新窗口
  window.open(url);
  // 当前窗口
  // window.location.href = url;
};
const login = () => {
  router.push("/login");
};
const back = () => {
  router.push("/admin");
};

const exit = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped lang="scss">
.el-menu--horizontal {
  border-bottom: 0;
}
.header-box {
  line-height: 60px;
  display: flex;
  color: red;

  .log {
    text-align: center;
    color: red;
    width: 100px;
    .userInfo {
      width: 100%;
      display: none;
      .icon {
        margin: 5px;
        cursor: pointer;
      }
    }
    &:hover {
      color: red;
      .userInfo {
        display: block;
      }
    }
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
    --el-menu-active-color: red;
    .el-menu-item {
      display: flex;
      align-items: center;
      color: yellow;
      .el-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
