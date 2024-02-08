<template>
  <div class="login-panel">
    <h2 class="title">登录</h2>
    <div class="tabs">
      <el-tabs
        type="border-card"
        v-model="activeName"
        stretch
        class="demo-tabs"
      >
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone ref="phoneRef"></pane-phone>
        </el-tab-pane>
        <el-tab-pane name="email">
          <template #label>
            <div class="label">
              <el-icon><Message /></el-icon>
              <span class="text">邮箱登录</span>
            </div>
          </template>
          <pane-email ref="emailRef"></pane-email>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button>其它登录</el-button>
    <!-- footer -->
    <div class="login-btn">
      <el-button
        @click="handleLoginBtnClick()"
        style="width: 100%"
        type="success"
        plain
        >立即登录</el-button
      >
    </div>
    <el-divider>
      <span style="color: grey; font-size: 13px">没有账号</span>
    </el-divider>
    <div>
      <el-button
        style="width: 100%"
        @click="router.push('/register')"
        type="warning"
        plain
        >注册账号</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PaneAccount from "./pane-account.vue";
import PanePhone from "./pane-phone.vue";
import PaneEmail from "./pane-email.vue";
import router from "@/router";

const activeName = ref("account");

const accountRef = ref();
const phoneRef = ref();
const emailRef = ref();
function handleLoginBtnClick() {
  if (activeName.value === "account") {
    accountRef.value.userLogin();
  } else if (activeName.value === "phone") {
    phoneRef.value.phoneLogin();
  } else if (activeName.value === "email") {
    emailRef.value.emailLogin();
  } else {
    console.log("用户已经登录");
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 400px;
  margin-bottom: 80px;
  border-radius: 20px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .login-btn {
    margin-top: 50px;
    width: 100%;
  }
}
</style>
