import { defineStore } from "pinia";
import { getBreadcrumbList, getFlatMenuList } from "@/utils";
import { getAuthMenuListAPI } from "@/api/modules/login";
export const useAuthStore = defineStore({
  id: "v3-desktop-auth",
  state: () => {
    return {
      authMenuList: [] as any,
      routeName: "",
    };
  },
  getters: {
    breadcumbList: (state)=>{
        return getBreadcrumbList(state.authMenuList)
    },
    flatMenuList: (state)=>{
        return getFlatMenuList(state.authMenuList)
    }
  },
  actions: {
    async getAuthMenuList() {
        const list = await getAuthMenuListAPI()
        this.authMenuList = list
    },
    clearAuthMenuList() {
      this.authMenuList = []
    }
  }
});
