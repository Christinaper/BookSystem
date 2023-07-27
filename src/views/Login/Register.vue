<template>
    <div class="container">
        <div class="header-container">
            <arrow-left @click="$router.push('/profile')" theme="outline" size="24" fill="#fff"/>
            <span>注册 | Register</span>
        </div>
        <div class="form-container">
            <form @submit.prevent="register">
                <Input 
                    :value="model.phone"
                    v-model="model.phone"
                    type="text"
                    :inputClass="{error: phoneError}"
                    placeholder="请输入手机号"
                >
                </Input>
                <span v-text="phoneError"></span>
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
                    注册
                </Button>
                <span v-text="registerError"></span>
            </form>
            <div class="login-link">
                <span>已有账号</span>
                <span @click="$router.push('/register')">去登录</span>
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
        name: 'RegisterView',
        components: { 
            Input, Button,
            ArrowLeft,
        },
        data() {
            return {
                model: {
                    name: "",
                    pwd: "",
                    phone: "",
                },
                
                valid: false,
                registerError: "",
            }
        },
        computed: {
            phoneError() {
                const phoneRegex = /^1[3-9]\d{9}$/;
                if(!this.valid) return '';
                else if(!this.model.phone) return '请输入手机号';
                else if(!phoneRegex.test(this.model.phone)) return '手机号格式不正确';
                return '';
            },
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
            async register() {
                // 发起
                await this.$api.user.register(this.model);
                // 验证输入
                this.valid = true;
                // 成功后跳转页面到登录
                this.$Notice('注册成功');
                this.$router.replace('/login')
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
            .login-link
                span
                    color: #333
</style>