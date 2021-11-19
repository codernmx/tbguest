<template>
  <div class="box">
    <div class="item">
      <div class="left">真实姓名：</div>
      <div class="right">
        <el-input
          v-model="name"
          placeholder="请输入支付宝实名认证的真实姓名"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="left">支付账号：</div>
      <div class="right">
        <el-input
          v-model="account"
          placeholder="请输入支付宝账号"
        ></el-input>
      </div>
    </div>
    <div class="submit">
      <el-button
        style="width:150px"
        type="primary"
        round
        :loading="loading"
        @click="submit"
      >立即绑定</el-button>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: 'Bound',

  components: {},

  directives: {},

  data () {
    return {
      name: '',
      account: '',
      loading: false,

    };
  },

  mounted () {

  },

  methods: {
    submit () {
      if (this.account && this.name) {
        this.loading = true
        setTimeout(() => {
          api.post('/tbk/bound/account', {
            account: this.account,
            name: this.name,
            id: localStorage.getItem('id')
          })
            .then((res) => {
              console.log(res)
              this.$message.success(res.msg);
              this.loading = false

              //后期优化修改
              localStorage.isBound = true;
              this.$router.push({ path: "/profile", name: "Profile", });
            })
            .catch((err) => {
              this.$message.error(err);
              this.loading = false
            });
        }, 2000)
      } else {
        this.$message({
          message: '请填写所有信息在提交哦！',
          type: 'error',
          center: true
        });
      }
    }

  },
};
</script>

<style lang="less" scoped>
.box {
  margin-top: 30px;
  .item {
    padding: 0 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    .left {
      width: 80px;
      text-align: left;
    }
    .right {
      flex: 1;
    }
  }
  .submit {
    display: block;
    text-align: center;
  }
}
</style>