<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>详情</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="book-detail">
                    <div class="b-d-left">
                        <img :src="list.avatar" alt="">
                    </div>
                    <div class="b-d-right">
                        <span class="bdr-title" v-text="list.name"></span>
                        <div class="bdr-author" v-text="list.author"></div>
                        <div class="book-category">
                            <span>{{ list.category }}</span>
                            <right theme="outline" size="18" fill="#fff" class="right-icon" />
                        </div>
                        <div class="rate-container">
                            <span>{{ list.rate }}%</span>
                            <div class="rate-bar">
                                <div class="rate" :style="{ width: list.rate + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="book-detail-bar">
                    <div>
                        <span>
                            <book-open theme="outline" size="20" fill="#333"/>
                            {{ list.read }}
                        </span>
                        <span>阅读</span>
                    </div>
                    <div>
                        <span>
                            <message-emoji theme="outline" size="20" fill="#333"/>
                            {{ list.rate }}%
                        </span>
                        <span>好评率</span>
                    </div>
                    <div>
                        <span v-if="list.stock > 0">
                            <add-two theme="outline" size="20" fill="#333"/>
                            可借阅
                        </span>
                        <span>库存：{{ list.stock }}</span>
                    </div>
                </div>
                <div class="book-brief">
                    <div class="book-brief-title">简介</div>
                    <p v-html="list.brief"></p>
                </div>
            </div>
        </template>
        <template slot="footer">
            <div class="footer-container" @click="addCart(list.id)">
                <backpack theme="multi-color" size="24" :fill="['#333' ,'#db214c' ,'#FFF' ,'#43CCF8']"/>
                <span>放入借阅包</span>
            </div>
        </template>
    </Layout>
</template>

<script>
    import { Layout } from '@/components';
    import { Back, BookOpen, MessageEmoji, AddTwo, Backpack, Right } from '@icon-park/vue'

    export default {
        name: 'DetailView',
        components: {
            Layout,
            Back, BookOpen, MessageEmoji, AddTwo, Backpack, Right
        },
        data() {
            return {
                list: [],
                addCartList: {
                    pid: null,
                    count: 1,
                },
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            
        },
        methods: {
            addCart(id) {
                console.log(id);
                this.addCartList.pid = id;
                this.$api.cart.getData("add", this.addCartList);
                // xxxxxxxxxxxxxxx
                this.$Notice('成功加入借阅')
        }
        },
        async mounted() {
            // 一定要parseInt
            const id = parseInt(this.$route.query.id) || 10;
            const data = await this.$api.product.getDetail(id);
            this.list = data;
            this.list.brief = data.brief.replace(/\\n/g, '<br>');
            // console.log(this.list.brief);
        },
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
        .book-detail
            display: flex
            padding: px2vw(10) px2vw(20)
            box-sizing: border-box
            .b-d-left
                flex: 1
                border: 1px solid #f0e9f8
                border-radius: 8px
                img
                    width: 100%
                    border-radius: 8px
            .b-d-right
                flex: 2
                padding: px2vw(10) px2vw(20)
                box-sizing: border-box
                display: flex
                flex-direction: column
                justify-content: space-between
                .bdr-title
                    font-size: 20px
                .bdr-author
                    color: #db214c
                    padding-top: px2vw(8)
                .rate-container
                    display: flex
                    align-items: center
                    font-size: 14px
                    .rate-bar
                        width: 100%
                        height: px2vw(8)
                        border: 2px solid #000
                        margin-left: px2vw(5)
                        box-sizing: border-box
                        .rate
                            height: 100%
                            background-color: #db214c
                .book-category
                    display: flex
                    padding: px2vw(3) px2vw(5)
                    font-size: 14px
                    border-radius: 8px
                    background-color: #db214c
                    color: #fff
                    width: fit-content
                    align-items: center
                    .right-icon
                        line-height: 0
        .book-detail-bar
            display: flex
            padding: px2vw(20) px2vw(20)
            justify-content: space-around
            text-align: center
            div
                // height: px2vw(45)
                // line-height: px2vw(45)
                display: flex
                flex-direction: column
                span
                    &:last-child
                        font-size: 12px
                        color: #868686
                        vertical-align: middle
                        
        .book-brief
            padding: 0 px2vw(20)
            .book-brief-title
                font-size: 20px
                font-weight: 600
                color: #db214c
                margin: 15px 0 10px 0
            p
                font-size: 15px
                line-height: 22px
    .footer-container
        height: px2vw(45)
        padding: 0 px2vw(20)
        display: flex
        align-items: center
                
</style>