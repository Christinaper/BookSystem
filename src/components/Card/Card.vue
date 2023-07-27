<template>
    <div class="card-container">
        <div class="check">
            <slot name="check"></slot>
        </div>
        <div class="left">
            <!-- 具名插槽 -->
            <slot name="avatar"></slot>
        </div>
        <div class="right">
            <div class="r-top">
                <div class="info">
                    <div class="author">
                        <slot name="author"></slot>
                    </div>
                    <div class="title">
                        <slot name="title"></slot>
                    </div>
                </div>
                <div class="option">
                    <slot name="option"></slot>
                </div>
            </div>
            <div class="r-bot">
                <div class="brief">
                    <slot name="brief"></slot>
                </div>
                <div class="comment">
                    <slot name="comment"></slot>
                </div>
            </div>
        </div>
        
    </div>
</template>


<script>
    export default {
        name: "CartView",
        components: {
            
        }
    }
</script>

<style lang="sass" scoped>
    /* 组件的样式定义部分 */
    @import '@/assets/css/public.sass'
    .card-container
        display: flex
        padding: px2vw(10) px2vw(20)
        align-items: center
        .check
            margin-right: px2vw(5)
            box-sizing: border-box
        .left
            flex: 1
            img
                width: 100%
        .right
            flex: 3
            display: flex
            flex-direction: column
            padding-left: px2vw(15)
            .r-top
                display: flex
                flex-grow: 1
                justify-content: space-between
                flex: 3
                .info
                    display: flex
                    flex-direction: column
                    .author
                        color: #9e9ea7
                        font-size: px2vw(14)
                    .title
                        padding: px2vw(5) 0
                        font-size: px2vw(16)
                .option
                    display: flex
                    justify-content: center
                    align-items: center
            .r-bot
                flex: 1.5
                .brief
                    background-color: #f9f9f9
                    box-sizing: border-box
                    color: #858585
                    p
                        padding: px2vw(10)
                .comment
                    color: #9e9ea7
                    font-size: 14px
                    span.rate
                        color: #db214c
                        font-size: 16px
                        font-weight: 800

</style>