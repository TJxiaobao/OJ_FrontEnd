<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :rules="rules"
      ref="formRef"
      status-icon
      size="large"
      :model="form"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import { login, post } from "@/api";

// account数据
const form = reactive({
  username: "",
  password: "",
});

// 校验规则
const rules = {
  username: [
    { required: true, message: "必须输入帐号信息~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6~20数字或字母组成~",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "必须输入密码信息呢~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "必须是6位以上的数字或者字母组成哦~",
      trigger: "blur",
    },
  ],
};

// 账号的登录逻辑
const formRef = ref();
// 登录
function userLogin() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      login(form.username, form.password, () => router.push("/home"));
    }
  });
}

defineExpose({
  userLogin,
});
</script>

<style lang="less" scoped></style>
