<template>
  <div id="app">
    <navbar></navbar>
    <router-view class="main-router"></router-view>
    <play-bar></play-bar>
  </div>
</template>

<script>
import navbar from "@/Layout/navbar";
import PlayBar from "@/Layout/PlayBar";
export default {
  name: "netease-player",
  components: {
    navbar,
    PlayBar
  }
};
</script>

<style>
.main-router {
  margin-top: 32px;
}
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* CSS */
</style>
