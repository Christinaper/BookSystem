<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>管理</span>
                <span>
                    
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <van-dropdown-menu active-color="#db214c">
                    <van-dropdown-item v-model="checkParams.state" :options="option" />
                    <!-- <van-dropdown-item title="筛选" ref="item">
                        <van-cell center title="已预约">
                            <template #right-icon>
                                <van-switch v-model="switch1" size="24" active-color="#db214c" />
                            </template>
                        </van-cell>
                        <van-cell center title="借阅中">
                            <template #right-icon>
                                <van-switch v-model="switch2" size="24" active-color="#db214c" />
                            </template>
                        </van-cell>
                        <van-cell center title="已归还">
                            <template #right-icon>
                                <van-switch v-model="switch3" size="24" active-color="#db214c" />
                            </template>
                        </van-cell>
                        <div style="padding: 5px 16px;">
                        <van-button color="#db214c" block round @click="onConfirm">
                            确认
                        </van-button>
                        </div>
                    </van-dropdown-item> -->
                    <van-dropdown-item title="检索" ref="item">
                        <van-cell center title="借阅者姓名">
                            <van-search
                                v-model="checkParams.uName"
                                placeholder="精确输入借阅者姓名"
                                input-align="center"
                            />
                        </van-cell>
                        <van-cell center title="书名">
                            <van-search
                                v-model="checkParams.name"
                                placeholder="请输入书名关键字"
                                input-align="center"
                            />
                        </van-cell>
                        <div style="padding: 5px 16px;">
                        <van-button color="#db214c" block round @click="onConfirm">
                            搜索
                        </van-button>
                        </div>
                    </van-dropdown-item>
                </van-dropdown-menu>
                <div class="card" v-for="item in order" :key="item.id" >
                    <div class="card-title">
                        <span v-text="item.orderId"></span>
                        <van-tag plain color="#db214c">{{ item.uName }}</van-tag>
                    </div>
                    <div class="card-content">
                        <div v-for="(detail, index) in item.details" :key="index">
                            <div class="content-span">
                                <van-tag round type="primary" v-if="detail.state === 'reverse'">{{ detail.state }}</van-tag>
                                <van-tag round color="#db214c" v-else-if="detail.state === 'returned'">{{ detail.state }}</van-tag>
                                <van-tag round type="success" v-else-if="detail.state === 'borrowing'">{{ detail.state }}</van-tag>
                                <span class="detail-name" v-text="detail.name"></span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <calendar theme="outline" size="20" fill="#333"/>
                        <span class="order-time" v-text="item.orderTime"></span>
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
    import { Back, Calendar } from '@icon-park/vue'

    export default {
        name: 'AdminView',
        components: {
            Layout,
            Back, Calendar
        },
        data() {
            return {
                order: [],
                activeNames: ['1'],
                switch1: true,
                switch2: true,
                switch3: true,
                option: [
                    { text: '总览', value: '' },
                    { text: '借阅中', value: 'borrowing' },
                    { text: '已预约', value: 'reverse' },
                    { text: '已归还', value: 'returned' },
                ],
                checkParams: {
                    uName: "",
                    name: "",
                    state: ""
                }
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {

        },
        methods: {
            onConfirm() {
                console.log(this.$refs.item);
                this.$refs.item.toggle();
            },
            async queryOrder() {
                console.log('update');
                const data = await this.$api.order.queryOrder(this.checkParams);
                this.order = data;
                console.log(this.checkParams.state);
                // console.log(this.order);
            }
        },
        async created() {
            const order = await this.$api.order.getAllOrder();
            console.log(order);
            this.order = order;
            // this.order = Object.freeze(order);
            // 进入更新
            this.queryOrder();
        },
        // mounted: {

        // },
        watch: {
            checkParams: {
                handler() {
                    this.queryOrder();
                },
                deep: true,
                immediate: true,
            }
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
        .card
            margin: px2vw(10) px2vw(20)
            border: 2px solid #333
            border-radius: 8px
            box-sizing: border-box
            .card-title
                display: flex
                justify-content: space-between
                padding: px2vw(10) px2vw(10)
            .card-content
                padding: 0 px2vw(10) px2vw(10) px2vw(10)
                .content-span
                    margin-top: px2vw(8)
                    .detail-name
                        padding-left: px2vw(8)
            .card-footer
                padding: px2vw(5) px2vw(10)
                display: flex
                align-items: center
                .order-time
                    font-size: 14px
                    padding-left: px2vw(8)
            
</style>