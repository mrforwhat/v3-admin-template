<template>
  <div class="form">
    <div class="form-row" flex="cross:center">
        <img src="@/assets/svg/user.svg" alt="" class="form-icon">
        <div class="form-input">
            <input type="text" v-model="loginForm.username" placeholder="请输入用户名(admin)">
        </div>
    </div>
    <div class="form-row" flex="cross:center">
        <img src="@/assets/svg/lock.svg" alt="" class="form-icon">
        <div class="form-input">
            <input type="password" v-model="loginForm.password" placeholder="请输入密码(123456)">
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
    const loginForm = reactive({
        username: '',
        password: ''
    })
    const emit = defineEmits<{
        (e: 'open-login',val: any): void
    }>()
    watchEffect(()=>{
        if(loginForm.username && loginForm.password) {
            console.log('显示登录')
            emit('open-login',loginForm)
        }else {
            emit('open-login',false)
        }
    })
</script>
<style lang="scss" scoped>
    .form{
        margin-top: 40px;
        &-row{
            padding: 5px 10px;
            margin: 20px auto;
            box-shadow: 0 0 3px 0 rgba(0,0,0,.3);
            transition: box-shadow ease-in-out 0.5s;
            &:hover{
                box-shadow: 0 0 5px 0 #ff64c4aa;
            }
        }
        &-icon{
            width: 30px;
            height: 30px;
            flex: 0 0 30px;
        }
        &-input{
            flex: 1;
            margin-left: 10px;
        }
    }
    input{
        width: 100%;
        border: none;
        background: transparent;
    }
</style>
