<template>
  <div id="details">
    <el-breadcrumb
      class="mt"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日记详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 class="cen mt">{{ diary_details.TITLE }}</h3>
    <p class="cen mt author">发布者：{{diary_details.AUTHOR}}
      <span class="el-icon-view"></span>
      <span class="browse">浏览量：{{diary_details.BROWSE}}</span>
    </p>
    <p class="cen"> </p>
    <p
      class="mt content"
      v-for="item in diary_details.CONTENT.split('。')"
      :key="item"
    >{{ item }}</p>
    <!-- <img :src="diary_details.IMG"
                     alt=""
                     class="img" /> -->

    <el-image
      class="img"
      @load="img_load"
      :src="diary_details.IMG"
      lazy
    ></el-image>

    <div class="loading_box">
      <span
        class="el-icon-loading loading"
        v-if="show_loading"
      ></span>
    </div>
    <div class="comment_box">
      <div
        class="el-icon-s-promotion"
        :class="{cative:1===show}"
        @click="show =1"
      >分享</div>
      <div
        class="el-icon-s-comment"
        :class="{cative:2===show}"
        @click="show =2"
      >评论</div>
      <div
        class="el-icon-star-off"
        :class="{cative:3===show}"
        @click="show =3"
      >点赞</div>

    </div>
    <p class="cen mb copyright">Copyright © 2020 By Erha</p>
    <div style="margin-bottom: 49px"></div>

  </div>
</template>

<script>
import * as api from "../../api/api";


export default {
  name: "Details",
  components: {},
  data () {
    return {
      show: null,
      diary_details: {}, //存储日记详细信息
      show_loading: true,//图片没出来的时候加载动画
    };
  },
  created () {
    this.init();
  },
  methods: {
    //初始化
    init () {
      // console.log(this.$route.params.info);
      // console.log(this.$route.query.id);
      // this.diary_details = this.$route.params.info;//携带过来的参数页面刷新不会保留
      api.get_details(this.$route.query.id) //获取日记列表
        .then((res) => {
          console.log(res);
          this.diary_details = res.DATA[0]
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //图片加载完成的回调
    img_load () {
      this.show_loading = false
    },
  },
};
</script>

<style scoped>
#details {
  padding-left: 15px;
  padding-right: 15px;
}
.img {
  width: 100%;
  border-radius: 5px;
  margin-top: 15px;
}
.author {
  font-size: 13px;
}
.browse {
  margin-left: 10px;
}
.content {
  text-indent: 2em;
  text-align: justify;
}
.loading_box {
  width: 100%;
  text-align: center;
}
.loading {
  font-size: 50px;
  color: #409eff;
}
.copyright {
  margin-top: 10px;
  font-size: 15px;
}
.comment_box {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 20px;
}
.cative {
  color: #ff5777;
}
</style>