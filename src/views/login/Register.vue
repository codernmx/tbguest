<template>
  <div id="login">
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#FF5777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="130"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="box">
      <el-input
        v-model="user"
        placeholder="请输入账号"
        prefix-icon="el-icon-user"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-unlock"
        v-model="password"
        show-password
      ></el-input>
      <el-input
        placeholder="重复输入密码"
        prefix-icon="el-icon-unlock"
        v-model="rePassword"
        show-password
      ></el-input>
      <div class="verify">
        <el-input
          placeholder="输入验证码"
          prefix-icon="el-icon-unlock"
          v-model="inputVerify"
        ></el-input>
        <div class="verifyNum" @click="newVerify">{{ verify }}</div>
      </div>
      <el-button
        type="primary"
        size="medium"
        class="submit"
        @click="submit"
        :loading="loginLoading"
        >马上注册</el-button
      >
    </div>
    <p class="cen" @click="toLogin">
      已有账号，去登陆
    </p>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      rePassword: "", //重复密码
      inputVerify: "", //输入的验证码
      verify: "点击获取",
      user: "",
      password: "",
      loginLoading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化数据，请求默认数据
    init() {
      //读取localStorage
    },
    //生成验证码
    newVerify() {
      this.verify = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    },
    toLogin() {
      this.$router.push({
        path: "/login",
        name: "Login"
      });
    },
    submit() {
      this.loginLoading = true;
      //请求接口
      // 跳转
      if (this.user && this.password && this.rePassword && this.inputVerify) {
        if (
          this.inputVerify == this.verify &&
          this.password == this.rePassword
        ) {
          //do something
        } else {
          setTimeout(() => {
            this.$message.error({
              message: "验证码不正确或者两次密码不一致",
              center: true
            });
            this.loginLoading = false;
          }, 2000);
        }
      } else {
        setTimeout(() => {
          this.$message.error({
            message: "请输入全部信息哦",
            center: true
          });
          this.loginLoading = false;
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  margin: auto;
  height: 230px;
  margin-top: 180px;
}
.submit {
  width: 100%;
}

.bg {
  width: 100%;
  height: 100%;
  background: #fcfcfc;
  position: absolute;
  z-index: -1;
  top: 0;
  overflow: hidden;
}
.cen {
  margin-top: 10px;
  font-size: 12px;
}
.verify {
  display: flex;
}
.verifyNum {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px solid #dcdfe6;
  font-size: 15px;
  margin-left: 5px;
  /* text-decoration:line-through; 删除线*/
}
</style>
