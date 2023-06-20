export interface ResultData<T = any> {
  status: number;
  msg: string;
  success: boolean;
  payload: T;
}

export namespace Login {
  export interface LoginForm {
    username: string;
    password: string;
    verifyId: string;
    verifyCode: string;
  }
  export interface LoginRs {
    token: string;
    nickname: string;
  }
  export interface VerifyId {
    verifyId: string;
  }
}
