<template>
  <div class="clipBox">
    <div class="fz">复制口令</div>
    <div>打开【手机淘宝】领券购买</div>
    <div class="tkl">{{inputData}}</div>
    <div
      class="submit"
      @click="handleCopy(inputData,$event)"
    >复制淘口令</div>
  </div>
</template>

<script>
import clip from '../../utils/clipboard' // use clipboard directly
import clipboard from '../../directive/clipboard/index.js' // use clipboard by v-directive
export default {
  name: 'ClipboardDemo',
  props: {
    inputData: ''
  },
  directives: {
    clipboard
  },
  data () {
    return {

    }
  },
  methods: {
    handleCopy (text, event) {
      clip(text, event)
    },
    clipboardSuccess () {
      this.$message({
        message: '复制成功，请打开淘宝',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="less" scoped>
.clipBox {
  text-align: center;
  .fz {
    margin-bottom: 15px;
  }
  .tkl {
    line-height: 20px;
    width: 160px;
    margin: 0 auto;
    background: #fff5f7;
    border: 1px dashed #ff816e;
    margin-bottom: 15px;
    margin-top: 10px;
  }
  .submit {
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: #ff6a69;
    color: #ffffff;
    margin: 0 auto;
  }
}
</style>