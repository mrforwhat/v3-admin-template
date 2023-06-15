import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";
import { staticRoutes } from "./modules/static";
import { initDynamicRoutes } from "./modules/dynamic";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRoutes],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const title = import.meta.env.VITE_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title}` : title;

  // 直接访问登录页
  if (to.path == "/login/index") {
    // 如果有token,说明已经登录，从哪里来回哪里去
    if (userStore.token) {
      return next(from.fullPath);
    }
    // 清空授权路由，确保重新登录
    resetRouter();
    return next();
  }

  // 访问其他页面，但是没有token,直接返回登录页
  if (!userStore.token) {
    return next({ path: "/login/index", replace: true });
  }

  // 没有获取到权限菜单，重新初始化
  if (!authStore.authMenuList.length) {
    await initDynamicRoutes();
    return next({ path: to.path, replace: true });
  }

  next();
});

export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.flatMenuList.forEach((item) => {
    const { name } = item;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};
export default router;
