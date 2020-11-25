/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/require-default-prop */
/* eslint-disable no-empty */
<template>
  <div
    id="login"
    ref="login"
    :style="{'background-image': 'url('+backgroundImage+')','padding': padding}"
    tabindex="10"
    @keydown="handleEnter"
  >
    <div :style="{width: width, height: height}" class="login-container">
      <section class="login-header">
        <img src="/remote-img/logo-primary.png" alt="logo" :onerror="defaultLogo" class="logo">
      </section>

      <section ref="loginBody" class="login-body">
        <div class="login-img">
          <img v-if="loginImgShow" :src="loginImg" :style="{'max-width': maxWidth}" alt="图片">
        </div>
        <div class="form-wrap">
          <div>
            <div class="name-wrap">
              <span class="appName">{{ appName }}</span>
              <span class="version">
                <small>v</small>
                <span>{{ appVersion }}</span>
              </span>
            </div>
            <div class="action-name">用户登录</div>
            <el-form ref="loginForm" :model="loginData" :rules="rules" class="login-form">
              <el-form-item prop="username">
                <el-input v-model="loginData.username" placeholder="请输入手机号（账号）">
                  <i slot="prefix" class="el-input__icon el-icon-user" />
                </el-input>
              </el-form-item>
              <el-form-item :class="{'login-err-pw-formitem': isError}" class="pwFormItem" prop="password">
                <el-input
                  v-model="loginData.password"
                  placeholder="请输入密码"
                  type="password"
                >
                  <i slot="prefix" class="el-input__icon el-icon-lock" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <div v-if="isError" class="login-err">
                  <i class="ios-alert-outline" />
                  {{ errText }}
                </div>
                <el-button :loading="loginLoading" class="btn" type="primary" @click="submitForm">登录</el-button>
                <div class="forget-passwd-wrap" style="display: none">
                  <span class="forget-passwd">
                    <i class="ios-help-circle-outline" />
                    <span>忘记密码</span>
                  </span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>

      <!-- footer -->
      <footer class="footer">
        <!-- <p>{{ app.copyName }} Copyright Reserved</p> -->
      </footer>
    </div>
  </div>
</template>

<script>
import mixins from '@/library/mixins'
import * as appConf from '@/utils/app.js'

