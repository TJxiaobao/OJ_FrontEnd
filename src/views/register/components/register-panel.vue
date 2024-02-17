<template>
  <div class="login-panel">
    <h2 class="title">注册新用户</h2>
    <div class="tabs">
      <el-tabs
        type="border-card"
        v-model="activeName"
        stretch
        class="demo-tabs"
      >
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机号注册</span>
            </div>
          </template>
          <pane-phone ref="phoneRef"></pane-phone>
        </el-tab-pane>
        <el-tab-pane name="email">
          <template #label>
            <div class="label">
              <el-icon><Message /></el-icon>
              <span class="text">邮箱注册</span>
            </div>
          </template>
          <pane-email ref="emailRef"></pane-email>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- footer -->
    <div class="register-btn">
      <el-button
        style="width: 100%"
        type="warning"
        @click="handleRegister"
        plain
        >立即注册</el-button
      >
    </div>
    <div class="has-account">
      <span class="account">已有账号? </span>
      <el-link
        type="primary"
        style="translate: 0 -2px"
        @click="router.push('/')"
        >立即登录</el-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import PaneEmail from "./pane-email.vue";
import PanePhone from "./pane-phone.vue";

const activeName = ref("phone");

const phoneRef = ref();
const emailRef = ref();

// 注册
function handleRegister() {
  if (activeName.value === "phone") {
    phoneRef.value.handleRegisterPhone();
  } else if (activeName.value === "email") {
    emailRef.value.handleRegisterEmail();
  } else {
    console.log("用户已经登录");
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
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
  .register-btn {
    margin-top: 20px;
  }
  .has-account {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .account {
      font-size: 14px;
      line-height: 15px;
      color: grey;
    }
  }
}
</style>
