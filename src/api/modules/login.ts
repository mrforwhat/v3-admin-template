import authMenuList from "@/assets/json/authMenuList.json";

interface LoginForm {
  username: string;
  password: string;
}
export const loginAPI = async (params: LoginForm) => {
  return {
    status: 200,
    token: "123456",
    userInfo: {
      id: 1,
      username: "Admin",
    },
  };
};

export const getAuthMenuListAPI = () => {
    console.log(authMenuList.list)
    return authMenuList.list
};
