<template>
    <div class="container">
        <input 
            v-bind="$attrs"
            :value="value"
            :class="$attrs.inputClass"
            @input="$emit('input', $event.target.value)"
            @blur="$emit('blurEvent')"
        >
        <!-- onblur= "$event.target.value valid = true" -->
    </div>
</template>

<script>
    export default {
        name: 'InputView',
        // 不要让没人认领的属性加到当前组件的根节点上
        inheritAttrs: false,
        // props节点对外公开属性, 父组件可以用对外公开的属性给我传值
        props: {
            value: {
                // 对外公开的value属性的相关的约束
                type: String,
                // required: true, // true表示必须给value, 不给报错
                default: "", // 默认值为空字符串
            }
        },
        created() {
            console.log(this.$attrs);
            console.log(this.$attrs.inputClass);
            console.log(this.$attrs.onblur);
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="sass" scoped>
    .container
        // padding: px2vw(20)
        input
            width: 100%
            height: px2vw(56)
            background-color: #f6f8fa
            box-sizing: border-box
            border-radius: px2vw(20)
            outline: none
            border: 2px solid transparent
            text-indent: 1em
            &:focus
                border-color: rgba(219, 33, 76, 0.3)
            &.error
                border-color: #f22424 
</style>