<template>
  <div>
    <div
      @click="back"
      class="el-icon-caret-left back"
    >返回首页</div>
    <el-carousel
      v-if="isImgs"
      :interval="3000"
      arrow="always"
      height="180px"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item,index) in detailPics"
        :key="index"
      >
        <el-image
          :src="item.img"
          fit="contain"
        >
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-else
      :interval="3000"
      arrow="always"
      height="180px"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="(item,index) in imgs"
        :key="index"
      >
        <el-image
          :src="item"
          fit="contain"
        >
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <div>
      <div class="title">{{info.title}}</div>
      <div class="priceBox">
        <div>淘宝参考价￥<span class="priceOriginal">{{info.originalPrice}}</span></div>
        <div>网站到手价<span class="priceIcon">￥</span><span class="price">{{info.actualPrice}}</span></div>
      </div>
      <!-- <div>佣金比率{{info.commissionRate}}</div> -->
      <div class="shareBuyButton">
        <el-button
          type="danger"
          @click="buyNow(goodsId)"
          round
          icon="el-icon-share"
        >
          分享赚{{((info.actualPrice *info.commissionRate)/100) | parseInt}}元
        </el-button>
        <el-button
          type="danger"
          @click="buyNow(goodsId)"
          round
        >
          购买返{{((info.actualPrice *info.commissionRate)/100) | parseInt}}元
        </el-button>
      </div>
      <!-- 评论 -->
      <el-card class="card">
        <div>
          <h2>评价总数：{{commentList.commentCount}}</h2>
          <h3>追加评论总数：{{commentList.commentAppendCount}}</h3>
          <div
            v-for="(item,index) in commentList.commentList"
            :key="index"
          >
            <div class="itemTop">
              <el-image
                :src="item.headPicUrl"
                lazy
                class="head"
                style="width: 50px; height: 50px"
              ></el-image>

              <div class="userNick">
                <div>{{item.userNick}}</div>
                <div>{{item.commentDate}}</div>
              </div>
            </div>
            <div>{{item.commentContent}}</div>
            <!-- 评论图片 -->
            <div class="userImgBox">
              <div
                v-for="(itemImg,indexImg) in item.images"
                :key="indexImg"
              >
                <el-image
                  :src="itemImg"
                  lazy
                  :preview-src-list="previewList"
                  @click="addPreviewList(item.images)"
                  style="width: 50px; height: 50px"
                ></el-image>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-card>
      <!-- 评论  结束 -->

      <el-dialog
        :visible.sync="tklDialog.dialog"
        width="70%"
        custom-class="myDialog"
        center
      >
        <ClipBoard :inputData=tklDialog.dialogValue />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ClipBoard from "../clipboard/index.vue";
import * as api from "../../api/api";
export default {
  name: 'Goodsdeails',
  components: {
    ClipBoard
  },
  directives: {},

  data () {
    return {
      previewList:[],//评论图片列表
      commentList: [],//商品评论
      goodsId: '',//全局goodsId
      tklDialog: {//淘口令
        dialog: false,
        dialogValue: ''
      },
      info: {
        commissionRate: null,
        actualPrice: null,
      },//详情信息
      detailPics: [],//转换后的图片
      imgs: [],//转换后的图片
      isImgs: null,
    };
  },
  mounted () {
    this.init()
  },
  filters: {
    parseInt: function (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    init () {
      this.goodsId = this.$route.query.goodsId
      api.getGoodsDetails(this.$route.query.goodsId)
        .then((res) => {
          this.info = res.data
          if (res.data.detailPics) {
            this.detailPics = JSON.parse(res.data.detailPics)
            this.isImgs = true
            // console.log(this.detailPics)
          } else {
            this.imgs.push(res.data.mainPic)
            if (res.data.imgs) {
              this.imgs.push(res.data.imgs)
            }
          }
        }).catch((err) => {
          console.log(err);
        });
      //获取商品评论
      api.get('/tbk/get/commentList', {
        goodsId: this.$route.query.goodsId
      }).then((res) => {
        console.log('commentList', res)
        this.commentList = res.data
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    //添加到预览图片的列表
    addPreviewList(srcList){
      // console.log(srcList)
      this.previewList = srcList
    },
    buyNow (goodsId) {//点击购买
      this.afterIdentifyDialog = false
      const channelId = localStorage.getItem('channelId')
      api.getPrivilegeLink(goodsId, channelId)
        .then((res) => {
          this.tklDialog.dialogValue = res.data.longTpwd
          this.tklDialog.dialog = true
          console.log(res.data.tpwd);
        }).catch((err) => {
          console.log(err);
        });
    },
    back () {
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.back {
  font-size: 15px;
  margin: 15px 0 15px 0;
}
.title {
  text-align: center;
  margin-top: 15px;
}
.priceBox {
  margin: 15px 0 15px 0;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  .priceOriginal {
    font-size: 30px;
    line-height: 40px;
    margin-right: 15px;
    text-decoration: line-through;
  }
  .priceIcon {
    color: #f40;
  }
  .price {
    font-size: 30px;
    line-height: 40px;
    color: #f40;
  }
}
.card {
  margin-top: 15px;
  .userImgBox {
    display: flex;
    justify-content: flex-start;
    div {
      margin-left: 5px;
    }
  }
  .itemTop {
    display: flex;
    margin-top: 10px;
    .head {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      margin-bottom: 10px;
    }
    .userNick {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
  }
}

.shareBuyButton {
  display: flex;
  justify-content: center;
}
</style>