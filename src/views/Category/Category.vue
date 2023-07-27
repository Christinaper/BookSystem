<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>分类</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="category-container">
                    <p v-for="item in categoryList" :key="item.id" @click="getList(item.id, item.name)">
                        <img :src="item.avatar" alt="">
                        <span v-text="item.name"></span>
                    </p>
                </div>
            </div>
        </template>
        <template slot="footer">
            
        </template>
    </Layout>
</template>

<script>
    import { Layout } from '@/components';
    import { Back } from '@icon-park/vue'


    export default {
        name: 'CategoryView',
        components: {
            Layout,
            Back,
        },
        data() {
            return {
                categoryList: []
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            
        },
        methods: {
            async getList(id, category) {
                this.$router.push({
                    path: '/list',
                    query: { cid: id, category: category }
                })
            }
        },
        async created() {
            const data = await this.$api.category.getAll();
            console.log(data);
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
        .category-container
            display: grid
            grid-template-columns: repeat(2, 1fr)
            grid-gap: px2vw(10)
            margin: 0 px2vw(20)
            p
                display: flex
                align-items: center
                height: px2vw(80)
                background-color: #f5e2e6
                padding: px2vw(8)
                border-radius: px2vw(8)
                box-sizing: border-box
                img
                    height: 100%
                span
                    padding-left: px2vw(15)
</style>