<template>
  <div class="home">
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">写日记</div>
      <div
        class="el-icon-circle-plus-outline add_diary"
        @click="write_diary"
      ></div>
    </div>
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

    <div
      class="content_box"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-input
        v-model="search"
        placeholder="请输入内容"
        suffix-icon='el-icon-search'
        @change='search_diary'
      ></el-input>
      <!-- v-for="item in diary_list.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->

      <div
        v-for="item in diary_list"
        :key="item.id"
        class="diary_box"
        @click="to_details(item)"
      >
        <!-- <div class="titleImg">
          <img :src="item.IMG" alt="" class="diary_img" /> -->
        <p class="title">{{ item.TITLE }}</p>
        <!-- <div></div> -->
        <!-- </div> -->
        <!-- <p class="time cen">{{ item.CREATE_TIME }}</p> -->
        <div class="content">
          <p>
            {{ item.CONTENT.slice(0,60) }}
          </p>
        </div>
        <p class="cen mt author">发布者：{{item.AUTHOR}} <span class="el-icon-view browse"></span> <span>浏览量：{{item.BROWSE}}</span> <span>时间：{{item.CREATE_TIME | createTime }}</span></p>
        <el-divider></el-divider>
      </div>
      <div
        class="empty"
        v-if="diary_list.length ==0"
      >
        <img
          src="../../assets/img/home/empty.png"
          alt=""
        >
        <p>您暂时没有相关日记信息哦，请添加日记！</p>
      </div>

      <!-- <el-pagination
        background
        class="cen"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="5"
        :page-size="pagesize"
        :total="diary_list.length"
        layout="prev, pager, next,jumper"
      >
      </el-pagination> -->
      <div class="some_logo">
        <img
          src="../../assets/img/home/web.png"
          alt=""
        >
        <img
          src="../../assets/img/home/qq.png"
          alt=""
        >
        <img
          src="../../assets/img/home/csdn.png"
          alt=""
        >
        <img
          src="../../assets/img/home/github.png"
          alt=""
        >
        <img
          src="../../assets/img/home/wechat.png"
          alt=""
        >
      </div>
      <p class="cen copyright">Copyright © 2020 By Erha</p>
      <div style="margin-bottom: 64px"></div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
import { get_diary_async } from '../../api/api'
export default {
  name: "Home",
  components: {},
  filters: {
    createTime: function (value) {
      var date = new Date(value);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  },
  data () {
    return {
      loading: true,
      search: '',//搜索输入框的值
      diary_list: [],
      pagesize: 10,//默认分页每页数据量
      currentPage: 1,//默认展示第一页数据
    };
  },
  created () {
    const user = localStorage.getItem("user");
    this.get_diary_async({
      user: user
    })
    this.init()
  },
  methods: {
    //获取查询数据
    async get_diary_async (param) {
      try {
        const res = await get_diary_async(param)
        // console.log(res.data.DATA)
        this.diary_list = res.data.DATA;
        this.loading = false
        // this.tableData = res.data.body.dataList
      } catch (error) {
        console.log(error)
      }
    },
    search_diary () {
      console.log('进入');
      api.diary_search({
        search: this.search
      })
        .then((res) => {
          console.log(res);
          this.diary_list = res.DATA;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //初始化数据，请求默认数据
    init () {
    },
    //跳转到发表日记
    write_diary () {
      this.$router.push({ path: "/write_diary", name: "Write_diary", });
    },
    //跳转到详情页
    to_details (info) {
      this.$router.push({
        path: "/details",
        name: "Details",
        params: {
          info: info,//这里携带的参数页面刷新不会保留
        },
        query: {
          id: info.ID,
        },
      });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
.content_box {
  padding-left: 15px;
  padding-right: 15px;
}
.empty {
  height: 65vh;
  text-align: center;
  font-size: 13px;
}
.empty img {
  width: 100%;
}
/* @media screen and (max-width: 700px) {
        .tips {
                display: none;
        }
}
@media screen and (min-width: 700px) { */
/* .diary_img {
                height: 400px;
                width: 400px;
        }
        .diary_box{
                width: 400px;
                margin: auto;
        } */
/* .diary_box,
        .copyright {
                display: none;
        }
        .tips {
                margin-top: 450px;
                text-align: center;
                display: show;
                font-size: 36px;
        }
} */
.nav {
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
}
.diary {
  font-size: 22px;
  font-weight: 550;
}
.add_diary {
  font-size: 24px;
  color: #409eff;
}
.fz-xl {
  font-size: 24px;
}
.diary_box {
  height: 100%;
  /* border-bottom: 1px dashed #280bc1; */
}
/* .search {
        width: 100%;
        height: 40px;
        border: 1px solid #280bc1;
        border-radius: 5px;
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
} */

.title {
  font-size: 17px;
  line-height: 34px;
}
.time {
  font-size: 12px;
  text-indent: 2.5em;
  line-height: 20px;
}
.content {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
}
.author {
  font-size: 12px;
  margin-bottom: 5px;
}
.browse {
  margin-left: 10px;
}
.bg {
  width: 100%;
  position: absolute;
  z-index: -1;
}
.copyright {
  margin-top: 10px;
  font-size: 15px;
}
/* 部分logo */
.some_logo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.some_logo img {
  width: 25px;
  height: 25px;
  margin-left: 20px;
}

/* .titleImg{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.diary_img{
  width: 30px;
  height: 30px;
} */
</style>