<template>
  <div class="pane-account">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="邮箱">
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="10" style="width: 100%">
          <el-col :span="17">
            <el-input
              v-model="form.code"
              :maxlength="6"
              type="text"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <el-icon><EditPen /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-button type="success" @click="validateEmail">
              {{ coldTime > 0 ? "请稍后 " + coldTime + " 秒" : "获取验证码" }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import { loginEmail, post } from "@/api";

const form = reactive({
  email: "",
  code: "",
});
// 验证码倒计时
const coldTime = ref(0);
// 校验规则
const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入合法的邮箱",
      trigger: ["blur", "change"],
    },
  ],
  code: [{ required: true, message: "请输入获取的验证码", trigger: "blur" }],
};

// 获取验证码
const validateEmail = () => {
  coldTime.value = 60;
  post("/user/send_code", { email: form.email }, () => {
    ElMessage.success(`验证码已发送到邮箱: ${form.email}，请注意查收`);
    const handle = setInterval(() => {
      coldTime.value--;
      if (coldTime.value === 0) {
        clearInterval(handle);
      }
    }, 1000);
  });
};
// 账号的登录逻辑
const formRef = ref();
// 登录
function emailLogin() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      loginEmail(form.email, form.code, () => router.push("/home"));
    }
  });
}

defineExpose({
  emailLogin,
});
</script>

<style lang="less" scoped></style>
