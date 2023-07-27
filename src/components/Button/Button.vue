<template>
    <div class="container">
        <button v-bind="$attrs" @click="$emit('click')" :disabled="!$attrs.buttonDisabled">
            <!-- disabled="$attrs.buttonDisabled" -->
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ButtonView',
        inheritAttrs: false,
        created() {
            console.log(this.$attrs);
            console.log(this.$attrs.buttonDisabled);
        },
        data() {
            return {}
        }
    }
</script>

<style lang="sass" scoped>
    .container
        // padding: px2vw(20)
        button
            height: px2vw(48)
            width: 100%
            border-radius: px2vw(24) 
            outline: none
            border: none
            background-color: #db214c
            color: #fff
            font-weight: 600
            // margin-top: px2vw(10)
            &:disabled
                background-color: rgba(219, 33, 76, .3)
</style>