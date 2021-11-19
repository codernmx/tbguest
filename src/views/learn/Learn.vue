
<template>
  <div id="learn">
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
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">工具</div>
      <div class="el-icon-refresh fz-xl"></div>
    </div>
    <div class="box">

      <!-- <div class="head"></div> -->
      <h2>一、邮件接收天气信息</h2>
      <div class="two_button">
        <el-input
          v-model="accept"
          placeholder="请输入接受者邮箱"
        ></el-input>
        <el-button
          type="success"
          @click="send_email"
        >发送</el-button>
      </div>
      <div class="mt">{{return_message}}</div>
      <div class="error">{{return_message_err}}</div>

      <h2>二、RGB转换成十六进制颜色码</h2>
      <div class="rgb">
        <el-input
          v-model="red_value"
          placeholder="红色值"
        >
        </el-input>
        <el-input
          v-model="green_value"
          placeholder="绿色值"
        >
        </el-input>
        <el-input
          v-model="blue_value"
          placeholder="蓝色值"
        >
        </el-input>
        <el-button
          type="success"
          @click="to_RGB"
        >转换
        </el-button>
      </div>
      <!-- <div class="mt">
                        <div class="rgb_show"></div>
                </div> -->
      <div class="RGB mt show">
        <el-input
          v-model="RGB_value"
          placeholder="请输入需要转换的值"
        >
        </el-input>
        <!-- <el-button type="success"
                                   @click="to_rgb">转换
                        </el-button> -->
        <div class="show">
          <div
            class="rgb_show"
            :style="{'background':RGB_value}"
          ></div>
        </div>
      </div>

      <div
        v-for="item in list"
        :key="item.ID"
        class="box"
        @click="tkl(item.GoodsId)"
      >
        {{item.GoodsName}}
        {{item.TjRemark}}
        佣金比例：{{item.TKMoneyRate}}%
        商品价格：{{item.GoodsPrice}}
        券后价格：<span class="price">￥{{item.LastPrice}}</span>
        总销量：{{item.SaleCount}}
        <img
          :src="item.ImgUrl"
          alt=""
          width="100"
        >
      </div>
      <el-dialog
        :visible.sync="tklDialog.dialog"
        width="95%"
        center
      >
        <ClipBoard :inputData=tklDialog.dialogValue />
      </el-dialog>

      <div class="line"></div>

    </div>

  </div>
</template>


<script>
import * as api from "../../api/api";
import ClipBoard from "../clipboard/index.vue";
export default {
  name: "Learn",
  components: { ClipBoard },
  data () {
    return {
      tklDialog: {
        dialog: false,
        dialogValue: ''
      },
      list: [],//产品列表
      accept: null,//接收邮箱地址
      return_message: null,//正确的信息
      return_message_err: null,//错误信息

      //
      red_value: null,//十进制红色值
      green_value: null,//十进制绿色值
      blue_value: null,//十进制蓝色值
      RGB_value: null,//十六进制的值
    };
  },
  created () {
    this.init();
  },
  methods: {
    //初始化数据，请求默认数据
    init () {
      //读取localStorage
      this.getShoList()
    },
    tkl (id) {
      api.tkl(id)
        .then((res) => {
          this.tklDialog.dialogValue = '0(' + res.tkl + ')/'
          this.tklDialog.dialog = true
          console.log(res.tkl);
        }).catch((err) => {
          console.log(err);
        });
    },
    getShoList () {
      api.shopList()
        .then((res) => {
          this.list = res.data
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    send_email () {
      if (!this.accept) {
        this.$message.error('请输入邮箱账号');
      } else {
        this.return_message = '';
        this.return_message_err = '';
        api.send_email({
          accept: this.accept
        }) //获取日记列表
          .then((res) => {
            console.log(res);
            this.return_message = res.data;
            this.accept = '';
          })
          .catch((err) => {
            console.log(err);
            this.return_message_err = '邮件发送失败：' + err;
            this.accept = '';
          });
      }

    },
    to_rgb () {

    },
    to_RGB () {
      // console.log(typeof this.red_value)
      let number_red = Number(this.red_value).toString(16)
      let number_green = Number(this.green_value).toString(16)
      let number_blue = Number(this.blue_value).toString(16)
      // this.RGB_value =parseInt(this.red_value,16)
      if ((this.red_value < 0 || this.red_value > 255) || (this.green_value < 0 || this.green_value > 255) || (this.blue_value < 0 || this.blue_value > 255)) {
        this.$message.error('请输入0-255的值');

      } else {
        if (number_red.length < 2) {
          number_red = '0' + number_red
        }
        if (number_green.length < 2) {
          number_green = '0' + number_green
        }
        if (number_blue.length < 2) {
          number_blue = '0' + number_blue
        }
        this.RGB_value = '#' + number_red.toUpperCase() + number_green.toUpperCase() + number_blue.toUpperCase()
        // this.red_value = ''
        // this.green_value = ''
        // this.blue_value = ''
        // 清空输入框的值
      }
    }

  },
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
  padding-bottom: 51px;
}
.box {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
/* 

#learn {
        padding-left: 15px;
        padding-right: 15px;
} */
.two_button {
  display: flex;
}
.error {
  color: #ff0000;
}
.rgb,
.RGB {
  display: flex;
}
/* .show {
        width: 100%;
} */
.rgb_show {
  width: 70px;
  height: 40px;
  /* margin: auto; */
  border: 1px dashed #e1e1e1;
}
/* .head {
        height: 40px;
} */
h2 {
  margin-bottom: 20px;
}
.tools_link {
  font-size: 16px;
}
a {
  color: #0066ff;
}
.link_box {
  width: 100%;
  display: flex;
  height: 40px;
  align-items: center;
}
.link_img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.link_img img {
  width: 20px;
  height: 20px;
}
</style>
