<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>个人主页</span>
                <span>
                    
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="avatar" @click="$router.push('/setting')">
                    <img :src="userInfo[0].avatar" alt="" v-if="userInfo && userInfo[0].name">
                    <div class="admin-tag"  v-if="userInfo[0].isAdmin === 1">
                        <flash-payment theme="two-tone" size="20" :fill="['#fff' ,'#ffb900']"/>
                        <span>Admin</span>
                    </div>
                    <div v-else></div>
                </div>
                <div v-text="userInfo[0].name" class="username"></div>
                <div class="cell-container">
                    <div class="cell" @click="$router.push('/setting')">
                        <div class="cell-left">
                            <people-top-card theme="outline" size="22" fill="#db214c"/>   
                            <div class="cell-text">个人信息</div>
                        </div>
                        <right theme="outline" size="22" fill="#db214c"/>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
        </template>
    </Layout>
</template>

<script>
    import { Layout, } from '@/components';
    import { Back, FlashPayment, PeopleTopCard,Right } from '@icon-park/vue'

    export default {
        name: 'AdminProfileView',
        components: {
            Layout,
            Back, FlashPayment, PeopleTopCard, Right
        },
        data() {
            return {

            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        methods: {

        },
        async created() {

        },
        // mounted: {

        // },
        watch: {

        }
    }
</script>

<style lang="sass" scoped>
    .header-container
        height: px2vw(45)
        padding: 0 px2vw(20)
        display: flex
        justify-content: space-between
        align-items: center
    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        .avatar
            text-align: center
            margin-top: px2vw(20)
            position: relative
            img
                width: 30%
                border: 3px solid #db214c
                border-radius: 50%
                padding: px2vw(5)
                box-sizing: border-box
            .admin-tag
                background-color: #fff
                // border: 3px solid #db214c
                border-radius: 12px
                width: 15%
                height: px2vw(20)
                font-size: 12px
                position: absolute
                bottom: 0
                left: 50%
                transform: translateX(-50%)
                display: flex
                align-items: center
                span
                    &:nth-child(1)
                        margin: 5px -2px 0 2px
                        box-sizing: border-box

        .username
            font-size: 25px
            font-weight: bold
            letter-spacing: 2px
            margin: px2vw(10) auto
            text-align: center
        .cell
            height: px2vw(50)
            display: flex
            align-items: center
            padding: 0 px2vw(20)
            justify-content: space-between
            .cell-left
                display: flex
                align-items: center
                .cell-text
                    margin-left: px2vw(10)
</style>