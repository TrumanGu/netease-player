<template>
  <section class="comment-list">
    <nav>评论</nav>
    <comment-item v-for="item of commentList" :key="item.id" :commentItem="item"></comment-item>
  </section>
</template>

<script>
import commentItem from "@/components/comment-item.vue";
export default {
  components: {
    commentItem
  },
  props: {
    commentList: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-list {
  background-color: white;
  padding: 0 60px;
  nav {
    padding: 5px 0;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(20px);
    transform: scale(1.2);
    z-index: 1;
    opacity: 0.6;
  }
}
</style>