<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <div class="aside-container" flex="dir:top">
          <div class="aside-logo" flex="cross:center">
            <img src="@/assets/svg/vue.svg" alt="Vite logo" />
            文旅后台
          </div>
          <div class="aside-content">
            <el-scrollbar>
              <el-menu>
                <sub-menu :menuList="menuList"></sub-menu>
              </el-menu>
            </el-scrollbar>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header flex="cross:center main:between">
          <div class="tools-wrap">
            <ToolLeft></ToolLeft>
          </div>
          <div class="tools-wrap">
            <ToolRight></ToolRight>
          </div>
        </el-header>
        <el-main>
          <div class="layout-main">
            <router-view></router-view>
          </div>
        </el-main> 
        <el-footer>2023 © 文旅后台 By LHKJ Technology.</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth';

const authStore = useAuthStore()
const menuList = computed(()=>{
  return authStore.authMenuList
}) 
</script>
<style lang="scss" scoped>
.layout{
  &-main{
    height: 100%;
  }
}
.aside {
  &-container {
    height: 100vh;
    border-right: 1px solid var(--el-border-color-light);
  }
  &-logo {
    flex: 0 0 55px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 2px;
    cursor: pointer;
    img {
      width: 30px;
      flex: 0 0 30px;
      margin-right: 10px;
    }
    &:hover {
      img {
        filter: drop-shadow(0 0 10px #646cffaa);
      }
    }
  }
  &-content {
    flex: 1 0 auto;
    height: 0;
  }
}
.el-menu {
  border-right: none;
}
.el-footer {
  text-align: center;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  font-size: 14px;
  color: var(--el-text-color-secondary);
  text-decoration: none;
  letter-spacing: 0.5px;
  padding: 20px;
}
.tools-wrap{
  white-space: nowrap;
  overflow: hidden;
}
</style>
