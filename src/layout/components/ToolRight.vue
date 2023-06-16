<template>
  <div class="tools" flex="cross:center">
    <SearchMenu/>
    <span class="user">Admin</span>
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.user {
  font-size: 15px;
  margin: 0 10px;
}
.el-icon{
  cursor: pointer;
}


</style>
