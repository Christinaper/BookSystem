<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                借阅包
            </div>
        </template>
        <template>
            <div class="main-container">
                <div class="borrow">
                    <div class="md-example-child md-example-child-tabs md-example-child-tabs-0">
                        <div v-if="list.length === 0" class="nores">
                            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M312.301 54.578H105.16v171.088h207.141V54.578Z" fill="#D6DAE1"/><path d="m143.672 57.306-26.211 114.041c-1.337 5.937-11.527 32.094-16.341 36.213l167.291 37.791s10.243-4.922 17.678-37.845l25.97-112.65-168.387-37.55Z" fill="#EFF2F4"/><path d="M171.111 73.78a19.392 19.392 0 0 1-19.018-23.173 19.387 19.387 0 0 1 15.235-15.234 19.39 19.39 0 0 1 23.173 19.017v.776M241.586 73.78a19.392 19.392 0 0 1-19.018-23.173 19.387 19.387 0 0 1 15.235-15.234 19.39 19.39 0 0 1 23.173 19.017v.776" stroke="#231815" stroke-width="1.952" stroke-miterlimit="10"/><path d="m186.89 116.86-25.213-5.636-4.924 22.029 25.213 5.636 4.924-22.029ZM230.166 126.521l-25.214-5.636-4.924 22.03 25.214 5.636 4.924-22.03Z" fill="#fff"/><path d="m272.199 135.921-25.214-5.636-4.924 22.03 25.214 5.635 4.924-22.029Z" fill="#005DFF"/><path d="m263.051 176.881-25.213-5.636-4.924 22.03 25.213 5.635 4.924-22.029Z" fill="#fff"/><path d="m107.03 263.002-14.308-17.277 93.099-80.557 14.309 17.304-93.1 80.53ZM205.506 154.337 215 165.811l4.547-14.389-.695-1.124-13.346 4.039Z" fill="#FF3640"/><path d="m188.897 157.867 31.185-7.702-11.768 29.767M171.568 192.342 87 265.57" stroke="#231815" stroke-width="2.781" stroke-miterlimit="10"/></svg>
                            <span>当前借阅包空</span>
                        </div>
                        <Card v-for="item in list" :key="item.id">
                            <template slot="check">
                                <van-checkbox 
                                    v-model="item.isChecked"
                                    checked-color="#ee0a24"
                                    @click="check(item.id)"
                                ></van-checkbox>
                            </template>
                            <template slot="avatar">
                                <img :src="item.avatar" alt="">
                            </template>
                            <template slot="title">
                                <span v-text="item.name" class="list-card-right"></span>
                            </template>
                            <template slot="author">
                                <span v-text="item.author" class="list-card-right"></span>
                            </template>
                            <template slot="option">
                                <button class="btn-delete" @click="removeCart(item.id)">
                                    <delete-themes theme="filled" size="18" fill="#db214c"/>
                                </button>
                            </template>
                            <template slot="brief">
                                <van-cell title="选择日期区间" :value="item.borrowRange" @click="item.show = true" />
                                <van-calendar 
                                    v-model="item.show"
                                    @confirm="date => onConfirm(date, item.id)"
                                    type="range" 
                                    color="#db214c"
                                    :max-range="14" 
                                    :style="{ height: '500px' }"
                                />
                            </template>
                            <template slot="comment">
                                <span class="list-card-right">
                                    <button class="btn-calc" @click="decrease(item.id)" :disabled = "item.count === 1">
                                        <reduce theme="filled" size="22" fill="#fbc2ce" v-if="item.count === 1" />
                                        <reduce theme="filled" size="22" fill="#db214c" v-else />
                                    </button>
                                    <span v-text="item.count"></span>
                                    <button class="btn-calc" @click="increase(item.id)" :disabled="item.count === Math.min(5, item.stock)">
                                        <add theme="filled" size="22" fill="#fbc2ce" v-if="item.count === Math.min(5, item.stock)"/>
                                        <add theme="filled" size="22" fill="#db214c" v-else />
                                    </button>
                                </span>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <div class="footer-container" v-if="list.length !== 0">
                <span>总数：{{ total }}本</span>
                <button class="footer-order" @click="$router.push('/orderConfirm')" :disabled="list.borrowRange">
                    借阅
                </button>
            </div>
            <Tabbar></Tabbar>
        </template>
    </Layout>
