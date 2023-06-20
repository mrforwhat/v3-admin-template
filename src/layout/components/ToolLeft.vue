<template>
  <el-breadcrumb :separator-icon="'ArrowRight'">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="item in breadList" :to="item" :key="item.path">
      <el-icon><component :is="item.meta.icon"></component></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/modules/auth";
const authStore = useAuthStore();
const route = useRoute();
const breadList = computed(() => {
  if (!authStore.authMenuList.length) {
    return [];
  }
  let list: any[] = [];
  let currentRoute = route.matched[route.matched.length - 1];
  let homeRouter = authStore.breadcumbList["/home/index"][0];
  list = authStore.breadcumbList[currentRoute.path];
  if (list[0].path != "/home/index") {
    list.unshift(homeRouter);
  }
  return list;
});
</script>
<style lang="scss" scoped>
.el-breadcrumb__item {
  float: none;
  span {
    vertical-align: top;
    margin-left: 3px;
  }
}
</style>
