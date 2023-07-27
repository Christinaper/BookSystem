<template>
    <div class="container">
        <div class="header-container">
            <arrow-left @click="$router.push('/profile')" theme="outline" size="24" fill="#fff"/>
            <span>登录 | Login</span>
        </div>
        <div class="form-container">
            <form @submit.prevent="login">
                <Input 
                    :value="model.name"
                    v-model="model.name"
                    type="text"
                    :inputClass="{error: nameError}"
                    placeholder="请输入用户名"
                    @blurEvent="onInputBlur"
                >
                </Input>
                <span v-text="nameError"></span>
                <Input 
                    :value="model.pwd"
                    v-model="model.pwd"
                    type="password"
                    :inputClass="{error: pwdError}"
                    placeholder="请输入密码"
                >
                </Input>
                <span v-text="pwdError"></span>
                <Button type="submit" 
                    :buttonDisabled="(nameError === '') && (pwdError === '') && valid"
                >
                    登录
                </Button>
                <span v-text="loginError"></span>
            </form>
            <div class="register-link">
                <span>没有账号？</span>
                <span @click="$router.push('/register')">去注册</span>
            </div>
            <router-link to="/">
                <!-- 手机号登录 -->
            </router-link>
        </div>
    </div>
</template>

<script>
    import { Input, Button } from '@/components'
    import { ArrowLeft,  } from '@icon-park/vue'

    export default {
        name: 'LoginView',
        components: { 
            Input, Button,
            ArrowLeft,
        },
        data() {
            return {
                model: {
                    name: "",
                    pwd: "",
                },
                
                valid: false,
                loginError: "",
            }
        },
        computed: {
            nameError() {
                if(!this.valid) return '';
                else if(!this.model.name) return '请输入用户名';
                return '';
            },
            pwdError() {
                const pwdRegex = /^.{3,16}$/;
                if(!this.valid) return '';
                else if(!this.model.pwd) return '请输入密码';
                else if(!pwdRegex.test(this.model.pwd)) return '密码长度必须在3到10个字符之间';
                return '';
            }
        },
        methods: {
            async login() {
                // 发起登录请求
                const token = await this.$api.user.loginByPwd(this.model);
                sessionStorage.setItem("token", token); // 将令牌存储在本地存储中

                // 等待Token存储完成后再获取用户信息
                await Promise.all([
                    this.$store.dispatch('getUserInfo'), 
                    this.$store.dispatch('getAddressList')
                ]);

                // 成功获取用户信息后执行以下代码
                // console.log(this.$store.state.userInfo[0].isAdmin);
                const isAdmin = this.$store.state.userInfo[0].isAdmin;
                console.log(isAdmin);

                if(isAdmin) {
                    console.log(isAdmin);
                    this.$router.replace('/homee');
                } else {
                    this.$router.replace(this.$route.query.target || "/home");
                }

                // 验证输入
                this.valid = true;
                // 成功后跳转页面到主页
                console.log('send request');
            },
            onInputBlur() {
                // console.log(blur);
                if(this.model.name) this.valid = true;
            }
        }
    }
</script>

<style lang="sass" scoped>
    .container
        // padding: px2vw(5) px2vw(20)
        background-size: 100% 100
        .header-container
            height: px2vw(150)
            background-color: #db214c
            display: flex
            flex-direction: column
            justify-content: space-between
            padding-bottom: px2vw(20)
            box-sizing: border-box
            padding-top: px2vw(20)
            span
                color: #fff
                font-size: 24px
        form
            margin-top: px2vw(20)
        span
            font-size: px2vw(14)
            color: #f22424
            padding: 0 px2vw(20)
        .form-container
            form
                padding: px2vw(5) px2vw(20)
            .register-link
                span
                    color: #333

</style>