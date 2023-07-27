<template>
    <Layout>
        <template slot="header">
            <div class="header-container">
                <span>
                    <back theme="outline" size="20" fill="#333" @click="back" />
                </span>
                <span> </span>
            </div>
        </template>
        <template>
            <div class="main-container">
                <div>
                    
                </div>
                <div class="pop" @click="randomChange">
                    <span>{{ displayValue }}</span>
                </div>
                <van-uploader class="avatar" :before-read="beforeRead" v-if="info.preview.url !== undefined">
                    <img :src="info.avatar" alt="" v-if="userInfo && info.name">
                    <div class="admin-tag">
                        <camera theme="multi-color" size="24" :fill="['#fff' ,'#db214c' ,'#FFF' ,'#e343f8']"/>
                    </div>
                </van-uploader>
                <van-uploader class="avatar" :before-read="beforeRead" v-if="info.preview.url === undefined">
                    <img :src="info.preview" alt="" v-if="userInfo && info.name">
                    <div class="admin-tag">
                        <camera theme="multi-color" size="24" :fill="['#fff' ,'#db214c' ,'#FFF' ,'#e343f8']"/>
                    </div>
                </van-uploader>

                <div class="edit">
                    <div class="edit-card" @click="editName">
                        <edit-name theme="filled" size="24" fill="#fff"/>
                        <div class="edit-content" v-text="info.name"></div>
                    </div>
                    <div class="edit-card" @click="genderShow = true">
                        <male theme="outline" size="24" fill="#fff"/>
                        <div class="edit-content" v-text="info.gender"></div>
                    </div>
                    <div class="edit-card" @click="editPhone">
                        <phone-telephone theme="outline" size="24" fill="#fff"/>
                        <div class="edit-content" v-text="info.phone"></div>
                    </div>
                    <!-- <van-action-sheet 
                        v-model="nameShow" 
                        title="修改昵称"
                        cancel-text="取消"    
                    >
                        <div class="content">
                            <van-field v-model="text" label="" placeholder="显示图标" />
                        </div>
                    </van-action-sheet> -->
                    <van-action-sheet
                        v-model="genderShow"
                        :actions="actions"
                        @select="onSelect"
                        cancel-text="取消"
                        description="选择性别"
                        close-on-click-action
                    />
                    <van-action-sheet 
                        v-model="teleShow" 
                        title="修改电话"
                    >
                        <div class="content">
                            <van-field v-model="info.phone" label="" placeholder="输入手机号" />
                            <van-button color="#db214c" size="large" @click="teleShow = false">确定</van-button>
                        </div>
                    </van-action-sheet>
                </div>
            </div>
        </template>
        <template slot="footer">
            <van-button color="#db214c" size="large" @click="updateInfo">更新</van-button>
        </template>
    </Layout>
</template>

