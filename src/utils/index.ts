import { RouteRecordRaw } from "vue-router";

/**
 *
 * @param menuList 菜单列表
 * @param parent 父级菜单
 * @param result
 * @returns
 */
export const getBreadcrumbList = (
  menuList: RouteRecordRaw[],
  parent = [],
  result: { [key: string]: any } = {}
) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item];
    if (item.children) {
      getBreadcrumbList(item.children, result[item.path], result);
    }
  }
  return result;
};
/**
 * @description 把菜单列表扁平化，用于动态添加路由
 * @param menuList 原始菜单列表可能包含children
 * @param result 把有children的展开
 * @returns
 */
export const getFlatMenuList = (
  menuList: RouteRecordRaw[],
  result: RouteRecordRaw[] = []
) => {
  let copyMenuList: RouteRecordRaw[] = JSON.parse(JSON.stringify(menuList))
  copyMenuList.forEach((item) => {
    result.push(item)
    if(item.children) {
      getFlatMenuList(item.children, result);
    }
  });
  return result;
};
