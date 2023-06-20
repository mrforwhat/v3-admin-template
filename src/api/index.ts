import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ResultData } from "./interface/index";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
// import "element-plus/es/components/message/style/css";
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};
class RequestHttp {
  service: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config) => {
        const userStore = useUserStore();
        config.headers.Authorization = userStore.token
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        if (data.status == 403) {
          ElMessage.error("登录失效");
          return Promise.reject(data);
        }
        if (data.status == 500) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (!response) {
          if (error.message.match(/Network Error/)) {
            ElMessage.error("网络错误，请稍后再试！");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   *
   * @param url
   * @param params
   * @param _object
   * @returns
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(
    url: string,
    params?: object | string,
    _object = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}
export default new RequestHttp(config);
