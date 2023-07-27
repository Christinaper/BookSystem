<template>
    <Layout>
        <template slot="header">
            <router-view></router-view>
            <div class="header-container">
                发现
            </div>
        </template>
        <template>
            <div class="main-container">
                <!-- input -->
                <div class="input-container">
                    <input type="text" ref="inputName" @click="$router.push('/home/search')">
                    <button @click="$router.push('/category')">
                        <span>分类</span>
                    </button>
                </div>
                <!-- swiper -->
                <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
                    <md-swiper
                        @before-change="beforeChange"
                        @after-change="afterChange"
                        :autoplay="5000"
                        transition="fade"
                        ref="swiper"
                    >
                    <md-swiper-item :key="$index" v-for="(item, $index) in simple">
                        <a href="javascript:void(0)"
                        class="banner-item"
                        :style="{'background': `${item.color}`}">{{item.text}}</a>
                    </md-swiper-item>
                    </md-swiper>
                </div>
                <!-- 编辑精选 -->
                <div class="edit">
                    <p class="edit-title">编辑精选</p>
                    <Card v-for="item in editList" :key="item.id" @click.native="getDetail(item.id)">
                        <template slot="avatar">
                            <img :src="item.avatar" alt="">
                        </template>
                        <template slot="title">
                            <span v-text="item.name"></span>
                        </template>
                        <template slot="option">
                            <button @click.stop="addCart(item.id)">
                                <book-one theme="filled" size="18" fill="#db214c"/>
                            </button>
                        </template>
                        <template slot="author">
                            <span v-text="item.author"></span>
                        </template>
                        <template slot="brief">
                            <p v-text="item.edit"></p>
                        </template>
                    </Card>
                </div>
                <!-- 榜单 -->
                <div class="leaderboard">
                    <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
                        <md-tabs>
                            <md-tab-pane 
                                v-for="(item, index) in tabList"
                                :key="index"
                                class="content"
                                :name="item.name"
                                :label="item.label"
                            >
                                <Card v-for="item in sortList(item.params.cid)" :key="item.id" @click.native="getDetail(item.id)">
                                    <template slot="avatar">
                                        <img :src="item.avatar" alt="">
                                    </template>
                                    <template slot="title">
                                        <span v-text="item.name" class="list-card-right"></span>
                                    </template>
                                    <template slot="option">
                                        <button @click.stop="addCart(item.id)">
                                            <book-one theme="filled" size="18" fill="#db214c"/>
                                        </button>
                                    </template>
                                    <template slot="author">
                                        <span v-text="item.author" class="list-card-right"></span>
                                    </template>
                                    <template slot="comment">
                                        <span class="list-card-right">
                                            <bookshelf theme="outline" size="13" fill="#db214c"/>
                                            今日阅读量{{ item.read }} | 
                                        </span>
                                        <span>
                                            <thumbs-up theme="outline" size="13" fill="#db214c"/>
                                            推荐值<span class="rate">{{ item.rate }}%</span>
                                        </span>
                                    </template>
                                </Card>
                            </md-tab-pane>
                        </md-tabs>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <Tabbar></Tabbar>
        </template>
    </Layout>
</template>

<script>
import { Layout, Tabbar, Card } from '@/components'
import { Bookshelf, ThumbsUp, BookOne } from '@icon-park/vue'

