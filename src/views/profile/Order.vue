<template>
  <div>
    <el-alert
      title="订单信息1-30分钟内同步"
      type="warning"
      center
      show-icon
      class="warningMess"
    >
    </el-alert>
    <el-tabs
      class="eltabls"
      stretch
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="全部"
        name="first"
      >
        <div class="allBox">
          <div
            class="itemBox"
            v-for="item in orderList "
            :key="item.id"
            @click="toDetails(item.item_id)"
          >
            <div class="goodsImg">
              <el-image
                class="img"
                :src="item.item_img"
                fit="fill"
              ></el-image>
            </div>
            <div class="goodsDetail">
              <div class="goodsTitle">{{item.item_title}}</div>
              <div class="timePrice">
                <div class="time"><span>付款</span>{{item.tk_paid_time}}</div>
                <div class="price">￥{{item.pub_share_pre_fee}}</div> <span>*{{item.item_num}}</span>
              </div>
              <div class="orderNum"><span>订单</span>{{item.trade_parent_id}}</div>
            </div>
          </div>
          <el-divider
            content-position="center"
            class="bottom"
          >到底了，哥哥！</el-divider>
          <div class="line"></div>

        </div>
      </el-tab-pane>
      <el-tab-pane
        label="待结算"
        name="second"
      >
        <div></div>
      </el-tab-pane>
      <el-tab-pane
        label="已结算"
        name="third"
      >
        <div></div>
      </el-tab-pane>
      <el-tab-pane
        label="已失效"
        name="fourth"
      >
        <div></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getOrderList } from "../../api/api";
export default {
  name: 'Order',
  components: {},
  directives: {},

  data () {
    return {
      activeName: 'first',
      orderList: [],//数据列表数组
    };
  },

  mounted () {
    this.init()
  },

  methods: {
    toDetails (id) {
      this.afterIdentifyDialog = false //关弹窗 （不影响用一个）
      this.$router.push({
        path: "/GoodsDeails", name: "GoodsDeails", query: {
          goodsId: id
        }
      });
    },
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    init () {//默认展示的数据
      const channelId = localStorage.getItem('channelId')
      getOrderList(channelId) //获取订单
        .then((res) => {
          console.log(res)
          this.orderList = res.DATA
        })
        .catch((err) => {
          console.log(err);
        });
    }

  },
};
</script>

<style lang="less" scoped>
.warningMess {
  position: fixed;
  z-index: 2;
  top: 0;
}
.eltabls {
  padding-top: 30px;
  .allBox {
    .itemBox {
      height: 100px;
      padding: 10px;
      margin-bottom: 15px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
      display: flex;
      .goodsImg {
        height: 80px;
        width: 80px;
        border-radius: 20px;
        overflow: hidden;
        .img {
          width: 80px;
          height: 80px;
        }
      }
      .goodsDetail {
        padding-left: 10px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .goodsTitle {
          font-size: 14px;
        }
        .timePrice {
          display: flex;
          justify-content: space-between;

          padding-right: 10px;
          height: 30px;
          .time {
            span {
              margin-right: 5px;
            }
            font-size: 14px;
            line-height: 30px;
          }
          .price {
            line-height: 30px;
            font-size: 24px;
            color: #f40;
          }
          span {
            line-height: 30px;
          }
        }
        .orderNum {
          span {
            margin-right: 5px;
          }
          font-size: 14px;
        }
      }
    }
    .bottom {
      color: darkgrey;
    }
    .line {
      margin-top: 70px;
    }
  }
}
</style>