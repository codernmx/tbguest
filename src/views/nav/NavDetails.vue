<template>
  <!-- 头部 -->
  <div id="navdetails">
    <div class="section">
      <div class="nav">
        <div
          class="el-icon-arrow-left fz-xl"
          @click="tonav"
        ></div>
        <div class="diary">编程导航</div>
        <div class="el-icon-refresh fz-xl"></div>
      </div>

      <vue-particles
        color="#FF5777"
        :particleOpacity="0.6"
        :particlesNumber="80"
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
      <div>
        <div class="imgBox">
          <img
            :src="info.logoSrc"
            alt=""
          >
        </div>
        <a
          class="link"
          :href="info.url"
        >
          <p style="text-align:center">链接：{{info.url}}</p>
        </a>
        <p class="details">{{info.details}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NavDetails",
  data () {
    return {
      info: ''
    };
  },
  created () {
    this.info = this.$route.params.info
    // console.log('555',this.info)
  },
  methods: {
    tonav () {
      this.$router.push('/nav')
    },
    //跳转
    toDetails (row) {
      console.log(1)
      console.log(row)

    },
    handleClick (tab, event) {
    }
  }
};
</script>

<style scoped>
.details {
  text-align: justify;
}
.section {
  padding-left: 15px;
  padding-right: 15px;
}
.bg {
  width: 100%;
  position: absolute;
  z-index: -1;
}
.link {
  color: blue;
  margin-top: 15px;
  display: block;
  margin-bottom: 15px;
}
.imgBox {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>