export default {
    name: 'HomeView',
    components: { Tabbar, Layout, Card, Bookshelf, ThumbsUp, BookOne },
    data() {
        return {
            simple: [
                { color: "#ca4040", text: "诚实是比同情更有效的良药，它有抚慰人心的力量，却往往深藏不露。" },
                { color: "#2abdb0", text: "我要听从的是我的本能对我说的话，而非世上大多数人将会对我说的话。" },
                { color: "#c2acfb", text: "“大多数值得做的事情都不简单。”" },
                { color: "#feac04", text: "改变习惯的最有效方法不是关注你想要达到的目标，而是你想要成为谁。" },
            ],
            list: [],
            editList: [],
            addCartList: {
                pid: null,
                count: 1,
            },
            editParams: {
                name: "",
                cid: null,
                orderCol: "rate",
                orderDir: "desc",
                pageSize: 100,
                begin: 0,
            },
            current: 0,
            tabList: [
                { name: "p1", label: "最热榜", params: { cid: 4 } },
                { name: "p2", label: "飙升榜", params: { cid: 3 }  },
                { name: "p3", label: "新书榜", params: { cid: 2 }  }
            ]
        }
    },
    computed: {
        sortList() {
            // 筛选5个
            return (cid) => {
                return this.list.filter(item => item.cid === cid).slice(0, 5)
            }
        }
    },
    methods: {
        async updateProduct() {
            const data = await this.$api.product.getData(this.editParams);
            // console.log(data);
            this.list = data;
            // 筛选cid为1的
            this.editList = data.filter(element => element.cid === 1);
        },
        setValue(id, value) {
            document.querySelector(id) && (document.querySelector(id).innerHTML = value)
        },
        beforeChange(from, to) {
            this.setValue('#valueSwiper10', from)
            this.setValue('#valueSwiper11', to)
        },
        afterChange(from, to) {
            this.setValue('#valueSwiper12', from)
            this.setValue('#valueSwiper13', to)
        },
        goto() {
            this.$refs.swiper.goto(2)
        },
        getDetail(id) {
            // console.log('id:' + id);
            this.$router.push({
                path: '/detail',
                query: {id: id}
            })
        },
        addCart(id) {
            console.log(id);
            this.addCartList.pid = id;
            this.$api.cart.getData("add", this.addCartList);
            // xxxxxxxxxxxxxxx
            this.$Notice('成功加入借阅')
        }
    },
    mounted() {
        window.triggerSwiper3 = () => {
            this.goto()
        }
    },
    async created() {

    },
    // 监听组件中的数据变化并执行相应的操作
    watch: {
        editParams: {
            handler() {
                this.updateProduct()
            },
            deep: true,
            immediate: true
        }
    },
    

}
</script>

<style lang="sass" scoped>
    ::v-deep .md-tab-bar-item
        font-size: 20px
        min-height: px2vw(60)
    .header-container
        height: px2vw(45)
        line-height: px2vw(45)
        text-align: center
    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        .input-container
            display: flex
            justify-content: space-between
            height: px2vw(36)
            margin: 0 px2vw(20) px2vw(20) px2vw(20)
            box-sizing: border-box
            // input
            input
                // width: 100%
                border: 2px solid #E3E5E7
                background-color: #f6f8fa
                text-indent: 1em
                outline: none
                flex-grow: 1
                margin-right: px2vw(10)
            button
                width: px2vw(36)
                height: px2vw(36)
                border: 2px solid #E3E5E7
                background-color: #fff
        // swiper
        .md-example-child-swiper-2
            height: px2vw(200)
            padding: 0 px2vw(20)
            .banner-item
                display: flex
                width: 100%
                height: 100%
                height: 180px
                font-size: 16px
                color: #FFF
                padding: 20px
                box-sizing: border-box
                align-items: center
                justify-content: center
                text-decoration-line: none
        .edit
            p.edit-title
                padding: 0 px2vw(20)
                height: px2vw(40)
                color: #db214c
                line-height: px2vw(40)
                font-size: 20px
                font-weight: 600
            button
                border-radius: 50%
                border: none
                width: px2vw(30)
                height: px2vw(30) 
                color: #db214c
                background-color: #f5e2e6
        .leaderboard
            button
                border-radius: 50%
                border: none
                width: px2vw(30)
                height: px2vw(30) 
                color: #db214c
                background-color: #f5e2e6
            .content
                margin: px2vw(12) 0
                // font-size: 28px
                background: #FFF
                line-height: 1.5
                box-sizing: border-box
                img
                    width: 65%
                .list-card-right
                    margin-left: px2vw(-15)
            .md-tabs-content
                min-height: 200px
                background: #FFF
</style>