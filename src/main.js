import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css'
import elementUi from 'element-ui'
import './assets/fonts/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios的请求拦截器(在其中配置token)
axios.interceptors.request.use(
  function(config) {
    // config:代表axios的子级配置对象
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(elementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
