import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import less from 'less'


// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//粒子效果
import VueParticles from 'vue-particles'
Vue.use(VueParticles)


Vue.config.productionTip = false
// 使用
Vue.use(ElementUI);
Vue.use(less)
//拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = token //请求头加上token
    }
    return config
  },
  error => {
    return Promise.error(error);
  }
)

axios.interceptors.response.use(response => {
  if (response.data.code == 403) {
    ElementUI.Message.error('当前登录已失效，请重新登录')
    router.replace({ path: '/login' })
  }
  return response;
}, error => {
  return Promise.reject(error.response.data)  //返回接口返回的错误信息
})



//全局守卫
router.beforeEach((to, form, next) => {
  //如果进入到的路由是登录页或者注册页面，则正常展示
  if (to.path == '/login' || to.path == '/register') {
    next();
  } else if (!(localStorage.getItem('token'))) {
    ElementUI.Message.warning({
      message: '请登录',
      center: true
    });
    next('/login');     //转入login登录页面，登录成功后会将token存入localStorage
  } else {
    next();
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


