<template>
  <div id="photo_list">
    <p class="title">当前用户所有照片：</p>

    <!-- 添加的图标 -->
    <el-button
      type="primary"
      class="add_photo"
      icon="el-icon-plus"
      size="small"
      circle
      @click="add_photo_button"
    >
    </el-button>

    <div class="photo_box">
      <div
        v-for="item in photo_list"
        :key=item.ID
        class="box"
      >
        <el-image
          :src="item.URL"
          @load="img_load"
          lazy
          class="box_img"
          :preview-src-list="srcList"
        >></el-image>

      </div>
    </div>
    <div
      class="loading_box"
      v-if="show_loading"
    >
      <span class="el-icon-loading loading"></span>
    </div>

    <!-- 对话框 用于上传文件 -->
    <el-dialog
      title="请选择文件"
      :visible.sync="photo_dialog"
      width="70%"
      center
    >
      <div class="uploder_box">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>点击上传</em></div>
          <div
            class="el-upload__tip"
            slot="tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="photo_dialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="photo_dialog = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Photo_list",
  components: {},
  data () {
    return {
      srcList: [],//预览照片
      photo_list: {},//存储返回的所有url
      photo_dialog: false,
      show_loading: true,//图片没出来的时候加载动画
    };
  },
  created () {
    this.init();
  },
  methods: {
    //图片加载完成的回调
    img_load () {
      this.show_loading = false
    },
    // 添加图片
    add_photo_button () {
      this.photo_dialog = true
    },
    //初始化数据，请求默认数据
    init () {
      const user = localStorage.getItem("user");
      api.get_photo_list(user) //获取照片
        .then((res) => {
          console.log(res);
          this.photo_list = res.DATA;
          for (let i = 0; i < res.DATA.length; i++) {
            this.srcList.push(res.DATA[i].URL)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
};
</script>

<style scoped>
.photo_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding-left: 3px;
  padding-right: 3px;
}
.box {
  width: 25%;
  height: 100px;
  overflow: hidden;
  border: 1px solid #e1e1e1;
}
.box_img {
  width: 100%;
  height: 100%;
}
.title {
  line-height: 44px;
  margin-top: 15px;
  font-size: 16px;
  margin-left: 15px;
}
.add_photo {
  position: absolute;
  right: 30px;
  bottom: 100px;
}
.loading_box {
  width: 100%;
  text-align: center;
}
.loading {
  font-size: 80px;
  color: #409eff;
}
</style>
<style >
.el-upload-dragger {
  width: 235px;
}
</style>