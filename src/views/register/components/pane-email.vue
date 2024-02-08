<template>
  <div class="pane-email">
    <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          :maxlength="8"
          type="text"
          placeholder="用户名"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :maxlength="16"
          type="password"
          placeholder="密码"
          show-password
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password_repeat">
        <el-input
          v-model="form.password_repeat"
          :maxlength="16"
          type="password"
          placeholder="重复密码"
          show-password
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="form.email" type="email" placeholder="邮箱">
          <template #prefix>
            <el-icon><Message /></el-icon>
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
            <el-button
              type="success"
              @click="validateEmail"
              :disabled="!isEmailValid || coldTime > 0"
            >
              {{ coldTime > 0 ? "请稍后 " + coldTime + " 秒" : "获取验证码" }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import router from "@/router";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { get, post } from "@/api";

// 注册表单
const form = reactive({
  username: "",
  password: "",
  password_repeat: "",
  email: "",
  code: "",
});
// 控制验证码按钮
const isEmailValid = ref(false);
// 验证码倒计时
const coldTime = ref(0);

// 校验用户名
const validateUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error("用户名不能包含特殊字符，只能是中文/英文"));
  } else {
    callback();
  }
};

// 校验密码
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

// 校验规则
const rules = {
  username: [
    { validator: validateUsername, trigger: ["blur", "change"] },
    {
      min: 2,
      max: 8,
      message: "用户名的长度必须在2-8个字符之间",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "密码的长度必须在6-16个字符之间",
      trigger: ["blur", "change"],
    },
  ],
  password_repeat: [
    { validator: validatePassword, trigger: ["blur", "change"] },
  ],
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

const onValidate = (prop, isValid) => {
  if (prop === "email") isEmailValid.value = isValid;
};
// 注册逻辑
const formRef = ref();

// 注册
const handleRegisterEmail = () => {
  formRef.value.validate((isValid) => {
    if (isValid) {
      post(
        "/user/register",
        {
          username: form.username,
          password: form.password,
          email: form.email,
          code: form.code,
        },
        () => {
          ElMessage.success("注册成功");
          router.push("/");
        }
      );
    } else {
      ElMessage.warning("请完整填写注册表单内容！");
    }
  });
};

// 获取验证码
const validateEmail = () => {
  coldTime.value = 60;
  post("/user/send_code", { email: form.email }, () => {
    ElMessage.success(`验证码已发送到手机短信: ${form.email}，请注意查收`);
    const handle = setInterval(() => {
      coldTime.value--;
      if (coldTime.value === 0) {
        clearInterval(handle);
      }
    }, 1000);
  });
};

defineExpose({
  handleRegisterEmail,
});
</script>

<style lang="less" scoped></style>
