import authMenuList from "@/assets/json/authMenuList.json";
import http from '@/api'
import { Login,ResultData } from "../interface";

export const loginAPI = (params: Login.LoginForm) => {
  return new Promise<ResultData<Login.LoginRs>>((resolve)=>{
    resolve({
      status: 200,
      msg: '',
      success: true,
      payload: {
        token: '123456',
        nickname: 'admin'
      }
    })
  })
  // return http.post<Login.LoginRs>('auth/login', params)
};

export const getVerifyIdAPI = ()=> {
  return http.get<Login.VerifyId>('/auth/generateVerifyId')
}

export const getVerifyImgAPI = (verifyId: string)=> {
  return http.get<Blob>(`/auth/getVerifyCode/${verifyId}`)
}
export const getAuthMenuListAPI = () => {
    console.log(authMenuList.list)
    return authMenuList.list
};