<script>
    import { Layout, } from '@/components';
    import { Back, Camera, EditName, Male, PhoneTelephone } from '@icon-park/vue'

    export default {
        name: 'AdminProfileSettingView',
        components: {
            Layout,
            Back, Camera, EditName, Male, PhoneTelephone
        },
        data() {
            return {
                flag: 0,
                text: "",
                displayValue: "",
                values: [
                    '爱我就不换头像o(╥﹏╥)o❤️‍🩹❤️‍🩹❤️‍🩹',
                    '图片放这么大干嘛🤗？照镜子吗',
                    '我还以为点头像切换气泡呢！原来是点气泡，你自己看看，设计得合理吗🤣👉',
                    '应该是点相机上传，点图片预览，你怎么能这么做？🤡',
                    '为什么不给相机ICON加个背景？？？🤨',
                    '给我化个妆吧~🥰',
                    '你小子，还知道保存呢😲',
                    '什么？你还想改密码，可这功能我不想做🥺',
                    '这个实现不了！🤬',
                    '我爱🎵~是因为我存在🎶~~~',
                    '哈哈哈哈哈哈————哪有人不疯的哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                    '⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️⛈️',
                    '❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓',
                ],
                nameShow: false,
                genderShow: false,
                teleShow: false,
                actions: [
                    { name: '男' },
                    { name: '女' },
                    { name: '非二元性别' },
                ],
                info: {
                    name: "",
                    gender: "",
                    phone: null,
                    avatar: null,
                    preview: [
                        { url: null, deletable: false }
                    ]
                }
            }
        },
        // 组件的逻辑和行为的定义部分
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        },
        methods: {
            back() {
                if(this.flag > 2) {
                    this.$Confirm('未保存，是否退出?').then(
                    () => {
                        this.$router.back()
                        this.flag = 0
                    },
                    () => {}
                )
                } else {
                    this.$router.back()
                }
            },
            beforeRead(file) {
                const isImage = file.type.indexOf('image') === 0;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if(!isImage) this.$Alert('请选择图片文件');
                if(!isLt2M) this.$Alert('图片大小不能超过2MB');
                if(isImage && isLt2M) this.info.avatar = file; // 将文件对象赋值给info.avatar
                this.info.preview = URL.createObjectURL(file);
                console.log(file);
                console.log('??'+this.info.avatar);
                return isImage && isLt2M
            },
            randomChange() {
                const randomIndex = Math.floor(Math.random() * this.values.length);
                this.displayValue = this.values[randomIndex];
            },
            editName() {
                // 其他点击事件修改 displayValue 的值
                // this.nameShow = true
                this.displayValue = '这是我的名字，你改什么改？！🥲';
            },
            editPhone() {
                // 其他点击事件修改 displayValue 的值
                this.teleShow = true
                this.displayValue = '换手机号了？反正也不会打给你的😝';
            },
            onSelect(item) {
                console.log(item.name);
                this.info.gender = item.name
            },
            async updateInfo() {
                this.$Confirm('是否修改?').then(
                    async () => {
                        let formData = new FormData();
                        formData.append('name', this.info.name);
                        formData.append('gender', this.info.gender);
                        formData.append('phone', this.info.phone);
                        formData.append('avatar', this.info.avatar); // 将文件对象添加到formData中
                        await this.$api.user.allUpdate(formData); // 将formData作为参数传递
                        // 刷新
                        this.$Notice("信息更新成功");
                        this.flag = 0
                    },
                    () => {}
                )
            }
        },
        async created() {
            this.randomChange();
            this.info.name = this.userInfo[0].name;
            this.info.gender = this.userInfo[0].gender;
            this.info.phone = this.userInfo[0].phone;
            this.info.avatar = this.userInfo[0].avatar;
            this.info.preview.url = this.userInfo[0].avatar
        },
        // mounted: {

        // },
        watch: {
            info: {
                handler() {
                    this.flag += 1;
                    console.log('avatar'+this.info.avatar);
                    console.log('url:::'+this.info.preview.url);
                    // console.log(this.flag);
                },
                deep: true,
                immediate: true
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
        .pop
            border: 2px solid #db214c
            border-radius: 8px
            margin: 0 px2vw(20)
            padding: px2vw(10)
            box-sizing: border-box
            position: relative
            &::before
                content: ""
                position: absolute
                bottom: -15px
                left: calc(50% - 15px)
                width: 0
                height: 0
                border-left: 15px solid transparent
                border-right: 15px solid transparent
                border-top: 15px solid #db214c
        .avatar
            text-align: center
            margin-top: px2vw(20)
            position: relative
            left: 50%
            transform: translateX(-50%)
            img
                width: px2vw(265)
                border: 3px solid #db214c
                border-radius: 50%
                padding: px2vw(5)
                box-sizing: border-box
            .admin-tag
                border: 3px solid #db214c
                // background-color: #db214c
                border-radius: 50%
                padding: 14px
                box-sizing: border-box
                width: px2vw(50)
                height: px2vw(50)
                position: absolute
                bottom: 5%
                left: 80%
                transform: translate(-80%, 5%)

        .username
            font-size: 25px
            font-weight: bold
            letter-spacing: 2px
            margin: px2vw(10) auto
            text-align: center
        .cell
            height: px2vw(50)
            display: flex
            align-items: center
            padding: 0 px2vw(20)
            justify-content: space-between
            .cell-left
                display: flex
                align-items: center
                .cell-text
                    margin-left: px2vw(10)
        .edit
            padding: px2vw(40) px2vw(50)
            display: flex
            justify-content: space-between
            position: relative
            .edit-card
                width: 20%
                height: px2vw(80)
                // line-height: px2vw(80)
                border-radius: 8px
                background-color: #333
                padding: px2vw(5)
                // text-align: center
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
                .edit-content
                    // margin: 0 -20px
                    color: #fff
                    width: 100%
                    text-align: center
                    word-wrap: break-word
</style>