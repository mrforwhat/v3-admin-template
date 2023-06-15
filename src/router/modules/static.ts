import { RouteRecordRaw } from "vue-router";

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    redirect: "/home/index",
    component: () => import("@/layout/basic/index.vue"),
    children: [],
  },
  {
    name: "login",
    path: "/login/index",
    meta: {
      title: "登录",
    },
    component: () => import("@/pages/login/index.vue"),
  },
  {
    name: "404",
    path: "/404",
    meta: {
      title: "页面不存在",
    },
    component: () => import("@/pages/errors/404/index.vue"),
  },
  /**
   * https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1
   */
  { path: "/:pathMatch(.*)*", name: "404", component: () => import("@/pages/errors/404/index.vue") },
];
