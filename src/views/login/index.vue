<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script setup>
import LoginPanel from "./components/login-panel.vue";
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
