<template>
    <div class="login-container">
        <ul class="bg-bubbles">
            <li v-for="(item, index) in 10" :key="index"></li>
        </ul>
        <div class="login-box" v-show="loginOrRegisterStatus==='login'">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >
                <h3 class="title">BC Star Admin</h3>
                <el-form-item prop="phoneNum">
                <span class="svg-container">
                    <svg-icon icon-class="user"/>
                </span>
                    <el-input
                        v-model="loginForm.phoneNum"
                        name="phoneNum"
                        type="text"
                        :maxlength="11"
                        auto-complete="on"
                        placeholder="请输入手机号"
                    />
                </el-form-item>
                <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                    <el-input
                        :type="pwdType"
                        v-model="loginForm.password"
                        name="password"
                        auto-complete="on"
                        :maxlength="16"
                        :minlength="7"
                        placeholder="请输入密码"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd('pwdType')">
                    <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
                </span>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="handleLogin"
                    >登录
                    </el-button>
                </el-form-item>
                <div class="tips">
                    <span>百川之星后台管理系统</span>
                    <span v-if="loginOrRegisterStatus==='login'"
                          @click="loginOrRegister('register')">没有账号？去注册</span>
                    <span v-if="loginOrRegisterStatus==='register'" @click="loginOrRegister('login')">已有账号，去登录</span>
                </div>
            </el-form>
        </div>
        <div class="register-box" v-show="loginOrRegisterStatus==='register'">
            <el-form
                ref="registerForm"
                :model="registerForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >
                <h3 class="title">注册</h3>
                <el-form-item prop="phoneNum">
                    <span class="svg-container">
                        <svg-icon icon-class="user"/>
                    </span>
                    <el-input
                        v-model="registerForm.phoneNum"
                        name="phoneNum"
                        type="text"
                        :maxlength="11"
                        auto-complete="on"
                        placeholder="请输入注册手机号"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password"/>
                    </span>
                    <el-input
                        :type="registerPwdType"
                        v-model="registerForm.password"
                        name="password"
                        :maxlength="16"
                        :minlength="7"
                        auto-complete="on"
                        placeholder="请输入密码"
                    />
                    <span class="show-pwd" @click="showPwd('registerPwdType')">
                        <svg-icon :icon-class="registerPwdType === 'password' ? 'eye' : 'eye-open'"/>
                    </span>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <span class="svg-container">
                        <svg-icon icon-class="password"/>
                    </span>
                    <el-input
                        :type="registerPwdType"
                        v-model="registerForm.confirmPassword"
                        name="password"
                        :maxlength="16"
                        :minlength="7"
                        auto-complete="on"
                        placeholder="请再次输入密码确认"
                    />
                    <span class="show-pwd" @click="showPwd('registerPwdType')">
                        <svg-icon :icon-class="registerPwdType === 'password' ? 'eye' : 'eye-open'"/>
                     </span>
                </el-form-item>
                <div class="vertify-form-box">
                    <el-form-item prop="validateCode" class="vertify-form-item">
                    <span class="svg-container">
                        <svg-icon icon-class="example"/>
                    </span>
                        <el-input
                            v-model="registerForm.validateCode"
                            name="password"
                            :maxlength="4"
                            placeholder="请输入验证码"
                            @keyup.enter.native="handleLogin"
                        />
                    </el-form-item>
                    <img class="vertify-img" src="/src/assets/404_images/404.png">
                </div>
                <el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="handleRegister"
                    >注册
                    </el-button>
                </el-form-item>
                <div class="tips">
                    <span>百川之星后台管理系统</span>
                    <span v-if="loginOrRegisterStatus==='login'"
                          @click="loginOrRegister('register')">没有账号？去注册</span>
                    <span v-if="loginOrRegisterStatus==='register'" @click="loginOrRegister('login')">已有账号，去登录</span>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {phoneNum, password} from "../../utils/validate";
    import {setToken} from "@/utils/auth.js";

    export default {
        name: "Login",
        data() {
            return {
                loginOrRegisterStatus: 'login',
                loginForm: {
                    phoneNum: "",
                    password: ""
                },
                registerForm: {
                    phoneNum: "",
                    password: "",
                    confirmPassword: '',
                    validateCode: ''
                },
                loginRules: {
                    phoneNum,
                    password,
                    confirmPassword:
                        [
                            {
                                required: true,
                                trigger: "blur",
                                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,16}$/,
                                validator: (rule, value, callback) => {
                                    if (!rule.pattern.test(value)) {
                                        callback(new Error('请输入正确的确认密码'))
                                    } else if (value !== this.registerForm.password) {
                                        callback(new Error('两次密码输入不一致'))
                                    }
                                }
                            }
                        ],
                },
                loading: false,
                pwdType: "password",
                registerPwdType: 'password'
            };
        },
        methods: {

            loginOrRegister(flag) {
                this.$refs[`${flag}Form`].resetFields();
                this.loginOrRegisterStatus = flag;
            },
            showPwd(prop) {
                if (this[prop] === "password") {
                    this[prop] = "";
                } else {
                    this[prop] = "password";
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        //TODO 登录，处理账号密码
                        this.$api.login({uid: 1}).then(
                            res => {
                                //TODO 根据返回数据判断是否被冻结或通过审核
                                if (true) {
                                    sessionStorage.setItem(
                                        "userInfo",
                                        JSON.stringify(res.data)
                                    );
                                    sessionStorage.setItem(
                                        "menuInfos",
                                        JSON.stringify(res.data.menuInfos)
                                    );
                                    sessionStorage.setItem(
                                        "powerInfos",
                                        JSON.stringify(res.data.powerInfos)
                                    );
                                    setToken(res.data.token);
                                    this.$router.replace({path: "/"});
                                } else {
                                    this.$alert('该账户暂未通过审核，请联系管理员进行审核！', '提示', {
                                        confirmButtonText: '确定',
                                        type: 'error',
                                    })
                                }
                                this.loading = false;
                            },
                            err => {
                                this.loading = false;
                            }
                        );
                    }
                });
            },
            handleRegister() {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        //TODO 接口联调
                        this.$api.register({}).then(
                            res => {
                                if (res.data.status) {
                                    this.$alert('请等待管理员审核通过后登录', '注册成功', {
                                        confirmButtonText: '确定',
                                        type: 'warning',
                                        callback: () => {
                                            this.$refs.loginForm.resetFields();
                                            this.loginOrRegisterStatus = 'login';
                                        }
                                    })
                                }
                                this.loading = false;
                            },
                            err => {
                                this.loading = false;
                            }
                        )
                    }
                })
            }
        },
        created() {
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;
    $input_color: #666666;
    .login-container {
        .el-input {
            display: inline-block;
            height: 100%;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $input_color;
                height: 47px;

                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px rgb(229, 229, 229) inset !important;
                    -webkit-text-fill-color: $input_color !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    @import 'src/styles/mixin.scss';

    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background: #092756;
        background: -webkit-radial-gradient(0% 100%, ellipse farthest-corner, rgba(104, 128, 138, 0.4) 10%, rgba(138, 114, 76, 0) 40%),
        -webkit-linear-gradient(top, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
        -webkit-linear-gradient(-45deg, #670d10 0%, #092756 100%);
        background: -webkit-radial-gradient(0% 100%, ellipse farthest-corner, rgba(104, 128, 138, 0.4) 10%, rgba(138, 114, 76, 0) 40%),
        linear-gradient(to bottom, rgba(57, 173, 219, 0.25) 0%, rgba(42, 60, 87, 0.4) 100%),
        linear-gradient(135deg, #670d10 0%, #092756 100%);

        .bg-bubbles {
            position: absolute;
            // 使气泡背景充满整个屏幕
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            li {
                position: absolute;
                bottom: -160px;
                width: 40px;
                height: 40px; // border-radius: 100%;
                background-color: rgba(255, 255, 255, 0.15);
                list-style: none;
                animation: square 15s infinite;
                transition-timing-function: linear;

                &:nth-child(1) {
                    left: 10%;
                }

                &:nth-child(2) {
                    left: 20%;
                    width: 90px;
                    height: 90px;
                    animation-delay: 2s;
                    animation-duration: 7s;
                }

                &:nth-child(3) {
                    left: 25%;
                    animation-delay: 4s;
                }

                &:nth-child(4) {
                    left: 40%;
                    width: 60px;
                    height: 60px;
                    animation-duration: 8s;
                    background-color: rgba(255, 255, 255, 0.3);
                }

                &:nth-child(5) {
                    left: 70%;
                }

                &:nth-child(6) {
                    left: 80%;
                    width: 120px;
                    height: 120px;
                    animation-delay: 3s;
                    background-color: rgba(255, 255, 255, 0.2);
                }

                &:nth-child(7) {
                    left: 32%;
                    width: 160px;
                    height: 160px;
                    animation-delay: 2s;
                }

                &:nth-child(8) {
                    left: 55%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 4s;
                    animation-duration: 15s;
                }

                &:nth-child(9) {
                    left: 25%;
                    width: 10px;
                    height: 10px;
                    animation-delay: 2s;
                    animation-duration: 12s;
                    background-color: rgba(255, 255, 255, 0.3);
                }

                &:nth-child(10) {
                    left: 85%;
                    width: 160px;
                    height: 160px;
                    animation-delay: 5s;
                }
            }

            // 自定义 square 动画；
            @keyframes square {
                0% {
                    opacity: 0.5;
                    transform: translateY(0px) rotate(45deg);
                }
                25% {
                    opacity: 0.75;
                    transform: translateY(-400px) rotate(90deg);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-600px) rotate(135deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-1000px) rotate(180deg);
                }
            }
        }

        .login-box, .register-box {
            position: absolute;
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%);
            border-radius: 6px;

            .login-form {
                background-color: #ffffff;
                width: 520px;
                min-height: 380px;
                padding: 35px 35px 15px 35px;
            }

            .tips {
                font-size: 14px;
                color: #333333;
                margin-bottom: 10px;
                @include flex(space-between, center, row);

                span {
                    &:last-child {
                        color: #409eff;
                        cursor: pointer;
                    }
                }
            }

            .svg-container {
                padding: 6px 5px 6px 15px;
                color: $dark_gray;
                vertical-align: middle;
                width: 30px;
                display: inline-block;
            }

            .title {
                font-size: 26px;
                font-weight: 400;
                color: #409eff;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .show-pwd {
                position: absolute;
                right: 10px;
                top: 7px;
                font-size: 16px;
                color: $dark_gray;
                cursor: pointer;
                user-select: none;
            }

            .vertify-form-box {
                @include flex(space-between, center, row);
                margin-bottom: 22px;

                .vertify-form-item {
                    width: 65%;
                    margin-bottom: 0;

                    .el-input {
                        width: 60%;
                    }
                }

                .vertify-img {
                    border: 1px solid $dark_gray;
                    width: 140px;
                    height: 52px;
                }
            }
        }
    }
</style>
