<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="$router.back()" />
                </span>
                <span>地址</span>
                <span>
                    <experiment 
                        :draggable="true"
                        @dragstart="onDragstart"
                        theme="two-tone" 
                        size="20" 
                        :fill="['#333' ,'#db214c']"
                    />
                    <add theme="outline" size="20" fill="#333" @click="$router.push('/address/add')" />
                </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <router-view></router-view>
                <!-- <button @click="addAddress">添加</button> -->
                <div class="book-address" 
                    v-for="item in list" 
                    :key="item.id"
                    @dragover.prevent
                    @dragleave.prevent
                    @drop="onDrop(item)"
                >
                    <div v-if="item.isDefault === 1" class="card">
                        <div class="b-a-info">
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
                        </div>
                    </div>
                    <div v-else>
                        <div class="b-a-info">
                            <div>
                                <span v-text="item.receiveName"></span>
                                <span v-if="item.isDefault === 1" class="defaultTag">默认</span>
                                <div>
                                    <span v-text="item.receivePhone"></span>
                                </div>
                            </div>
                            <span class="option">
                                <edit theme="outline" size="20" fill="#333" @click="$router.push({path:'/address/update', query: {id: item.id}})" />
                            </span>
                        </div>
                        <div class="b-a-ad">
                            <p>{{ item.receiveRegion }}-{{ item.receiveDetail }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            放入借阅包
        </template>
    </Layout>
</template>

<script>
    import { Layout } from '@/components';
    import { Edit, Back, Add, Experiment } from '@icon-park/vue'

    export default {
        name: 'AddressView',
        components: {
            Layout,
            Edit, Back, Add, Experiment
        },
        data() {
            return {
                list: [],
                // receiveList: []
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            
        },
        methods: {
            async setDefaultHandler(id) {
                await this.$api.address.setDefault(id);
                const list = await this.$api.address.getData();
                this.list = Object.freeze(list);
                // this.$Alert('更新成功'); // 用notice
            },
            onDragstart() {
                console.log('ondraggggstarttttt');
                // event.dataTransfer.setData('text/plain', event.target.id);
            },
            async onDrop(item) {
                console.log('onondroppppp');
                // const id = event.dataTransfer.getData('text/plain');
                await this.setDefaultHandler(item.id)
            }
        },
        async created() {
            const list = await this.$api.address.getData();
            this.list = Object.freeze(list);
        },
        watch: {
            $route: async function(to, from) {
                if(from.path === '/address/add' || from.path === '/address/update') {
                    if(from.query.flag === "ok") {
                        const list = await this.$api.address.getData();
                        this.list = Object.freeze(list)
                    }
                }
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
            background-color: #db214c
            color: #fff
        .book-address
            border-bottom: 2px solid black
            margin: px2vw(20)
            .b-a-info
                display: flex
                justify-content: space-between
                align-items: center
                .defaultTag
                    background-color: #fff
                    color: #db214c
</style>