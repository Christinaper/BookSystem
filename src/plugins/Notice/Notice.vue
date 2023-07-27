<template>
    <p class="notice" v-text="text"></p>
    <!-- <p class="mi-notice" v-text="text"></p> -->
</template>

<script>
    export default {
        name: "NoticePlugin",
        mounted() {
            setTimeout(() => {
                this.$destroy(true);
                this.$el.remove();
            },1500)
        }
    }
</script>

<style lang="sass" scoped>
    @keyframes fadeout
        from
            opacity: 1
            transform: translateX(-50%) translateY(0)
        to
            opacity: 0
            transform: translateX(-50%) translateY(-100%)
    .notice
        z-index: 10000
        position: fixed
        left: 50%
        top: px2vw(45)
        transform: translateX(-50%)
        width: 100%
        padding: px2vw(10)
        color: #fff
        text-align: center
        font-weight: bold
        border-radius: px2vw(4)
        font-size: px2vw(14)
        background-color: #db214c
        // box-shadow: 0 0 px2vw(50) 0 #db214c inset
        animation-name: fadeout
        animation-duration: 1s
        animation-delay: 1s
        animation-fill-mode: forwards

</style>