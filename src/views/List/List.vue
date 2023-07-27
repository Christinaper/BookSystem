<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>{{ category }}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <Card v-for="item in categoryList" :key="item.id" @click.native="getDetail(item.id)">
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
            </div>
        </template>
        <template slot="footer">
            
        </template>
    </Layout>
</template>

<script>
    import { Layout, Card } from '@/components';
    import { Back, Bookshelf, ThumbsUp, BookOne } from '@icon-park/vue'



    export default {
        name: 'ListView',
        components: {
            Layout, Card,
            Back, Bookshelf, ThumbsUp, BookOne
        },
        data() {
            return {
                categoryList: [],
                category: "",
                listParams: {
                    name: "",
                    cid: null,
                    orderCol: "rate",
                    orderDir: "desc",
                    pageSize: 100,
                    begin: 0,
                },
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
        async created() {
            const cid = parseInt(this.$route.query.cid);
            this.listParams.cid = cid;
            const category = this.$route.query.category;
            this.category = category;
            const data =  await this.$api.product.getData(this.listParams)
            this.categoryList = data;
        }
    }
</script>

<style lang="sass" scoped>
    @import '@/assets/css/public.sass'
    .header-container
        height: px2vw(45)
        line-height: px2vw(45)
        text-align: center
        display: flex
        justify-content: space-between
        padding: 0 px2vw(20)
        box-sizing: border-box
    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        button
            border-radius: 50%
            border: none
            width: px2vw(30)
            height: px2vw(30) 
            color: #db214c
            background-color: #f5e2e6
</style>