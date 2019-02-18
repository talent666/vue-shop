<template>
  <div class="login_box">
    <div class="login_container">
      <div class="logo_box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form class="el-form" :rules="formTest" ref="loginFormRef" :model="loginForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="regist">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      formTest: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    regist() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid === true) {
          let { data: res } = await this.$http.post('/login', this.loginForm)
          console.log(res)
          if (res.meta.status !== 200) {
            // return this.$message.error('用户名或密码不存在')
            return this.$message.error('用户名或密码不存在')
          }
          // 通过浏览器的sessionStorage记录服务器返回的token信息
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_box {
  background-color: skyblue;
  height: 100%;
  .login_container {
    width: 450px;
    height: 304px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .logo_box {
      width: 130px;
      border-radius: 50%;
      border: 1px solid #eee;
      padding: 8px;
      background-color: #fff;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      padding: 20px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
