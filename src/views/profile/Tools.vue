<template>
  <div id="tools">
    <Snow />
    <div class="nav">
      <div
        class="el-icon-arrow-left fz-xl"
        @click="back"
      ></div>
      <div class="diary">个人</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>
    <div class="coderLink">
      <p>
        gitee: <a
          href="https://gitee.com/codernmx"
          target="_blank"
          rel="noopener noreferrer"
        >https://gitee.com/codernmx</a>
      </p>
      <p>
        github: <a
          href="https://github.com/codernmx"
          target="_blank"
          rel="noopener noreferrer"
        >https://github.com/codernmx</a>
      </p>
      
      <p>
        博客地址：<a href="https://blog.csdn.net/qq_31754591">https://blog.csdn.net</a>
      </p>
      <el-divider></el-divider>
    </div>


    <div class="some_logo">
      <img
        src="../../assets/img/home/web.png"
        alt=""
      >
      <img
        src="../../assets/img/home/qq.png"
        alt=""
      >
      <img
        src="../../assets/img/home/csdn.png"
        alt=""
      >
      <img
        src="../../assets/img/home/github.png"
        alt=""
      >
      <img
        src="../../assets/img/home/wechat.png"
        alt=""
      >
    </div>
    <p class="cen copyright">Copyright © 2020 By Erha</p>

  </div>
</template>

<script>
import * as api from "../../api/api";

import Snow from "components/common/snowbg/Snow"//导入飘雪花的背景

export default {
  name: "Tools",
  components: {
    Snow //雪花
  },
  data () {
    return {

    };
  },
  created () {
    this.init();
  },
  methods: {
    //初始化数据，请求默认数据
    init () {
      //读取localStorage
    },
    back () {
      this.$router.go(-1)
    }
  },
};
</script>
<style lang="less" scoped>
#tools {
  padding-left: 15px;
  padding-right: 15px;
  height: 100vh;
}
.coderLink {
  margin-top: 30px;
  text-align: center;
  line-height: 32px;
  a{
    color: #409EFF;
  }
}
/* 部分logo */
.some_logo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    margin-left: 20px;
  }
}
.copyright {
  margin-top: 10px;
  font-size: 15px;
}
</style>
