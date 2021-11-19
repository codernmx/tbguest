<template>
  <div id="profile">
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="70"
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
      class="bg_li"
    >
    </vue-particles>
    <div class="bg">

      <div
        class="card"
        @click="toTools"
      >
        <div class="head_box">
          <img
            src="https://file.nmxgzs.cn/upload/images/head.jpg"
            alt=""
            class="head"
          />
          <!-- <div class="name">你好，{{ info.user }}</div> -->
        </div>
        <!-- <a href="https://blog.csdn.net/qq_31754591"
                                   target="_blank"
                                   rel="noopener noreferrer">CSDN博客中心</a> -->
        <div class="nick">登录用户：{{user}}</div>
      </div>

      <div class="cell_box">
        <div class="withDrawal">
          <div class="expect">
            <div class="word">付款预估收入</div>
            <div class="price">￥{{expect | parseInt}}</div>
          </div>
          <div class="canCarry">
            <div class="word">可提现金额</div>
            <div class="price">￥0.00</div>
          </div>
          <div
            class="toWithDrawal"
            @click="toWithDrawal"
          >
            <div class="word">提现</div>
          </div>
        </div>
        <div
          class="cell"
          @click="toOrderList"
        >
          <div>
            <span class="el-icon-sunny icon"></span>
            <span>订单列表</span>
          </div>
          <span class="el-icon-arrow-right"></span>
        </div>
        <div
          class="cell"
          @click="toPhotoList"
        >
          <div>
            <span class="el-icon-star-off icon"></span>
            <span>我的相册</span>
          </div>
          <span class="el-icon-arrow-right"></span>
        </div>

        <div
          class="cell"
          @click="setting"
        >
          <div>
            <span class="el-icon-setting icon"></span>
            <span>功能设置</span>
          </div>
          <span class="el-icon-arrow-right"></span>
        </div>

        <div
          style="text-align:center;margin-top:30px"
          v-if="isShowAuthorization"
        >
          <a :href="getSessionBaseUrl + getSessionBackUrl">
            <el-button type="danger">立即授权</el-button>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Profile",
  components: {},
  data () {
    return {
      isShowAuthorization: true,//是否展示授权
      getSessionBaseUrl: 'https://oauth.taobao.com/authorize?spm=a219a.15212433.0.0.3617669aPjka6j&response_type=code&client_id=30205726&state=1212&view=wap&redirect_uri=',
      // getSessionBackUrl: 'http://localhost:8080/#/profile',
      getSessionBackUrl: 'https://nmxgzs.cn/#/profile',
      user: null,
      expect: 0,
    }
  },
  created () {
    this.init();
    this.GetQueryJson(location.href)
  },
  filters: {
    parseInt: function (value) {
      if (value) {
        return Number(value).toFixed(2)
      } else {
        return value
      }
    }
  },
  methods: {
    // 获取url中的code
    GetQueryJson (url) {
      // let url = url; // 获取当前浏览器的URL
      let arr = []; // 存储参数的数组
      let res = {}; // 存储最终JSON结果对象
      arr = url.split('?')[1].split('&'); // 获取浏览器地址栏中的参数
      for (let i = 0; i < arr.length; i++) { // 遍历参数
        if (arr[i].indexOf('=') != -1) { // 如果参数中有值
          let str = arr[i].split('=');
          res[str[0]] = str[1];
        } else { // 如果参数中无值
          res[arr[i]] = '';
        }
      }
      console.log(res)
      if (res.code) {
        this.getSession(res.code)
      }
    },
    //初始化数据，请求默认数据
    init () {
      this.user = localStorage.getItem('user')
      const channelId = localStorage.getItem('channelId')
      api.getOrderList(channelId) //获取所有订单
        .then((res) => {
          console.log(res)
          let num = null
          res.DATA.forEach(item => {
            num = num + item.pub_share_pre_fee * item.item_num
          });
          this.expect = num
        })
        .catch((err) => {
          console.log(err);
        });

      if (localStorage.getItem('channelId') == 'null') {
        this.isShowAuthorization = true
      } else {
        this.isShowAuthorization = false
      }
      // console.log(this.isShowAuthorization)
    },
    getSession (code) {
      //通过code 获取session
      api.get('/tblm/get/access/token', {
        code
      })
        .then((res) => {
          const session = JSON.parse(res.token_result).refresh_token
          let _this = this
          //根据session 得到用户的渠道ID
          api.get('/tblm/create', {
            session
          })
            .then((resu) => {
              console.log(resu)
              //提示信息
              if (resu.code == 15) {
                this.$message.error(resu.sub_msg);
              } else if (resu.data.desc == '重复绑定粉丝' || resu.data.desc == '重复绑定渠道') {
                this.$message.error(resu.data.desc);
              } else {
                _this.$message.success(resu.data.desc);
              }
              //请求接口将渠道id存储到用户表
              api.post('/tbk/bound/channelId', {
                channelId: resu.data.relation_id,
                user: localStorage.getItem('user'),
                id: localStorage.getItem('id'),
              })
                .then((result) => {
                  console.log(result)
                  if (result.code == 200) {
                    setTimeout(() => {
                      this.$message.success('绑定账号更新成功');
                    }, 1000)
                    //更新本地存储的用户、id、渠道id
                    localStorage.id = result.data.id;
                    localStorage.user = result.data.user;
                    localStorage.channelId = result.data.channelId;//存储渠道ID
                  }
                })
            })
            .catch((err) => {
              this.$message.error(err);
            });
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 跳转到相册
    toPhotoList () {
      this.$router.push({ path: "/photo_list", name: "Photo_list", });
    },
    //跳转设置
    setting () {
      this.$router.push({ path: "/setting", name: "Setting", });
    },
    //跳转
    toTools () {
      this.$router.push({ path: "/tools", name: "Tools", });
    },
    //到订单
    toOrderList () {
      this.$router.push({ path: "/order", name: "Order", });
    },
    toWithDrawal () {
      //如果没有account就是没有绑定账号
      const isBound = localStorage.getItem('account')
      if (!isBound) {
        this.$confirm('亲，您需绑定支付宝才能提现哦', '温馨提示', {
          customClass: 'confirmBox',
          confirmButtonText: '好的马上去',
          cancelButtonText: '下次一定',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({
            path: "/bound", name: "Bound", query: {
              user: localStorage.getItem('user')
            }
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      } else {
        this.$router.push({
          path: "/withDrawal", name: "WithDrawal", params: {
            withDrawal: this.expect
          }
        });
      }
    }
  },
};
</script>
<style lang="less" scoped>
/* localStorage.setItem(key,value);
读取数据：localStorage.getItem(key); */
.bg {
  position: absolute;
  z-index: -999;
  width: 100%;
  height: 200px;
  background: url(../../assets/img/my/bg.jpg);
  /* filter: blur(0.5px);Chrome, Opera */
}

.name {
  color: #ffffff;
  text-align: center;
  font-size: 30px;
}
.login_out {
  position: absolute;
  bottom: 61px;
  width: 100%;
  text-align: center;
}
.head {
  width: 60px;
  height: 60px;
}
.head_box {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  border: 1px dashed #cccccc;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}
.card {
  width: 340px;
  height: 100px;
  background: #ffffff;
  border-radius: 9px;
  margin: auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  margin-top: 15px;
  text-align: center;
  margin-top: 120px;

  justify-content: center;
}

.cell_box {
  width: 100%;
  padding-left: 30px;
  padding-right: 20px;
  /* background: #000; */
  .cell {
    display: flex;
    justify-content: space-between;
    height: 45px;
    border-bottom: 1px solid #e1e1e1;
    align-items: center;
  }
  .withDrawal {
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 15px;
    .expect {
      .word {
        font-size: 14px;
        line-height: 26px;
      }
      .price {
        color: #f40;
        font-size: 18px;
      }
    }
    .canCarry {
      .word {
        font-size: 14px;
        line-height: 26px;
      }
      .price {
        color: #f40;
        font-size: 18px;
      }
    }
    .toWithDrawal {
      height: 46px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .word {
        background: #6285ec;
        color: #e1e1e1;
        display: block;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 30px;
      }
    }
  }
}

.icon {
  margin-right: 10px;
}
.write {
  text-align: center;
  margin: 5px;
}
.bg_li {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1000;
}
</style>
<style>
.confirmBox {
  width: 280px;
}
</style>
