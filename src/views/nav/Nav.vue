<template>
  <!-- 头部 -->
  <div id="nav">
    <div>
      <!-- <div class="nav">
        <div class="el-icon-arrow-left fz-xl"></div>
        <div class="diary">编程导航</div>
        <div class="el-icon-refresh fz-xl"></div>
      </div> -->

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

      <el-tabs
        v-loading="tabLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        stretch
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="高佣"
          name="1"
        >
          <el-card
            class="box-card"
            v-for="(item,index) in infoListHeight"
            :key="index"
          >
            <div @click="toDetails(item.goodsId)">
              <!-- <div
              class="nav_box"
              @click="toDetails"
            >
            </div> -->
              <div class="topBox">
                <el-image
                  :src="item.mainPic"
                  lazy
                  style="width: 150px; height: 150px"
                ></el-image>
                <div class="store">
                  <p>{{item.shopName}}</p>
                  <p>描述相符{{item.dsrScore}}</p>
                  <p>服务态度{{item.serviceScore}}</p>
                  <p>物流服务{{item.shipScore}}</p>
                </div>
              </div>
              <p class="cen">{{item.dtitle}}</p>
              <span style="font-size:12px">{{item.desc}}</span>

              <div class="price">
                <p class="dollar">{{item.actualPrice}}元</p>
                <p>优惠券金额<span class="dollar">{{item.couponPrice}}</span>元</p>
              </div>
              <div class="hotLine">
                <div class="hotbox">
                  热力值
                  <span class="hot">{{item.hotPush}}</span>
                  <img
                    src="@/assets/img/nav/fire.png"
                    height="25"
                    alt=""
                  >
                </div>
                <div class="button">
                  <el-button
                    round
                    size="small"
                    type="danger"
                  >立即抢</el-button>
                </div>
              </div>

              <el-tag
                v-if="item.specialText[0]"
                type="warning"
                size="mini"
              >{{item.specialText[0]}}</el-tag>
            </div>
          </el-card>

          <div class="line"></div>
        </el-tab-pane>
        <!-- <el-tab-pane label="编程语言" name="second">编程语言</el-tab-pane> -->
        <el-tab-pane
          label="品牌"
          name="2"
        >
          <el-card
            class="box-card"
            v-for="(item,index) in infoListHeight"
            :key="index"
          >
            <div @click="toDetails(item.goodsId)">
              <!-- <div
              class="nav_box"
              @click="toDetails"
            >
            </div> -->
              <div class="topBox">
                <el-image
                  :src="item.mainPic"
                  lazy
                  style="width: 150px; height: 150px"
                ></el-image>
                <div class="store">
                  <p>{{item.shopName}}</p>
                  <p>描述相符{{item.dsrScore}}</p>
                  <p>服务态度{{item.serviceScore}}</p>
                  <p>物流服务{{item.shipScore}}</p>
                </div>
              </div>
              <p class="cen">{{item.dtitle}}</p>
              <span style="font-size:12px">{{item.desc}}</span>

              <div class="price">
                <p class="dollar">{{item.actualPrice}}元</p>
                <p>优惠券金额{{item.couponPrice}}</p>
              </div>
              <p>热力值<span class="hot">{{item.hotPush}}</span></p>

              <el-tag
                v-if="item.specialText[0]"
                type="warning"
                size="mini"
              >{{item.specialText[0]}}</el-tag>
            </div>
          </el-card>

          <div class="line"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Nav",
  data () {
    return {
      tabLoading: false,//加载动画
      activeName: '1',
      infoListHeight: [],//高佣列表数据
      infoListBrand: [],//品牌列表数据
    };
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getHeightCommission()
    },
    //跳转详情
    toDetails (id) {
      console.log(55)
      this.$router.push({
        path: "/GoodsDeails", name: "GoodsDeails", query: {
          goodsId: id
        }
      });
    },
    // toDetails (row) {
    //   console.log(row)
    //   this.$router.push({
    //     name: "NavDetails",
    //     params: {
    //       info: row,
    //     }
    //   });
    // },
    //获取高佣数据列表
    getHeightCommission () {
      this.tabLoading = true
      api.post('/tbk/height/commission', {}).then(res => {
        console.log(res)
        this.infoListHeight = res.data.list
        this.tabLoading = false
      })
    },
    //获取品牌库列表数据
    getBrandList () {
      api.post('/tbk/get/brand/list', {}).then(res => {
        console.log(res)
        this.infoListBrand = res.data
      })
    },
    handleClick (tab, event) {
      console.log(tab.name)
      if (tab.name == 1) {
        this.getHeightCommission()
      } else {
        // this.getBrandList()
        this.getHeightCommission()
      }
    }
  }
};
</script>

<style lang="less" scoped>
// #nav {
//   padding-left: 15px;
//   padding-right: 15px;
// }
.bg {
  width: 100%;
  position: absolute;
  z-index: -1;
}
.box-card {
  .cen {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .price {
    display: flex;
    justify-content: space-between;
    padding: 10px 25%;
    font-size: 18px;
    .dollar {
      color: #f40;
    }
  }
  .hotLine {
    display: flex;
    justify-content: space-between;
    .hotbox {
      display: flex;
      align-items: center;
      img {
        margin-left: 5px;
      }
      .hot {
        margin-left: 10px;
      }
    }
    .button{
      width: 50px;
      overflow: hidden;
    }
  }
  .topBox {
    display: flex;
    .store {
      padding: 30px;
      line-height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
.line {
  margin-bottom: 51px;
}
</style>