<template>
  <div class="form">
    <div class="form-row">
      <div class="form-input-box" flex="cross:center">
        <el-icon size="20">
          <User></User>
        </el-icon>
        <div class="form-input">
          <input
            type="text"
            v-model="loginForm.username"
            placeholder="请输入用户名(admin)"
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-input-box" flex="cross:center">
        <el-icon size="20">
          <Lock></Lock>
        </el-icon>
        <div class="form-input">
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码(123456)"
          />
        </div>
      </div>
    </div>
    <!-- <div class="form-row" flex="cross:center">
      <div class="form-input-box code" flex="cross:center">
        <el-icon size="20">
          <CircleCheck></CircleCheck>
        </el-icon>
        <div class="form-input">
          <input
            type="text"
            v-model="loginForm.verifyCode"
            placeholder="请输入图片验证码"
          />
        </div>
      </div>
      <div class="form-img" flex="main:right cross:center" @click="refresh">
        <img
          v-if="loginForm.verifyId"
          :src="`${apiBasePath}auth/getVerifyCode/${loginForm.verifyId}`"
          alt=""
        />
        <el-icon size="20" v-if="seconds == 5">
          <Refresh></Refresh>
        </el-icon>
        <div v-else>{{ seconds }}s</div>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { getVerifyIdAPI } from "@/api/modules/login";
const apiBasePath = ref("");
apiBasePath.value = import.meta.env.VITE_API_BASE_URL;
const loginForm = reactive({
  username: "",
  password: "",
  verifyId: "",
  verifyCode: "",
});
const seconds = ref(5);
let timer: any = null;

const emit = defineEmits<{
  (e: "open-login", val: any): void;
}>();
watchEffect(() => {
  if (loginForm.username) {
    emit("open-login", loginForm);
  } else {
    emit("open-login", false);
  }
});

const getVerifyId = async () => {
  loginForm.verifyId = "";
  const { payload } = await getVerifyIdAPI();
  loginForm.verifyId = payload.verifyId;
  loginForm.verifyCode = ''
};
const refresh = async () => {
  if (timer || seconds.value == 0) {
    return;
  }
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    seconds.value--;
    if (seconds.value == 0) {
      clearInterval(timer);
      timer = null;
      seconds.value = 5;
    }
  }, 1000);
  await getVerifyId();
};
defineExpose({
    getVerifyId
})
onMounted(async () => {
  // await getVerifyId();
});
</script>
<style lang="scss" scoped>
.form {
  margin-top: 40px;
  &-row {
    margin: 20px auto;
  }
  &-input-box {
    padding: 5px 10px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
    transition: box-shadow ease-in-out 0.5s;
    &:hover {
      box-shadow: 0 0 5px 0 #ff64c4aa;
    }
    &.code {
      flex: 1;
    }
  }
  &-img {
    flex: 0 0 130px;
    height: 31px;
    cursor: pointer;
    img {
      width: 83px;
      height: 31px;
      margin: 0 10px 0 20px;
    }
  }

  &-input {
    flex: 1;
    margin-left: 10px;
  }
}
input {
  width: 100%;
  border: none;
  background: transparent;
}
</style>
