import Vue from 'vue'
// vue-router
// 1. 导入接收一个一个构造函数
// 2. 让vue去use一下
// 3. new第一步的构造函数创建一个路由对象，并定义路由地图
// 4. 在vue的根实例（董事长）里用router键注册对象
// 5. 找一个合适的地方使用router-view指定为动态组件渲染点
import VueRouter from 'vue-router'
import store from '@/store';

Vue.use(VueRouter);

// 管理员路由配置
const adminRoutes = [
    {
        path: '/admin',
        name: 'AdminView',
        component: () => import('@/views/Admin/Admin.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        }
    },
    {
        path: '/homee',
        name: 'AdminHomeView',
        component: () => import('@/views/Admin/AdminHome.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        }
    },
    {
        path: '/profilee',
        name: 'AdminProfileView',
        component: () => import('@/views/Admin/AdminProfile.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        }
    },
    {
        path: '/setting',
        name: 'AdminProfileSettingView',
        component: () => import('@/views/Admin/ProfileSetting.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        }
    },
    // { 
    //     path: "/address",
    //     meta: {needAuth: true},
    //     name: "Address",
    //     component: () => import('@/views/Address/Address.vue'),
    //     children: [ // 嵌套路由
    //         {path: "add", component: () => import('@/views/Address/AddressAdd.vue')},
    //         {path: "update", component: () => import('@/views/Address/AddressUpdate.vue')},
    //     ]
    // },
    {
        path: '/manage',
        name: 'AdminManageView',
        component: () => import('@/views/Admin/Manage/Manage.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        },
        children: [ // 嵌套路由
            {path: "add", component: () => import('@/views/Admin/Manage/BookAdd.vue')},
            // {path: "update", component: () => impor@/views/Admin/Search.vuee.vue')},
        ]
    },
    {
        path: '/searchh',
        name: 'search',
        component: () => import('@/views/Admin/AdminSearch.vue'),
        meta: {
            // needAdmin: true, // 需要管理员权限
            needAuth: true // 需要登录权限
        }
    },
]

// 普通用户路由配置
const userRouters = [
    { path: "/", redirect: "/home" },
    { 
        path: "/login", name: "Login", 
        component: () => import('@/views/Login/Login.vue'),
        beforeEnter: (to, from, next) => {
            Vue.prototype.$Confirm('是否同意并登录')
                .then(
                    () => next(),
                    () => {},
                )
        }
    },
    { 
        path: "/logout", name: "Logout", 
        component: () => import('@/views/Login/Login.vue'),
        beforeEnter: (to, from, next) => {
            Vue.prototype.$Confirm('是否退出登录')
                .then(
                    () => next(),
                    () => {},
                )
        }
    },
    { path: "/register", name: "RegisterView", component: () => import('@/views/Login/Register.vue') },
    { 
        path: "/home",  
        name: "HomeView", 
        component: () => import('@/views/Home/Home.vue'),
        children: [
            {path: "search", component: () => import('@/views/Home/Search.vue')}
        ]
    },
    { path: "/borrow", name: "BorrowView", component: () => import('@/views/Borrow/Borrow.vue') },
    { path: "/profile",  name: "ProfileView", component: () => import('../views/Profile/Profile.vue') },
    { path: "/category", name: "Category", component: () => import('@/views/Category/Category.vue') },
    { path: "/list", name: "List", component: () => import('@/views/List/List.vue') },
    { path: "/detail", name: "Detail", component: () => import('@/views/Detail/Detail.vue') },
    { 
        path: "/address",
        meta: {needAuth: true},
        name: "Address",
        component: () => import('@/views/Address/Address.vue'),
        children: [ // 嵌套路由
            {path: "add", component: () => import('@/views/Address/AddressAdd.vue')},
            {path: "update", component: () => import('@/views/Address/AddressUpdate.vue')},
        ]
    },
    { path: "/orderConfirm", name: "OrderConfirm", component: () => import('@/views/Order/OrderConfirm.vue') },
    { path: "/order", name: "Order", component: () => import('@/views/Order/Order.vue') },
    { path: "/orderState", name: "OrderState", component: () => import('@/views/Order/OrderState.vue') },
]
const router = new VueRouter({
    routes: [
        ...userRouters,
        ...adminRoutes
    ]
})

// 创建新的路由
// const createRouter = () => new VueRouter({
//     routes: userRouters, // 初始的静态路由
// })

// let router = createRouter();

// // 动态添加管理员路由
// function addAdminRoutes() {
//     router.addRoutes(adminRoutes);
// }
// // 动态删除管理员路由
// function removeAdminRotes() {
//     router = createRouter();
// }

router.beforeEach(async (to, from, next) => {
    // 判断是否需要登录权限|管理员权限
    if(to.meta.needAuth) {
        // 判断是否登录
        if (!sessionStorage.getItem("token")) {
            next({ path: '/login', query: { target: to.fullPath } });
        } else {
            // 不需要登录权限的页面可以直接导航
            // 获取用户信息
            await Promise.all([
                store.dispatch('getUserInfo'),
                store.dispatch('getAddressList')
            ]);
            // console.log(userRouters);
            // console.log(555);
            // // 判断用户为管理员
            // const isAdmin = store.state.userInfo[0].isAdmin;
            // if (isAdmin) {
            //     // 添加管理员路由
            //     console.log(1212);
            //     router.addRoutes(adminRoutes);
            //   } else {
                // 删除管理员路由
                // if (router.options.routes.find(route => route.path === '/admin')) {
                //   const filteredRoutes = router.options.routes.filter(route => route.path !== '/admin');
                //   router.options.routes = filteredRoutes;
                //   router.matcher = new VueRouter().matcher;
                // }
            //   }
            // if(isAdmin) {
            //     addAdminRoutes();
            // } else {
            //     removeAdminRotes();
            // }
            next();
        }
    } else {
        next();
    }
});
  
// 第四步, 路由对象
export default router