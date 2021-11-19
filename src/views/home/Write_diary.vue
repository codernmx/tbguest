<template>
  <div id="write_diary">
    <nav class="nav">
      <div @click="close_diary">取消</div>
      <div>写日记</div>
      <div>
        <el-button
          type="primary"
          round
          size="mini"
          @click="submit_upload"
        >发表</el-button>
      </div>
    </nav>
    <div class="box">
      <el-input
        v-model="filedata.title"
        class="title"
        placeholder="记录新鲜事"
      ></el-input>
      <el-input
        type="textarea"
        class="content"
        :rows="5"
        placeholder="记录新鲜事"
        v-model="filedata.content"
        :autosize="{ minRows: 6, maxRows: 10}"
      >
      </el-input>

      <el-upload
        class="upload-demo"
        accept=".jpeg,.jpg,.png"
        ref="upload"
        action="/api/write/diary"
        :on-preview="handlePreview"
        :on-success="upload_success"
        :file-list="fileList"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :data=filedata
      >
        <el-button
          slot="trigger"
          size="medium"
          class="choose_file_button"
          type="primary"
        >选取文件
        </el-button>
        <!-- <div slot="tip"
                                     class="el-upload__tip"></div> -->
      </el-upload>

    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Write_diary",
  components: {},
  data () {
    return {

      fileList: [],//文件列表
      filedata: {
        'title': '',//文章标题
        'content': '',//文章内容
        'author': ''
      },
      all_info: false,//是否填写所有信息
    };
  },
  created () {
    this.init();
  },
  methods: {
    beforeAvatarUpload (file) {
      console.log(file)
      // console.log(file.type)
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      // const isLt2M = file.size / 1024 / 1024 < 2; 大小限制
      if (this.filedata.title && this.filedata.content && this.filedata.author) {
        this.all_info = true
      } else {
        this.$message.error('亲！请填写所有内容哦');
      }
      if (!isJPG) {
        this.$message.error('亲！目前仅仅支持JPG/PNG');
      }
      return isJPG && this.all_info
    },
    // 上传文件
    submit_upload (file) {
      console.log(file)
      if (this.filedata.title && this.filedata.content && this.filedata.author) {
        this.$refs.upload.submit();
      } else {
        this.$message.error('亲！请填写所有内容哦,并且选择文件');
      }

    },
    close_diary () { this.$router.push({ path: "/home", name: "Home", }); },
    upload_success () {
      //提示发表成功
      this.$message.success("发表成功");
      this.$router.push({ path: "/home", name: "Home", });
    },
    handlePreview (file) {
      console.log(file);
    },
    // 上传文件
    //初始化数据，请求默认数据
    init () {
      this.filedata.author = localStorage.getItem("user");
      // api.get_message() //获取日记列表
      //         .then((res) => {
      //                 console.log(res);
      //                 this.message_list = res.DATA;
      //         })
      //         .catch((err) => {
      //                 console.log(err);
      //         });
    },
  },
};
</script>

<style scoped>
.nav {
  height: 44px;
  line-height: 44px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: space-between;
}
.box {
  width: 100%;
  height: 250px;
  padding-left: 15px;
  padding-right: 15px;
  /* border: 1px solid black; */
}
.title {
  margin-top: 15px;
  margin-bottom: 10px;
}
.content {
  margin-bottom: 10px;
}
.upload-demo {
  width: 100%;
}
.choose_file_button {
  width: 100%;
}
</style>
<style>
.el-upload {
  width: 100%;
}
</style>