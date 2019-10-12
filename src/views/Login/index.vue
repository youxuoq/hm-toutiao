/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
// 登录组件
<template>
  <div class="container-login">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/images/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <div class="login">
        <!-- form: 绑定的表单数据 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
              style="width: 245px; hieght: 47px"
            ></el-input>
            <el-button style="height: 47px; width: 143px; float: right">获取验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="checked">
              <el-checkbox name="agree">
                我已阅读并同意
                <a href="#">用户协议</a>和
                <a href="#">隐私条款</a>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%; height: 50px; font-size: 20px; color: #d5fbfd"
              @click="toLogin('loginForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: true,
      loginRules: {
        mobile: [
          { required: true, message: '手机号时必填项', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码是必填项', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须为6位', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    toLogin (forms) {
      this.$refs[forms].validate(async valid => {
        if (valid) {
          try {
            const { data } = await this.axios.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('TOKEN', JSON.stringify(data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户名或密码错误')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    box-sizing: border-box;
    width: 514px;
    height: 420px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 28px 60px;
    overflow: hidden;
    .el-input__inner {
      height: 47px;
    }
    .el-form-item__content {
      line-height: 30px;
    }

    .title {
      height: 52px;
      text-align: center;
      padding-bottom: 35px;
    }
    .login {
      width: 100%;
    }
    a {
      color: #409eff;
      font-weight: 700;
      text-decoration: none;
    }
    a:hover {
      border-bottom: 1px solid #409eff;
    }
  }
}
</style>
