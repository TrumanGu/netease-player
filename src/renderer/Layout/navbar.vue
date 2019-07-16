<template>
  <section class="navbar" :style="{ height: height+'px', backgroundColor: backgroundColor}"></section>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    height: {
      type: Number,
      default: 32
    },
    backgroundColor: {
      type: String,
      default: "#BC2F2E"
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999999;
}
</style>