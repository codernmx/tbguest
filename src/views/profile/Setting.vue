<template>
  <div id="seeting">
    <!-- <div class="loading_box">
                        <span class="el-icon-loading loading"
                              v-if="show_loading"></span>
                </div>
                <el-image class="bg"
                          @load="img_load"
                          src="http://e.98kdm.cn/upload/16166705161616670516.jpg"></el-image> -->
    <!-- 写背景图片加载的 -->
    <div class="nav">
      <div
        class="el-icon-arrow-left fz-xl"
        @click="back"
      ></div>
      <div class="diary">设置</div>
      <div class="el-icon-star-off fz-xl"></div>
    </div>
    <div class="check_box">
      <div>声音</div>
      <div>
        <el-switch
          v-model="check_one"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>
    <div class="check_box">
      <div>震动</div>
      <div>
        <el-switch
          v-model="check_two"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>
    <div class="check_box">
      <div>通知</div>
      <div>
        <el-switch
          v-model="check_three"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>
    <div class="check_box">
      <div>消息通知</div>
      <div>
        <el-switch
          v-model="check_four"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>
    <div class="check_box">
      <div>信息通知</div>
      <div>
        <el-switch
          v-model="check_five"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>
    <div class="check_box">
      <div>消息通知</div>
      <div>
        <el-switch
          v-model="check_six"
          active-color="#13ce66"
          inactive-color="#dcdfe6"
        >
        </el-switch>
      </div>
    </div>

    <div class="login_out">
      <el-button
        type="warning"
        size="small"
        @click="login_out"
      >注销登录</el-button>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Seeting",
  components: {},
  data () {
    return {
      check_one: null,
      check_two: null,
      check_three: true,
      check_four: null,
      check_five: null,
      check_six: null,
      // show_loading: true,//图片没出来的时候加载动画
    };
  },
  created () {
    this.init();
  },
  methods: {
    //初始化数据，请求默认数据
    init () {
      // api.get_message() //获取日记列表
      //         .then((res) => {
      //                 console.log(res);
      //                 this.message_list = res.DATA;
      //         })
      //         .catch((err) => {
      //                 console.log(err);
      //         });
      //读取localStorage
    },
    back () {
      this.$router.go(-1)
      console.log(this.$router)
    },
    //图片加载完成的回调
    img_load () {
      this.show_loading = false
    },
    //注销
    login_out () {
      localStorage.clear();
      this.$message.success({
        message: '注销成功',
        center: true
      });
      this.$router.push({ path: "/login", name: "Login", });
    },
  },
};
</script>
<style scoped>
.login_out {
  position: absolute;
  bottom: 70px;
  margin-left: 40%;
}
.check_box {
  display: flex;
  justify-content: space-between;
  height: 55px;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px dashed #e1e1e1;
}
/* .bg {
        height: 100vh;
        opacity: 0.4;
        filter: blur(7px); 
        /* Chrome, Opera */
/* }
.loading_box {
        width: 100%;
        text-align: center;
} */
.loading {
  font-size: 80px;
  color: #409eff;
}
</style>