export default {
  name: 'LoginPage',
  props: {
    // 网站logo
    logo: {
      type: String,
      default: require('../../assets/images/logo-primary.png')
    },
    // 登录框插画
    loginImg: {
      type: String,
      default: require('../../assets/images/login-img.png')
    },
    // 背景图片地址
    backgroundImage: {
      type: String,
      default: require('../../assets/images/login-bg.png')
    },
    // 系统名称
    appName: {
      type: String,
      default: appConf.appName
    },
    appVersion: {
      type: String,
      default: appConf.appVersion
    },
    // 后台登录接口
    // eslint-disable-next-line vue/require-default-prop
    loginUrl: String,
    // 是否自己处理回调
    delResponse: {
      type: Boolean,
      default: false
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mixins: [mixins()],
  data() {
    return {
      defaultLogo: 'this.src="' + this.logo + '";this.onerror=null',
      loginData: {
        grant_type: 'password',
        username: null,
        password: null
      },
      isError: false,
      errText: '',
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loginLoading: false,
      maxWidth: '',
      loginImageWidth: 0,
      loginImageHeight: 0,
      loginImgShow: false,
      padding: '',
      width: '',
      height: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    const img = new Image()
    img.src = this.loginImg
    img.onload = () => {
      this.loginImageWidth = img.width
      this.loginImageHeight = img.height
      this.initImage()
    }
    window.addEventListener('resize', () => {
      this.initImage()
    })
  },
  mounted() {
  },
  methods: {
    loginBoxInit() {
      if ((document.documentElement.clientHeight * 0.68 * 17) / 9 < document.documentElement.clientWidth - 50) {
        this.height = document.documentElement.clientHeight * 0.68 + 'px'
        this.width =
          document.documentElement.clientHeight * 0.68 < 440 ? (440 * 17) / 9 + 'px' : (document.documentElement.clientHeight * 0.68 * 17) / 9 + 'px'
      } else {
        this.height = '68%'
        this.width = '82%'
      }
    },
    initImage() {
      this.$nextTick(() => {
        if (!this.$refs.loginBody) return
        const loginBodyHeight = this.$refs.loginBody.offsetHeight
        this.maxWidth = (loginBodyHeight * parseInt(this.loginImageWidth)) / parseInt(this.loginImageHeight) + 'px'
        this.loginImgShow = true
      })
    },
    handleEnter(e) {
      if (e.which === 13) {
        this.submitForm()
      // eslint-disable-next-line no-empty
      } else {
      }
    },
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const logindata = this.$getRsaCode(JSON.stringify(this.loginData))
          this.$store.dispatch('user/login', logindata).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $REM: 10/16;

  #login {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-position: center, center;
    background-repeat: no-repeat;
    background-size: cover;

    .login-container {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 82%;
      height: 78%;
      min-height: 440px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 44px;
      // padding: $REM*8rem 0;
      margin: 0 auto;
      align-items: center;
      flex-direction: row;

      .login-header {
        padding: 0 7%;
        position: absolute;
        top: $REM*3rem;
        // margin-bottom: $REM*2rem;
        .logo {
          display: inline-block;
          height: $REM*5.5rem;
        }
      }

      .login-body {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        // flex: 1;
        // padding: 20px 30px 50px 50px;
        padding: 0 12% 0 0;
        height: 64%;
        width: 100%;

        .login-img {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          // margin-right: $REM*4rem;
          padding: 0 7%;
          // position: relative;
          // top: -10px;

          img {
            width: 80%;
          }
        }

        .form-wrap {
          // display: flex;
          // align-items: center;
          // flex: 2;
          padding: 10px 0px;
          float: right;

          & div {
            height: auto;
          }

          .name-wrap{
            display: flex;
            align-items: center;
            padding: 12px 0;
            font-size: 26px;

            .appName {
              font-size: $REM*2.4rem;
              font-weight: 700;
              /*margin-bottom: $REM*.6rem;*/
              margin-right: 10px;
            }

            .action-name {
              font-size: $REM*1.6rem;
            }

            .version{
              vertical-align: middle;
              display: inline-block;
              padding: 0px 6px;
              font-size: 14px;
              font-weight: normal;
              background: #ee3b15;
              color: #ffffff;
              border-radius: 1000px;
            }
          }

          .login-form {
            width: $REM*22rem;
            margin-top: $REM*2rem;

            .login-err-pw-formitem {
              margin-bottom: 0;
            }

            .login-err {
              line-height: 1.2;
              color: red;
              margin: $REM*1rem 0;
              transition: all 0.2s;

              > i {
                font-size: $REM*1.4rem;
                position: relative;
                top: -$REM*.1rem;
              }
            }

            .btn {
              width: 100%;
            }

            .forget-passwd-wrap {
              padding: $REM*.5rem 0;
              text-align: right;
              line-height: 1;

              .forget-passwd {
                &:hover {
                  cursor: pointer;
                }

                i,
                span {
                  vertical-align: middle;
                  line-height: 1;
                }

                i {
                  font-size: $REM*1.6rem;
                  color: green;
                }
              }
            }
          }
        }
      }

      .footer {
        position: absolute;
        bottom: $REM*2.5rem;
        width: 100%;
        text-align: center;
        padding: 0 $REM*2rem;

        & p {
          font-size: $REM*1.3rem;
          white-space: normal;
        }
      }
    }
  }

  @media screen and (max-width: 750px) {
    #login .login-container {
      border-radius: $REM*2.4rem;
    }

    #login .login-container .login-body {
      justify-content: center;
      text-align: center;
    }

    .login-body {
      padding: 0 12% !important;

      > .login-img {
        display: none !important;
      }
    }

    #login .login-container .footer {
      bottom: $REM*2rem;
    }
  }
</style>

<style lang="scss">
  $REM: 10/16;
  #login {
    .ivu-form-item {
      margin-bottom: $REM*2.4rem;

      .ivu-form-item-content {
        line-height: $REM*3.2rem;
        font-size: $REM*1.2rem;
      }
    }

    .ivu-input-wrapper {
      .ivu-input-icon {
        left: 0;
        width: $REM*3.2rem;
        height: $REM*3.2rem;
        line-height: $REM*3.2rem;
        font-size: $REM*1.6rem;
      }
    }

    .ivu-input {
      padding-left: $REM*3.2rem;
      padding-right: $REM*.7rem;
      height: $REM*3.2rem;
      font-size: $REM*1.2rem;
      border-radius: $REM*.4rem;
    }

    .ivu-btn {
      span {
        font-size: $REM*1.2rem;
      }
    }
  }
</style>
