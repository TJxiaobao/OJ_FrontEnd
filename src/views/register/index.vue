<template>
  <div class="register-page">
    <register-panel></register-panel>
  </div>
</template>

<script setup>
import RegisterPanel from "./components/register-panel.vue";
</script>

<style lang="less" scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
