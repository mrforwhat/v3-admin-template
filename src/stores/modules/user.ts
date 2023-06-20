import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
import { UserState } from "../interface";
export const useUserStore = defineStore({
  id: "admin-user",
  state: ():UserState => {
    return {
      token: "",
      userInfo: {
        nickname: ''
      },
    };
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig('admin-user')
});
