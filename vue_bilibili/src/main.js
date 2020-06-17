import Vue from 'vue'
import http from './http';
import App from './App.vue'
import router from './router'
import '@/assets/css/normalize.css'
import '@/assets/css/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Dialog } from 'vant';
import { Toast } from 'vant'
import '@/assets/css/icons/iconfont.css';
// 全局注册（尽量还是选择按需导入，避免全局注册）
Vue.use(Dialog);
Vue.use(Vant)
Vue.prototype.$http = http
Vue.prototype.$message = Toast
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')