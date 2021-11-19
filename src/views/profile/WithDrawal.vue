<template>
  <div>
    <div class="nav">
      <div
        class="el-icon-arrow-left fz-xl"
        @click="back"
      ></div>
      <div class="diary">设置</div>
      <div class="el-icon-star-off fz-xl"></div>
    </div>
    <el-card>
      <div>
        <div class="inputBox">
          <div class="left">到账支付宝</div>
          <div class="right">
            <div>刘常灵</div>
            <div>19923756596</div>
            <div>修改</div>
          </div>
        </div>
        <div class="inputBox">
          <div class="left">提现金额</div>
          <div>
            <el-input
              class="input"
              v-model="money"
              placeholder="请输入提现金额"
            ></el-input>
          </div>
        </div>
        <div class="inputBox">
          <div class="left">可提现余额</div>
          <div>{{actual}}</div>
        </div>

        <el-button
          round
          @click="submit"
          class="submit"
        >立即提现</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { } from "../../api/api";
export default {
  name: 'WithDrawal',

  data () {
    return {
      actual: '',
      money: ''
    };
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {//默认展示的数据
      this.actual = this.$route.params.withDrawal
    },
    back () {
      this.$router.go(-1)
    },
    submit () {
      if (this.money <= this.actual && this.money) {
        this.$message.success('请等待审核')
        this.money = ''
      } else {
        this.$message.error('请正确输入提现金额！')
      }
    }

  },
};
</script>

<style lang="less" scoped>
.submit {
  width: 200px;
  margin: 0 auto;
  display: block;
}
.inputBox {
  height: 34px;
  line-height: 34px;
  display: flex;
  align-items: center;
  .left {
    width: 100px;
    text-align: justify;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
}
p {
  line-height: 34px;
}
</style>