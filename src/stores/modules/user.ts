import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
export const useUserStore = defineStore({
  id: "admin-user",
  state: () => {
    return {
      token: "",
      userInfo: {},
    };
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: {}) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig('admin-user')
});
