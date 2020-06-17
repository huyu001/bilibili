import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register';
import Login from '@/views/Login';
import UserInfo from '@/views/UserInfo';
import EditUserInfo from '@/views/EditUserInfo';
import Article from '@/views/Article';
import editCate from '@/views/editCate';
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home'
}, {
    path: '/home',
    component: Home,
    meta: { isKeepAlive: true }
}, {
    path: '/register',
    component: Register
}, {
    path: '/Login',
    component: Login
}, {
    path: '/userInfo',
    component: UserInfo,
    meta: { istoken: true }
}, {
    path: '/edit',
    component: EditUserInfo,
    meta: { istoken: true }
}, {
    path: '/article/:id',
    component: Article
}, {
    path: '/editCate',
    component: editCate
}]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.istoken && (!localStorage.getItem('id') || !localStorage.getItem('token'))) {
        router.push('/login')
        return Vue.prototype.$message.fail('请先进行登录')
    }
    next()

})
export default router