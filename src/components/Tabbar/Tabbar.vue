<template>
    <div class="md-example-child-tab-bar-4">
        <md-tab-bar
            v-model="current"
            :items="items"
            :has-ink=false
        >
            <template slot="item" slot-scope="{ item }">
                <router-link :to="item.link">
                    <div class="custom-item">
                        <!-- 图标Icon -->
                        <div class="icon">
                            <md-icon :name="item.icon" size="sm" :to="items.link" />
                        </div>
                        <!-- text -->
                        <div class="text">
                            <span v-text="item.label"></span>
                        </div>
                    </div>
                </router-link>
                
            </template>
        </md-tab-bar>
    </div>
</template>

<script>

export default {
    name: 'TabbarView',
    data() {
        return {
            current: 1, // 默认选中值为1
            items: [
                { name: 1, label: '首页', icon: 'home', link: '/home' },
                { name: 2, label: '借阅', icon: 'card-bag', link: '/borrow' },
                { name: 3, label: '我的', icon: 'user', link: '/profile' }
            ]
        }
    },
    components: {

    },
    // 组件的逻辑和行为的定义部分
    computed: {

    },
    methods: {

    }
}
</script>

<style lang="sass" scoped>
    /* 组件的样式定义部分 */
    .md-example-child-tab-bar-4
        a
            color: #000
        a.router-link-active
            color: #db214c
        .custom-item
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            height: 100%
            flex: 1
            .text
                font-size: 14px
</style>