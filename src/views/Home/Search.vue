<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <div class="header-title">
                    <span>
                        <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                    </span>
                    <span>搜索</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                </div>
                <div class="md-example-child md-example-child-input-item-4">
                    <md-field>
                        <md-input-item
                            v-model="search.name"
                            ref="input"
                            placeholder="请输入'书名' / '作者' / '分类'搜索"
                            clearable
                        >
                            <md-icon name="search" slot="left" @click="searchHandler"></md-icon>
                        </md-input-item>
                    </md-field>
                </div>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="card-search-container">
                    <p class="search-title" v-if="search.name">关于"{{search.name}}"的检索结果：</p>
                    <p v-else></p>
                    <p ref="tip" class="tip" v-html="tip"></p>
                    <div v-if="search.name">
                        <Card v-for="item in list" :key="item.id" @click.native="getDetail(item.id)">
                            <template slot="avatar">
                                <img :src="item.avatar" alt="">
                            </template>
                            <template slot="title">
                                <span v-text="item.name"></span>
                            </template>
                            <template slot="author">
                                <span v-text="item.author"></span>
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
                    <div v-else></div>
                </div>
            </div>
        </template>
        <template slot="footer">
        </template>
    </Layout>
</template>

<script>
    import { Layout, Card } from '@/components';
    import { Bookshelf, ThumbsUp, Back } from '@icon-park/vue'
    
    export default {
        name: 'ListView',
        components: {
            Layout, Card,
            Bookshelf, ThumbsUp, Back
        },
        data() {
            return {
                list: [],
                search: {
                    name: "",
                    cid: null,
                    orderCol: "rate",
                    orderDir: "desc",
                    pageSize: 100,
                    begin: 0,
                }
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            tip() {
                if(!this.search.name) return `
                    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M244.676 51.882H96v167.905h148.676V51.882Z" fill="#D6DAE1"/><path d="M225.927 70.015H114.293v134.207h111.634V70.015Z" fill="#EFF2F4"/><path d="M173.478 71.86 139.432 33h66.996l-32.95 38.86Z" fill="#B3BEC9"/><path d="m216.538 217.301 42.043 49.879" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M244.328 133.776c8.434 0 15.272-6.837 15.272-15.272 0-8.434-6.838-15.271-15.272-15.271-8.434 0-15.271 6.837-15.271 15.271 0 8.435 6.837 15.272 15.271 15.272Z" fill="#005DFF"/><path d="M222.611 104.677s31.185-42.552 69.003.241c0 0-36.374 39.716-69.003-.241Z" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M269.094 46.8s39.636 9.575 33.832 45.948c-5.803 36.374-13.693 54.962-13.693 54.962l14.308 14.121" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M214.293 92.4h-84.942v2.007h84.942V92.4ZM214.293 105.96h-84.942v2.006h84.942v-2.006ZM214.293 119.547h-84.942v2.006h84.942v-2.006ZM214.293 133.107h-84.942v2.006h84.942v-2.006ZM160.241 146.667h-30.89v2.032h30.89v-2.032Z" fill="#fff"/><path d="M188.538 122.302a54.96 54.96 0 0 0-10.576 108.874 54.96 54.96 0 1 0 10.576-108.874Zm0 97.62a42.791 42.791 0 0 1-30.259-73.051 42.793 42.793 0 1 1 30.259 73.051Z" fill="#FF3640"/><path d="m235.287 130.004-31.559 38.326" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="m201.481 157.365 2.113-.134.642 10.484 10.404-1.391.294 2.113-12.677 1.685-.776-12.757Z" fill="#231815"/></svg>
                `
                else if(this.list.length === 0) 
                    return `
                        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M288.99 61.786H100.17v163.279h188.82V61.786Z" fill="#D6DAE1"/><path d="M268.902 79.439H119.424v126.45h149.478V79.439Z" fill="#EFF2F4"/><path d="m240.74 148.013 19.792 40.225" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M243.602 106.584h-97.7v2.06h97.7v-2.06ZM243.602 120.573h-97.7v2.059h97.7v-2.059ZM243.602 134.534h-97.7v2.059h97.7v-2.059ZM243.602 148.495h-97.7v2.059h97.7v-2.059ZM181.42 162.482h-35.518v2.086h35.518v-2.086Z" fill="#fff"/><path d="M135.419 21s44.745 65.205 48.141 71.623c9.174 17.358 7.783 27.013-4.119 26.746-6.766-.134-15.271-6.5-28.162-23.777" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M143.656 68.125s19.844 19.738 2.674 35.464a14.012 14.012 0 0 1-16.796 1.953" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M114.691 106.478c3.985 4.6 14.47 3.691 19.578-7.194 6.071-12.892-6.686-27.682-6.686-27.682" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M110.598 83.236s11.768 7.57 5.135 20.006c-6.632 12.436-15.512 9.976-22.332 7.729a41.781 41.781 0 0 1-16.368-13.373c-5.857-10.002 1.043-19.443 7.382-18.908" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M70 56.411s21.396 34.93 26.96 37.443c0 0 6.097 2.996-3.398 5.35" stroke="#231815" stroke-width="2.14" stroke-miterlimit="10"/><path d="M330.095 210.436c-4.199-4.573-10.243-10.243-24.418-23.91-9.602-9.254-24.151-16.769-39.422-14.308-28.671 4.707-51.378 19.47-56.593 22.653-6.553 3.958-6.954 19.042 9.334 16.047a62.008 62.008 0 0 0 24.071-9.361" stroke="#231815" stroke-width="2.059" stroke-miterlimit="10"/><path d="M220.574 210.73s-10.698 9.629-.562 15.834c7.863 4.84 31.025-4.815 40.412-10.886" stroke="#231815" stroke-width="2.059" stroke-miterlimit="10"/><path d="M228.732 227.633s-9.174 7.542-2.675 14.549c7.302 7.73 40.118-5.349 45.306-7.783 7.222-3.316 4.494-9.628 1.739-10.698" stroke="#231815" stroke-width="2.059" stroke-miterlimit="10"/><path d="M237.131 244.349s-6.125 4.547-.696 11.5c6.259 8.024 29.688-1.069 37.23-4.466 6.445-2.915 8.023-9.655 4.76-12.543M289.549 220.786s-22.091-2.246-35.597-8.237c-10.297-4.547-17.198-15.86-8.693-21.396 10.431-6.927 35.09 2.3 35.09 2.3M269.599 256.946l21.61 22.68" stroke="#231815" stroke-width="2.059" stroke-miterlimit="10"/><path d="M262.351 69.837c-17.277-29.955-50.816-41.696-73.041-28.912-22.225 12.785-28.697 48.142-11.42 78.257 17.277 30.115 51.805 43.086 73.977 30.302 22.172-12.784 27.761-49.666 10.484-79.647Zm-72.934 43.354c-13.372-23.295-10.35-50.227 6.874-60.15 17.224-9.922 42.043.91 55.469 24.204 13.426 23.295 10.35 50.201-6.873 60.123-17.224 9.923-42.044-.909-55.47-24.177Z" fill="#FF3640"/><path d="M142.96 196.555c5.702 0 10.324-4.622 10.324-10.323 0-5.702-4.622-10.324-10.324-10.324-5.701 0-10.323 4.622-10.323 10.324 0 5.701 4.622 10.323 10.323 10.323Z" fill="#005DFF"/></svg>
                    `;
                else return ``;
            }
        },
        methods: {
            searchHandler() {
                this.search.name = this.$refs.input.value;
            },
            // 防抖
            updateProductDebounced: debounce(function() {
                this.updateProduct();
            }, 500),
            async updateProduct() {
                const data = await this.$api.product.getData(this.search);
                // console.log(data);
                this.list = data;
            },
            getDetail(id) {
                // console.log('id:' + id);
                this.$router.push({
                    path: '/detail',
                    query: {id: id}
                })
            },
        },
        created() {

        },
        watch: {
            search: {
                handler() {
                    // 防抖
                    this.updateProductDebounced();
                },
                deep: true,
                immediate: true,
            }
        }
    }
    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
            func.apply(context, args);
            }, wait);
        };
    }
</script>

<style lang="sass" scoped>
    ::v-deep .md-field
            padding: 0 px2vw(20)
            .md-field-item-content
                min-height: px2vw(50)
            .md-input-item-input
                font-size: 16px
                height: px2vw(50)
                font-family: JinBu
            .md-icon.icon-svg.md
                width: 20px
                height: 20px
                line-height: 20px
    @import '@/assets/css/public.sass'
    .header-container
        height: px2vw(100)
        .header-title
            height: px2vw(45)
            line-height: px2vw(45)
            display: flex
            justify-content: space-between
            padding: 0 px2vw(20)
    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        .search-title
            margin: px2vw(10) px2vw(20)
            box-sizing: border-box
</style>