<template>
    <div class="mask">
        <div class="content">
            <!-- <img src="../../assets/images/msg.png" alt=""> -->
            <p v-text="text"></p>
            <button @click="ok">确定</button>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "AlertView",
        data() { return {text: ''} },
        methods: {
            ok() {
                this.$destroy(true); // 自己销毁自己
                this.$el.remove(); // 自己对应的真实dom删除
            }
        }
    }
</script>

<style lang="sass" scoped>
    .mask
        position: fixed
        left: 0
        top: 0
        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.3)
        z-index: 9999
        .content
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            background-color: #fff
            border-radius: px2vw(10)
            padding: px2vw(20) px2vw(40)
            box-sizing: border-box
            max-width: 90%
            min-width: 60%
            display: flex
            flex-direction: column
            align-items: center
            img
                // width: px2vw(140)
            p
                font-size: 17px
                font-weight: 600
            button
                color: #db214c
                border: none
                outline: none
                background-color: #f5e2e6
                margin: px2vw(10) 0
                width: 100%
                height: px2vw(25)
                border-radius: px2vw(8)
                // padding: px2vw(20) px2vw(40)

</style>