<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>借阅历史</span>
                <span>
                    
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="book-order" 
                    v-for="(item, index) in list" 
                    :key="item.id"
                >
                    <div class="order-card-title">
                        <span>借阅编号：{{ item.orderId }}</span>
                        <span class="order-state">借阅中</span>
                    </div>
                    <div class="order-img-container" @click="detailShow = true">
                        <div class="img-container">
                            <img  v-for="(item) in item.details.slice(0, 4)" :key="item.id" :src="item.avatar" alt="">
                        </div>
                        <span>共{{ total[index] }}本</span>
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
    import { Back,  } from '@icon-park/vue'

    export default {
        name: 'OrderView',
        components: {
            Layout,
            Back, 
        },
        data() {
            return {
                list: [],
                detailShow: false,
                cardShow: false
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            total() {
                return this.list.map((item) => {
                    return item.details.reduce((acc, cur) => acc + cur.count, 0);
                });
            } 
        },
        methods: {

        },
        async created() {
            // 书目
            const list = await this.$api.order.getList();
            console.log(list);
            this.list = Object.freeze(list);
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
        .book-order
            padding: px2vw(10) px2vw(20)
            margin-top: px2vw(10)
            box-sizing: border-box
            // background-color: #db214c
            border-bottom: 2px solid #333
            .order-card-title
                display: flex
                justify-content: space-between
            .order-state
                color: #fff
                background-color: #07c160
            .order-img-container
                display: flex
                justify-content: space-between
                height: px2vw(100)
                line-height: px2vw(80)
                margin-top: px2vw(10)
                padding: px2vw(8) 0
                box-sizing: border-box
                .img-container
                    display: flex
                    background-color: #f5e2e6
                    img
                        height: 100%
                        padding-right: px2vw(10)

</style>