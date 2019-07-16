<template>
  <section class="comment-item">
    <div class="avatar-wrapper">
      <div class="circle-avatar">
        <img :src="commentItem.user.avatarUrl" width="37" height="37">
      </div>
    </div>
    <div class="comment-content">
      <div>
        <router-link :to="{name: 'name'}">{{commentItem.user.nickname}}</router-link>
        <span>:{{commentItem.content}}</span>
      </div>
      <div class="comment-content__info">
        <div>{{commentItem.time | formatTime}}</div>
        <div>{{commentItem.commentItemlikedCount}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["commentItem"]
};
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  padding: 10px 0;
  border-top: 1px solid #b9b9b9;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  > * {
    z-index: 999;
  }
  .avatar-wrapper {
    padding: 0 20px 0 0;
    .circle-avatar {
      z-index: 999;
      width: 37px;
      height: 37px;
      overflow: hidden;
      border-radius: 50px;
    }
  }
  .comment-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__info {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: rgba(62, 61, 61, 0.62);
    }
  }
}
</style>