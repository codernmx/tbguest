<template>
  <div id="about">
    <!-- 回到顶部 -->
    <el-backtop :bottom="100">
      <div class="el-icon-caret-top"></div>
    </el-backtop>
    <!-- 回到顶部  结束 -->
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#FF5777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="90"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="nav">
      <div
        class="el-icon-arrow-left fz-xl"
        @click="back"
      ></div>
      <div class="diary">简历</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>
    <div class="box">
      <!-- <h2 style="text-align:center"
                            class="about_me">个人简历</h2> -->
      <!-- drawer -->

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        size="50%"
      >
        <div class="drawer_box">
          <div>
            <div>Js</div>
            <div>90%</div>
          </div>
          <div>
            <div>Html/Css</div>
            <div>90%</div>
          </div>
          <div>
            <div>小程序</div>
            <div>80%</div>
          </div>
          <div>
            <div>Vue</div>
            <div>70%</div>
          </div>
          <div>
            <div>Python</div>
            <div>40%</div>
          </div>
          <div>
            <div>Mysql</div>
            <div>60%</div>
          </div>
          <div>
            <div>Node</div>
            <div>50%</div>
          </div>
          <div>
            <div>Element/Vant</div>
            <div>80%</div>
          </div>
          <div>
            <div>Ps</div>
            <div>50%</div>
          </div>
          <div>
            <div>office</div>
            <div>40%</div>
          </div>

        </div>
      </el-drawer>
      <!-- drawer  结束 -->
      <div>

        <div class="pic_box">
          <el-tooltip
            effect="dark"
            content="点头像查看技能哦！"
            placement="right"
          >
            <img
              @click="drawer = true"
              src="../../assets/img/about/head.png"
              alt=""
            >
          </el-tooltip>

        </div>
        <p class="basic">{{content}}</p>
      </div>

      <div>
        <h3>主修课程</h3>
        <p> C语言/C++、Mysql、PHP（Tp5）、
          人机交互界面设计、数据结构、Photoshop、
          色彩构成、网站策划与运营、计算机动画（js动画）、HTML/CSS、
          Javascript。</p>
      </div>
      <div>
        <h3>校园经历</h3>
        <p class="strong">担任宿舍管理委员会副部长</p>
        <p>积极参与各项活动的同时协助部门成员策划并举办多个校园大型活动，
          如寻找最美室友，联合其他部门完成春节晚会的举办，为活动筹办拉取赞助，
          锻炼提升了自己的沟通组织能力。
        </p>

      </div>
      <div>
        <h3>项目经验</h3>
        <p class="strong">一、基于Bootstrap的响应式电商网站</p>
        <p>1、独立完成需求说明书，网站策划书、原型设计、设计制作PSD原稿。</p>
        <p>2、利用HTML+CSS+Javascript制作前端界面、
          利用Bootstrap框架完成页面响应式。收获：熟悉了Bootstrap框架的类，学会了响应式的原理。</p>

        <p> </p>
        <p class="strong">二、建材企业网站</p>
        <p>1、 独立完成网站的策划、设计。</p>
        <p>2、利用HTML/CSS以及Javascript完成网站的静态页面效果。</p>
        <p>3、采用PHP语言完成网站后台登录注册，增删改商品功能。
          后台对前台新闻中心的数据管理（可增删改查），
          可以对登陆的用户进行停用启用，实现角色权限管理。</p>

      </div>
      <div>
        <h3>实习经历</h3>
        <p class="strong">重庆源牛科技有限公司（2020.12 --- 2021.04）</p>
        <p>负责公司项目的前端界面开发，维护，部分文档的编写，在职期间，开发过两款小程序（西大学院招聘，海事局小程序），
          和一个信息系统管理后台界面（Vue），上线得到用户的高度肯定，使用期间未发现Bug。</p>
        <p>收获：了解了团队协作开发的过程，更加熟练了Vue，微信小程序，接触了Python+Falsk+Uwsgi+Nginx部署后端环境（写接口）。</p>

      </div>
      <div>
        <h3>荣誉证书</h3>
        <p>2018年5月 荣获校“优秀共青团干部”荣誉称号；</p>
        <p>2018年1月 荣获校“先进个人”荣誉称号；</p>
        <p>2018年9月 荣获重庆市巴南区“优秀志愿者”荣誉称号；</p>
        <p>2018年10月 荣获校“自立自强先进个人”荣誉称号；</p>
        <p>2019年11月 荣获校“优秀学生干部”荣誉称号；</p>
        <p>2020年6月 荣获校寒假社会实践“先进个人”荣誉称号；</p>
        <p>2020年6月 荣获校平面广告艺术设计大赛二等奖；</p>

      </div>
      <div>
        <h3>个人技能</h3>
        <p>语言技能：普通话二级甲等。</p>
        <p>办公技能：能熟练使用office。</p>
        <p>其他技能：GYB合格证书、C1驾驶证。</p>

      </div>
      <div>
        <h3>自我评价</h3>
        <p>热爱前端，喜欢接触新知识，爱钻研，喜欢积累，前段工作当中，坚持将遇到的问题，通过个人博客记录下来，
          写博客的过程一是可以回过头来回味一遍问题，二来是可以帮助其他小伙伴解决相同的问题，
          目前CSDN博客发布100来篇文章，工作中善于反思总结自己，每天习惯了记录一天做了那些事。</p>
        <p>博客地址：<a href="https://blog.csdn.net/qq_31754591">https://blog.csdn.net/qq_31754591</a></p>
      </div>
      <h3>作品展示</h3>
      <div class="project_show">
        <div>
          <img
            src="../../assets/img/tools/vue.png"
            alt=""
          >
        </div>
        <div>
          <img
            src="../../assets/img/tools/vue.png"
            alt=""
          >
        </div>
        <div>
          <img
            src="../../assets/img/tools/vue.png"
            alt=""
          >
        </div>
        <div>
          <img
            src="../../assets/img/tools/vue.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="line"></div>

  </div>
</template>

<script>
export default {
  name: "About",
  data () {
    return {
      drawer: false,
      content: '',
    }
  },
  created () {
    this.init();
  },
  methods: {
    back () {
      this.$router.go(-1)
      console.log(this.$router)
    },
    init () {
      var that = this
      var n = 0
      var str = '刘常灵，男，中共党员，重庆工程学院，本科'
      var length_c = str.length
      var timer = setInterval(function () {
        if (n < length_c) {
          that.content = that.content + str.substring(n, n + 1)
          n++
        } else {
          clearInterval(timer);
        }
      }, 120)
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
}
.line {
  padding-bottom: 100px;
}
/* 简历部分 */
/* .about_me {
        line-height: 80px;
} */
.basic {
  text-align: center;
  font-size: 16px;
  line-height: 34px;
}
p {
  text-indent: 2em;
  line-height: 28px;
  text-align: justify;
}
.pic_box {
  width: 105px;
  height: 130px;
  border-radius: 5px;
  overflow: hidden;
  margin: auto;
}
.pic_box img {
  width: 105px;
  height: 130px;
}
.box {
  padding-left: 15px;
  padding-right: 15px;
}
.drawer_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 30px;
}
.drawer_box div {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 10px;
  border-bottom: 1px dashed #eeeeee;
}
.strong {
  font-weight: 1000;
}
.project_show {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.project_show div {
  width: 50%;
  height: 150px;
  border: 1px solid #eeeeee;
}
.project_show div img {
  width: 80%;
  display: block;
  margin: auto;
}
</style>
