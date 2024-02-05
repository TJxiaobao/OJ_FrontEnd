<template>
  <div class="login">
    <div class="login-name">
      <div class="login-title">登录</div>
    </div>
    <div class="main">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            maxlength="10"
            type="text"
            placeholder="用户名"
          >
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            maxlength="20"
            placeholder="密码"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-btn">
      <el-button @click="userLogin()" style="width: 270px" type="success" plain
        >立即登录</el-button
      >
    </div>
    <el-divider>
      <span style="color: grey; font-size: 13px">没有账号</span>
    </el-divider>
    <div>
      <el-button
        style="width: 270px"
        @click="router.push('/register')"
        type="warning"
        plain
        >注册账号</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import router from "@/router";
import { reactive, ref } from "vue";
import { login } from "@/api";

const formRef = ref();
const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
};

function userLogin() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      console.log("form", form.username, form.password);
      login(form.username, form.password, () => router.push("/home"));
    }
  });
}
</script>

<style lang="less" scoped>
.login {
  text-align: center;
  margin: 0 20px;
  .login-name {
    margin-top: 130px;
    .login-title {
      font-size: 25px;
      font-weight: bold;
    }
  }
  .main {
    margin-top: 50px;
  }
  .login-btn {
    margin-top: 50px;
  }
}
</style>
