<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-container" flex="main:around cross:center">
      <div class="login-box">
        <i></i>
        <i></i>
        <div class="login-title" flex="cross:center">
          <img src="@/assets/svg/vue.svg" class="login-logo" alt="Vite logo" />
          <div class="sticky">
            <div class="sticky-txt">
              <span>文</span>
              <span>旅</span>
              <span>后</span>
              <span>台</span>
              <span>管</span>
              <span>理</span>
              <span>系</span>
              <span>统</span>
            </div>
          </div>
        </div>
        <div class="login-body">
          <LoginForm ref="loginFormEl" @open-login="openLogin"/>
        </div>
      </div>
      <div class="login-illustration" v-if="showAction" @click="login"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loginAPI } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { Login } from "@/api/interface/index";
import LoginForm from "./components/LoginForm.vue"
const router = useRouter();
const userStore = useUserStore();
const showAction = ref(false);
const loginFormEl = ref<InstanceType<typeof LoginForm> | null>(null)
let form = {
  username: "",
  password: "",
  verifyId: "",
  verifyCode: "",
};
const openLogin = (val: Login.LoginForm): void => {
  if (val) {
    showAction.value = true;
    form = val;
  } else {
    showAction.value = false;
  }
};
const login = async () => {
  if (!form.username) {
    return ElMessage({
      message: "请输入用户名",
      grouping: true,
      type: "info",
    });
  }
  if (!form.password) {
    return ElMessage({
      message: "请输入密码",
      grouping: true,
      type: "info",
    });
  }
  // if (!form.verifyCode) {
  //   return ElMessage({
  //     message: "请输入验证码",
  //     grouping: true,
  //     type: "info",
  //   });
  // }
  const rs = await loginAPI(form);
  if (rs.status == 200) {
    userStore.setToken(rs.payload.token);
    userStore.setUserInfo({
      nickname: rs.payload.nickname,
    });
    router.replace("/home/index");
    ElNotification({
      title: "登录成功",
      message: `欢迎回来，${rs.payload.nickname}`,
      type: "success",
      duration: 3000,
    });
  } else if (rs.status == 4001) {
    ElMessage({
      message: "验证码已过期",
      grouping: true,
      type: "info",
    });
    loginFormEl.value?.getVerifyId()
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #ddd;
  &-bg {
    width: 100%;
    height: 590px;
    position: absolute;
    bottom: 0;
    background-image: url("@/assets/svg/login_wave_bg.svg");
    background-size: cover;
  }
  &-container {
    position: absolute;
    top: 3%;
    left: 3%;
    bottom: 3%;
    right: 3%;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.74);
  }
  &-box {
    margin: 0 30px;
    flex: 0 0 500px;
    width: 500px;
    min-height: 300px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    &:hover {
      .login-logo {
        filter: drop-shadow(0 0 10px #646cffaa);
      }
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
    }
    i {
      position: absolute;
      height: 100%;
      width: 2px;
      display: block;
    }
    // 上边框
    &::before {
      top: 0;
      left: -100%;
      background-image: linear-gradient(
        to right,
        transparent,
        #f78da7,
        #8ed1fc,
        transparent
      );
      animation: flowRight 4s linear infinite;
    }
    // 右边框
    i:nth-child(1) {
      right: 0;
      top: -100%;
      background-image: linear-gradient(
        to bottom,
        transparent,
        #f78da7,
        #8ed1fc,
        transparent
      );
      animation: flowDown 4s linear 1s infinite;
    }
    // 下边框
    &::after {
      bottom: 0;
      right: -100%;
      background-image: linear-gradient(
        to left,
        transparent,
        #f78da7,
        #8ed1fc,
        transparent
      );
      animation: flowLeft 4s linear 2s infinite;
    }
    // 左边框
    i:nth-child(2) {
      left: 0;
      bottom: -100%;
      background-image: linear-gradient(
        to top,
        transparent,
        #f78da7,
        #8ed1fc,
        transparent
      );
      animation: flowUp 4s linear 3s infinite;
    }
  }
  &-logo {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    will-change: filter;
    transition: filter 300ms;
    margin-right: 10px;
  }
  &-title {
  }

  &-illustration {
    width: 500px;
    height: 500px;
    background-image: url("@/assets/svg/login_finger.svg");
    background-size: cover;
    cursor: pointer;
  }
}

.sticky {
  flex: 1;

  &-txt {
    font-size: 34px;
    font-weight: bold;
    letter-spacing: 10px;
    text-align: center;
    span {
      display: inline-block;
      opacity: 0;
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          animation: bounceIn 0.5s #{$i * 0.1}+ s linear forwards;
        }
      }
    }
  }
}

@keyframes flowRight {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
@keyframes flowDown {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}
@keyframes flowLeft {
  0% {
    right: -100%;
  }
  100% {
    right: 100%;
  }
}
@keyframes flowUp {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 100%;
  }
}

@keyframes bounceIn {
  0%,
  100%,
  20%,
  40%,
  60%,
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
