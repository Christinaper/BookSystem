<template>
    <div class="container">
        <div class="header">
            <!-- 具名插槽 -->
            <slot name="header"></slot>
        </div>
        <div class="main">
            <!-- 默认插槽 -->
            <slot></slot>
        </div>
        <div class="footer">
            <!-- 具名插槽 -->
            <slot name="footer"></slot>
        </div>
    </div>
</template>


<script>
    export default {
        name: "LayoutView"
    }
</script>

<style lang="sass" scoped>
    /* 组件的样式定义部分 */
    @function px2vw($px)
        @return $px/375*100vw
        /*
            yes:
            1. 页面刚好占满
            2. 上中下结构
            3. 把上和下定在页面上的上和下
            no:
            1. 上有什么，上有多高
            2. 下有什么，下有多高
            3. 中有什么，除了上下就是中间的高度
         */
    .container
        width: 100vw
        height: 100vh
        display: flex
        flex-direction: column
        overflow: hidden
        .header
            // 不负责设置高度
            flex-shrink: 0
        .footer
            flex-shrink: 0
        .main
            flex-grow: 1
            position: relative
            // overflow: hidden // 可加可不加
</style>