import axios from "axios";
import { ElMessage } from "element-plus";

const authItemName = "authorize";

const accessHeader = () => {
  return {
    Authorization: `Bearer ${takeAccessToken()}`,
  };
};

const defaultError = (error) => {
  console.error(error);
  ElMessage.error("发生了一些错误，请联系管理员");
};

// const defaultFailure = (message, status, url) => {
//   console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`);
//   ElMessage.warning(message);
// };
const defaultFailure = (error) => {
  if (error.response) {
    // 请求已发出，但服务器返回状态码不在 2xx 范围内
    console.warn(
      `请求地址: ${error.config.url}, 状态码: ${error.response.status}, 错误信息: ${error.response.data.message}`
    );
    ElMessage.warning(error.response.data.message);
  } else if (error.request) {
    // 请求发出去了，但是没有收到响应
    console.warn(`请求地址: ${error.config.url}, 没有收到响应`);
    ElMessage.warning("没有收到响应，请检查网络连接");
  }
  // } else {
  //   // 设置请求时触发了错误
  //   console.error("Error", error.message);
  //   ElMessage.error("发生了一些错误，请联系管理员");
  // }
};

function takeAccessToken() {
  const str =
    localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);
  if (!str) return null;
  const authObj = JSON.parse(str);
  return authObj.token;
}

function storeAccessToken(token) {
  const authObj = {
    token: token,
  };
  const str = JSON.stringify(authObj);
  localStorage.setItem(authItemName, str);
}

function deleteAccessToken() {
  localStorage.removeItem(authItemName);
  sessionStorage.removeItem(authItemName);
}

function internalPost(
  url,
  data,
  headers,
  success,
  failure,
  error = defaultError
) {
  axios
    .post(url, data, { headers: headers })
    .then(({ data }) => {
      if (data.code === 200) success(data.data);
      else failure(data.message, data.code, url);
    })
    .catch((err) => error(err));
}

function internalGet(url, headers, success, failure, error = defaultError) {
  axios
    .get(url, { headers: headers })
    .then(({ data }) => {
      if (data.code === 200) success(data.data);
      else failure(data.message, data.code, url);
    })
    .catch((err) => error(err));
}

function login(username, password, success, failure = defaultFailure) {
  internalPost(
    "/user/login",
    {
      username: username,
      password: password,
    },
    // {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
    (data) => {
      console.log("111", data);
      storeAccessToken(data.data.token);
      ElMessage.success(`登录成功，欢迎来到我们的系统`);
      success(data);
    },
    failure
  );
}

function post(url, data, success, failure = defaultFailure) {
  internalPost(url, data, accessHeader(), success, failure);
}

function get(url, success, failure = defaultFailure) {
  internalGet(url, accessHeader(), success, failure);
}

function unauthorized() {
  return !takeAccessToken();
}

export { post, get, login, unauthorized };
