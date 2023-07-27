<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <div v-if="userInfo && userInfo[0].name">
                    <span v-text="userInfo[0].name"></span>
                    <hand-right theme="outline" size="24" fill="#fff"/>
                </div>
                <div v-else class="login-btn" @click="$router.push('/login')">
                    <web-page theme="multi-color" size="24" :fill="['#fff' ,'#fff' ,'#db214c' ,'#43CCF8']"/>
                    <span>请登录</span>
                </div>
                <img :src="userInfo[0].avatar" alt="" v-if="userInfo && userInfo[0].name" @click="$router.push('/profilee')">
                <div v-else></div>
            </div>
        </template>
        <template>
            <div class="main-container">
                <!-- <button @click="$router.push('/login')">登录</button> -->
                <div class="cell" @click="$router.push('/orderState')">
                    <workbench theme="outline" size="22" fill="#db214c"/>
                    <div class="cell-text">借阅状态</div>
                </div>
                <div class="cell" @click="$router.push('/address')">
                    <local theme="outline" size="22" fill="#db214c"/>
                    <div class="cell-text">我的地址</div>
                </div>
                <div class="cell" @click="$router.push('/order')">
                    <history theme="outline" size="22" fill="#db214c"/>
                    <div class="cell-text">借阅历史</div>
                </div>
                <div class="cell" @click= goToTu>
                    <blossom theme="outline" size="22" fill="#db214c"/>
                    <div class="cell-text">关于蕊兰汀</div>
                </div>
                <div class="cell" @click= goToTu>
                    <topic theme="outline" size="22" fill="#db214c"/>                    
                    <div class="cell-text">用户说</div>
                </div>
                <div class="cell" @click="$router.push('/logout')">
                    <logout theme="outline" size="22" fill="#db214c"/>
                    <div class="cell-text">退出登录</div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <Tabbar></Tabbar>
        </template>
    </Layout>
</template>

<script>
    import { Layout, Tabbar } from '@/components'
    import { Local, History, Blossom, Topic, HandRight, WebPage, Workbench, Logout } from '@icon-park/vue'

    export default {
        name: 'ProfileView',
        components: {
            Tabbar, Layout,
            Local, History, Blossom, Topic, HandRight, WebPage, Workbench, Logout
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        methods: {
            goToTu() {
                window.location.href='https://support.qq.com/product/593108';
            }
        }
    }
</script>

<style lang="sass" scoped>
    .header-container
        height: px2vw(130)
        background-image: url(./profile-bg.png)
        background-color: #db214c
        padding: 0 px2vw(25)
        box-sizing: border-box
        display: flex
        justify-content: space-between
        align-items: center
        .login-btn
            display: flex
            align-items: center
            color: #fff
            span
                font-size: 22px
                margin-left: px2vw(10)
        img
            height: 70%
            border-radius: 50%
        span
            color: #fff
            font-size: px2vw(26)
            font-weight: bold
    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: hidden
        .cell
            height: px2vw(50)
            display: flex
            align-items: center
            padding: 0 px2vw(20)
            .cell-text
                margin-left: px2vw(10)

</style>