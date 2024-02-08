<template>
  <div>
    <div class="right-card">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.right-card {
  width: 400px;
  // z-index: 1;
  // box-sizing: border-box;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin: 10px 400px;
  background-color: var(--el-bg-color);
}

.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>
