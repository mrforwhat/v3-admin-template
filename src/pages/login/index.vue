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
              <div class="sticky-txt">文旅后台管理系统</div>
            </div>
          </div>
          <div class="login-body">
            <Login-Form @open-login="openLogin"></Login-Form>
          </div>
        </div>
        <div class="login-illustration" v-if="showAction" @click="login"></div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { loginAPI } from '@/api/modules/login';
  import { useUserStore } from '@/stores/modules/user';
  const router = useRouter()
  const userStore = useUserStore()
  const showAction = ref(false);
  let form = {
    username: '',
    password: ''
  }
  const openLogin = (val: any):void => {
    if(val) {
      showAction.value = true;
      form = val
    }else {
      showAction.value = false;
    }
    
  };
  const login = async ()=> {
    const rs = await loginAPI({...form})
    if(rs.status == 200) {
      userStore.setToken('123456')
      router.replace('/home/index')
    }
  }
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
    &-title{
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
      animation: spread linear 2s;
      text-align: center;
    }
  }
  
  @keyframes spread {
    0% {
      letter-spacing: -20px;
      filter: blur(1px);
    }
    100% {
      filter: blur(0);
      letter-spacing: 10px;
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
  </style>
  