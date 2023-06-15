import router from "../index";
import { useAuthStore} from '@/stores/modules/auth'
import { useUserStore } from "@/stores/modules/user";

// 动态导入路由组件component
const modules = import.meta.glob('@/pages/**/*.vue')
export const initDynamicRoutes = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  await authStore.getAuthMenuList()

  if(!authStore.authMenuList.length) {
    userStore.setToken('')
    router.push({path: '/login/index',replace: true})
    return Promise.reject('没有权限')
  }

  authStore.flatMenuList.forEach((item:any)=>{
    if(item.component && typeof item.component == 'string') {
      item.component = modules[`/src/pages${item.component}.vue`]
    }
    if(item.component) {
      router.addRoute("layout", item)
    }
  })

  // router.addRoute("layout", {
  //   name: "home",
  //   path: "home/index",
  //   meta: {
  //     title: "主页",
  //     keepAlive: true,
  //   },
  //   component: () => import("@/pages/home/index.vue"),
  // });
};
