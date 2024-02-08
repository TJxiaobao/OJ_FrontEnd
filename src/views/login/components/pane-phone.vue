<template>
  <div class="pane-account">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="手机号">
          <template #prefix>
            <el-icon>
              <Iphone />
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
            <el-button type="success" @click="validatePhone">
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
import { loginPhone, post } from "@/api";

const form = reactive({
  phone: "",
  code: "",
});
// 验证码倒计时
const coldTime = ref(0);
// 校验规则
const rules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入合法的手机号",
      trigger: ["blur", "change"],
    },
  ],
  code: [{ required: true, message: "请输入获取的验证码", trigger: "blur" }],
};

// 获取验证码
const validatePhone = () => {
  coldTime.value = 60;
  post("/user/send_code_sms", { phone: form.phone }, () => {
    ElMessage.success(`验证码已发送到手机短信: ${form.phone}，请注意查收`);
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
function phoneLogin() {
  formRef.value.validate((isValid) => {
    if (isValid) {
      loginPhone(form.phone, form.code, () => router.push("/home"));
    }
  });
}

defineExpose({
  phoneLogin,
});
</script>

<style lang="less" scoped></style>