</template>

<script>
import { Layout, Tabbar, Card } from '@/components'
import { DeleteThemes, Reduce, Add,  } from '@icon-park/vue'

export default {
    name: 'BorrowView',
    components: {
        Tabbar, Layout, Card,
        DeleteThemes, Reduce, Add
    },
    data() {
        return {
            list: [],
            total: "",
            model: {
                ids: [],
            },
        }
    },
    // 组件的逻辑和行为的定义部分
    computed: {
        
    },
    methods: {
        async removeCart(id) {
            this.$Confirm('删除').then(
                async () => {
                    if(this.model.ids) {
                        this.model.ids.push(id)
                    } else {
                        this.model.ids = [id]
                    }
                    console.log('ids:' + this.model.ids);
                    const data = await this.$api.cart.getData("remove", this.model);
                    console.log(data);
                    // 重新渲染
                    this.updateList();
                    this.$Notice("删除成功");
                },
                () => {}
            )
        },
        async decrease(id) {
            await this.$api.cart.getData(`decrease/${id}`);
            this.updateList();
        },
        async increase(id) {
            await this.$api.cart.getData(`increase/${id}`);
            this.updateList();
        },
        async check(id) {
            console.log(id);
            // this.list = await this.$api.cart.getData("list")
        },
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        async onConfirm(date, id) {
            const[start, end] = date;
            // 更新日期
            const item = this.list.find(item => item.id === id);
            if(item) {
                item.show = false;
                item.borrowRange = `${this.formatDate(start)}-${this.formatDate(end)}`;
                console.log('borrrrrrowwww'+ item.borrowRange);
                await this.$api.cart.updateDate(id, {borrowRange: item.borrowRange});
                this.updateList();
            }
        },
        async updateList() {
            const data = await this.$api.cart.getData("list");
            this.list = data.map(item => ({ ...item, show: false }));
        }
    },
    async created() {
        const data = await this.$api.cart.getData("list");
        // 为每个列表项添加 show 属性并将其初始值设置为 false
        this.list = data.map(item => ({ ...item, show: false }));
        console.log(this.list);
        // 总计数目
        const total = await this.$api.cart.getTotal();
        this.total = total;
    },
    // 监听组件中的数据变化并执行相应的操作
    watch: {
        list: {
            async handler() {
                const total = await this.$api.cart.getTotal();
                this.total = total;
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
    ::v-deep .van-cell
        padding: 10px 0
    @import '@/assets/css/public.sass'
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
        .nores
            text-align: center
            margin-top: px2vw(100)
        .btn-delete
            border-radius: 50%
            border: none
            width: px2vw(30)
            height: px2vw(30) 
            color: #db214c
            background-color: #f5e2e6
        .list-card-right
            display: flex
            align-items: center
            span
                width: px2vw(22)
                text-align: center
            .btn-calc
                border: none
                width: px2vw(22)
                height: px2vw(22)
                position: relative
                background-color: #fff
    .footer-container
        display: flex
        height: px2vw(45)
        line-height: px2vw(45)
        padding: 0 px2vw(10) 0 px2vw(20)
        border-top: 2px solid #333
        box-sizing: border-box
        align-items: center
        justify-content: space-between
        // background-color: #db214c
        span
            box-sizing: border-box
        button
            color: #fff
            width: 20%
            text-align: center
            background-color: #db214c
            box-sizing: border-box
            border: none
            &:disabled
                background-color: #fbc2ce
</style>