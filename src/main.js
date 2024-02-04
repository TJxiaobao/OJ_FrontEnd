import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import store from './store' //引入 Vuex 状态管理

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
