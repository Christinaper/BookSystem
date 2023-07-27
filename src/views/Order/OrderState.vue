<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>借阅状态</span>
                <span>
                    
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <van-tabs v-model="activeName">
                    <van-tab v-for="item in tabs" :key="item.id" :title="item.title" :name="item.name" @click="activeName = item.name">
                        <div class="grid-container">
                            <div class="grid-item">
                                <!-- <div class="order-card-title" v-for="item in list" :key="item.id">
                                    <span>{{ item.orderTime }}</span>
                                </div> -->
                                <div class="order-img-container" @click="detailShow = true">
                                    <div class="img-container" v-for="(detail, index) in filteredDetails" :key="index">
                                        <img :src="detail.avatar" alt="">
                                        <van-button color="#07c160" size="mini" v-if="detail.state === 'borrowing'" @click="updateState(detail.orderId, detail.id)">归还</van-button>
                                        <van-button color="#db214c" size="mini" v-else-if="detail.state === 'reserve'">{{ detail.borrowRange }}取消预约</van-button>
                                        <van-button color="#db214c" size="mini" v-else>{{ detail.state }}</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </template>
        <template slot="footer">
        </template>
    </Layout>
</template>

<script>
    import { Layout, } from '@/components';
    import { Back,  } from '@icon-park/vue'

    export default {
        name: 'OrderStateView',
        components: {
            Layout,
            Back, 
        },
        data() {
            return {
                activeName: "borrowing",
                list: [],
                tabs: [
                    { id: 1, title: "预约", name: "reverse" },
                    { id: 2, title: "借阅中", name: "borrowing" },
                    { id: 3, title: "已归还", name: "returned" }
                ],
                updateStateParams: {
                    orderId: "",
                    pid: null,
                    state: "returned"
                }
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            filteredDetails() {
                console.log('active' + this.activeName);
                return this.list.flatMap(item => item.details.filter(detail => detail.state === this.activeName));
            }
        },
        methods: {
            async updateState(orderId, id) {
                console.log(orderId, id);
                this.updateStateParams.pid = id;
                this.updateStateParams.orderId = orderId;
                this.$Confirm('是否归还').then(
                    async () => {
                        await this.$api.order.updateState(this.updateStateParams);
                        this.list = await this.$api.order.getList();
                        this.$Notice("还书成功");
                    },
                    () => {}
                )
            }
        },
        async created() {
            // 书目
            const list = await this.$api.order.getList();
            console.log(list);
            this.list = Object.freeze(list);
        },
        // mounted: {
        //     // async updateStatus() {
        //     //     await
        //     // }
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
        .grid-container
            margin-top: px2vw(20)
            padding: 0 px2vw(20)
            // display: grid
            // grid-template-columns: repeat(3, 1fr)
            // grid-gap: px2vw(10)
            // margin: 0
            .order-img-container
                display: grid
                grid-template-columns: repeat(3, 1fr)
                grid-gap: px2vw(10)
                text-align: center
                img
                    width: 100%
                    border-radius: 8px 
                    // height: 100%
        
</style>