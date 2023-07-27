<template>
    <div class="address-add">
        <div class="address-add-title">新增地址</div>
        <div>
            <input type="text" v-model="model.receiveName" placeholder="输入姓名">
        </div>
        <div>
            <input type="text" v-model="model.receivePhone" placeholder="输入电话">
        </div>
        <div>
            <input type="text" v-model="model.receiveRegion" placeholder="收货地址中的省市区街道，省市区街道之间用空格分隔">
        </div>
        <div>
            <input type="text" v-model="model.receiveDetail" placeholder="收货的具体详细地址">
        </div>
        <div class="btn-container">
            <button @click="ok" class="ok">确认</button>
            <button @click="cancel" class="cancel">取消</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddressAddView",
        data() {
            return {
                model: {
                    receiveName: "",
                    receivePhone: "",
                    receiveRegion: "",
                    receiveDetail: ""
                }
            }
        },
        methods: {
            async ok() {
                await this.$api.address.add(this.model)
                this.$Alert('新增成功')
                this.$route.query.flag = "ok"
                this.$router.back()
            },
            async cancel() {
                await this.$Confirm('确定退出？')
                this.$router.back()
            }
        }
    }
</script>

<style lang="sass" scoped>
    .address-add
        position: fixed
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: #fff
        padding: 0 px2vw(20)
        box-sizing: border-box
        .address-add-title
            height: px2vw(40)
            line-height: px2vw(40)
            text-align: center
            // margin-bottom: 50px
        input
            font-family: jinBu
            text-indent: 1em
            width: 100%
            height: px2vw(40)
            margin: px2vw(5) 0
            border: 2px solid black
            box-sizing: border-box
        .btn-container
            display: flex
            height: px2vw(40)
            margin-top: 5px
            button
                border: none
                font-family: jinBu
            button.ok
                flex: 3
                font-size: 14px
                background-color: #db214c
                color: #fff
            button.cancel
                flex: 1
                font-size: 14px
                background-color: #333
                color: #fff
</style>