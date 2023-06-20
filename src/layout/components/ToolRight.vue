<template>
  <div class="tools" flex="cross:center">
    <SearchMenu />
    <span class="user">Admin</span>
    <el-popover placement="bottom" trigger="click">
      <template #reference>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </template>
      <div class="option-item" @click="logOut">
        <div flex="cross:center">
          <el-icon size="20"><SwitchButton /></el-icon> <span>退出</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/modules/auth";
import { useUserStore } from "@/stores/modules/user";

const userStore = useUserStore();
const authStore = useAuthStore()
const router = useRouter()
const logOut = () => {
  userStore.setToken("");
  authStore.authMenuList = []
  router.push({path: '/login/index', replace: true})
};
</script>
<style lang="scss" scoped>
.user {
  font-size: 15px;
  margin: 0 10px;
}
.el-icon {
  cursor: pointer;
}
.el-avatar {
  position: relative;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-style: solid;
    border-top-color: aqua;
    border-left-color: aqua;
    border-bottom-color: aqua;
    transition: all ease 0.5s;
  }
  &:hover {
    &::before {
      transform: rotate(360deg);
    }
  }
}
.option-item {
  cursor: pointer;
  overflow: hidden;
  div {
    transition: all ease-in-out 0.5s;
  }
  &:hover {
    div {
      transform: translateX(30px);
    }
  }
  span {
    font-size: 14px;
    margin-top: 2px;
    margin-left: 5px;
  }
}
</style>
