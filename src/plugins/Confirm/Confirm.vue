<template>
    <div class="mi-mask">
        <div class="content">
            <!-- <img src="../../assets/images/msg.png" alt=""> -->
            <p v-text="text"></p>
            <div class="btn-container">
                <button @click="ok">确定</button>
                <button @click="cancel" class="btn-cancel">取消</button>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "ConfirmView",
        data() { return { text: '', resolve: null, reject: null } },
        methods: {
            ok() {
                this.$destroy(true); // 自己销毁自己
                this.$el.remove(); // 自己对应的真实dom删除
                this.resolve();
            },
            cancel() {
                this.$destroy(true); // 自己销毁自己
                this.$el.remove(); // 自己对应的真实dom删除
                this.reject();
            }

        },
        created() {
            console.log(this.$attrs);
        },
    }
</script>

<style lang="sass" scoped>
    .mi-mask
        position: fixed
        left: 0
        top: 0
        width: 100vw
        height: 100vh
        background-color: rgba(0, 0, 0, 0.3)
        z-index: 999
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
                font-size: px2vw(16)
                font-weight: 600
            .btn-container
                display: flex
                width: 100%
                justify-content: space-evenly
            button
                color: #db214c
                border: none
                outline: none
                background-color: #f5e2e6
                margin: px2vw(10) 0
                width: px2vw(55)
                height: px2vw(25)
                border-radius: px2vw(8)

</style>