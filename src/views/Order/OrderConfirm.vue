<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>借阅确认</span>
                <span>
                    
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="address" @click="addressShow = true">
                    <div class="receiveRegion" v-text="addressDefault.receiveRegion"></div>
                    <div class="address-content">
                        <span class="receiveDetail" v-text="addressDefault.receiveDetail"></span>
                        <arrow-right theme="outline" size="24" fill="#58727e"/>
                    </div>
                    <div>
                        <span v-text="addressDefault.name"></span>
                        <span class="receivePhone" v-text="addressDefault.receivePhone"></span>
                    </div>
                </div>
                <div class="order-img-container" @click="detailShow = true">
                    <div class="img-container">
                        <img  v-for="item in list.slice(0, 4)" :key="item.id" :src="item.avatar" alt="">
                    </div>
                    <span>共{{ total }}本</span>
                </div>
                <van-action-sheet v-model="detailShow" title="清单">
                    <div class="content">
                        <Card v-for="(item) in list" :key="item.id">
                            <template slot="avatar">
                                <img :src="item.avatar" alt="">
                            </template>
                            <template slot="title">
                                <span v-text="item.name"></span>
                            </template>
                            <template slot="author">
                                <span v-text="item.author"></span>
                            </template>
                            <template slot="option">
                            </template>
                            <template slot="comment">
                                <div>x {{ item.count }}</div>
                                <span>{{ item.borrowRange }}</span>
                            </template>
                        </Card>
                    </div>
                </van-action-sheet>
                <van-action-sheet v-model="addressShow" title="收货地址">
                    <div class="content">
                        <!-- <div class="b-a-info">
                            <div>
                                <span v-text="item.receiveName"></span>
                                <span v-if="item.isDefault === 1" class="defaultTag">默认</span>
                                <div>
                                    <span v-text="item.receivePhone"></span>
                                </div>
                            </div>
                            <span class="option">
                                <edit theme="outline" size="20" fill="#fff" @click="$router.push({path:'/address/update', query: {id: item.id}})" />
                            </span>
                        </div>
                        <div class="b-a-ad">
                            <p>{{ item.receiveRegion }}-{{ item.receiveDetail }}</p>
                        </div> -->
                    </div>
                </van-action-sheet>
            </div>
        </template>
        <template slot="footer">
            <div class="footer-container">
                <span>“朝饮木兰之坠露兮，夕餐秋菊之落英”</span>
                <span @click="submitOrder">提交</span>
            </div>
        </template>
    </Layout>
</template>

<script>
    import { Layout, Card } from '@/components';
    import { Back, ArrowRight } from '@icon-park/vue'

    export default {
        name: 'OrderConfirmView',
        components: {
            Layout, Card,
            Back, ArrowRight
        },
        data() {
            return {
                list: [],
                addressDefault: "",
                addressList: [],
                total: "",
                addressShow: false,
                detailShow: false
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            orderConfirm() {
                return {
                    ids: this.list.map(item => item.id),
                    account: 0,
                    addressId: this.addressDefault.id,
                }
            }
        },
        methods: {
            async submitOrder() {
                // console.log(this.orderConfirm);
                this.$Confirm('借阅').then(
                    async () => {
                        await this.$api.order.confirm(this.orderConfirm);
                        this.$Notice("借阅成功");
                        this.$router.replace("/orderState");
                    },
                    () => {}
                )
            }
        },
        async created() {
            // 默认地址
            const data = await this.$api.address.getDefault();
            console.log(data);
            this.addressDefault = data;
            // 
            const address = await this.$api.address.getData();
            this.addressList = Object.freeze(address);
            // 书目
            const list = await this.$api.cart.getList();
            this.list = list;
            // 总计数目
            const total = await this.$api.cart.getTotal();
            this.total = total;
        },
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
        .address
            padding: 0 px2vw(20)
            display: flex
            flex-direction: column
            // background-image: url(./address-bg.jpg)
            background-repeat: no-repeat
            .receiveRegion
                color: #58727e
            .address-content
                display: flex
                justify-content: space-between
                align-items: center
                .receiveDetail
                    margin-top: px2vw(10)
            span
                font-size: 18px
                font-weight: 600
                line-height: px2vw(25)
            .receivePhone
                margin-left: px2vw(20)
        .order-img-container
            display: flex
            justify-content: space-between
            height: px2vw(100)
            line-height: px2vw(80)
            margin-top: px2vw(10)
            padding: px2vw(8) px2vw(20)
            box-sizing: border-box
            .img-container
                display: flex
                background-color: #f5e2e6
                img
                    height: 100%
                    padding-right: px2vw(10)
    .footer-container
        line-height: px2vw(40)
        display: flex
        span
            color: #fff
            &:nth-child(1)
                text-align: center
                background-color: #333
                flex: 3
            &:nth-child(2)
                text-align: center
                background-color: #db214c
                flex: 1
                
                
</style>