<template>
    <template v-for="item in menuList" :key="item.path">
        <el-menu-item v-if="!item.children" :index="item.path" @click="goPage(item)">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
        </el-menu-item>
        <el-sub-menu v-if="item.children"  :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.title}}</span>
            </template>
            <sub-menu :menuList="item.children"></sub-menu>
        </el-sub-menu>
    </template>
</template>
<script setup lang="ts">
import {RouteRecordRaw} from 'vue-router'
defineProps<{ menuList: any[] }>();
const router = useRouter()
const goPage = (item: RouteRecordRaw)=>{
    router.push(item.path)
}
</script>
<style lang="scss" scoped></style>
