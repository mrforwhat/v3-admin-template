<template>
  <div class="search">
    <el-icon size="22" @click="showSearch = true">
      <Search />
    </el-icon>
    <el-dialog
      v-model="showSearch"
      width="40%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-autocomplete
        v-model="searchStr"
        value-key="path"
        :fetch-suggestions="getMenuList"
        popper-class="my-autocomplete"
        placeholder="请输入菜单名称或路径"
        @select="handleSelect"
        @click.stop
      >
        <template #suffix>
          <el-icon class="el-input__icon" >
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <div class="search-item" flex="cross:center">
            <el-icon size="20">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="link">{{ item.meta.title }}</span>
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/modules/auth";
import { RouteRecordRaw } from "vue-router";
const showSearch = ref(false);
const handleClose = (done: () => void) => {
  done();
};
const router = useRouter()
const useAuth = useAuthStore();
const menuList = useAuth.flatMenuList;
const searchStr = ref("");
const createFilter = (queryString: string) => {
  return (menuItem: any) => {
    return menuItem.meta.title.indexOf(queryString) > -1;
  };
};
const getMenuList = (queryString: string, cb: Function) => {
  const results = queryString
    ? menuList.filter(createFilter(queryString))
    : menuList;
  // call callback function to return suggestion objects
  cb(results);
};

const handleSelect = (item: RouteRecordRaw) => {
    searchStr.value = ''
    router.push(item.path)
    showSearch.value = false
};

</script>
<style lang="scss" scoped>
.search {
  line-height: 1;
  margin: 0 5px;

  :deep(.el-dialog) {
    background-color: transparent;
    box-shadow: none;
  }
  :deep(.el-autocomplete) {
    width: 100%;
  }
}

.el-icon {
  cursor: pointer;
}

.link {
  margin-left: 5px;
}
</style>
