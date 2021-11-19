<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.noRefresh"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.noRefresh"></router-view>
    <!-- 判断是否是需要显示的界面 -->
    <MainTabBar v-if="!$route.meta.keepAlive"></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
  created () {
    this.init()
  },
  methods: {
    init () {
    }
  }
};
</script>
<style>
@import 'assets/css/base.css';
@import 'assets/css/public.css';
body {
  background: #fffefe;
}
</style>
