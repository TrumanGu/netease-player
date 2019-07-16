<template>
  <section class="play-list">
    <nav>
      <span>播放列表</span>
      <Close width="16" height="16" @click="onVanish">x</Close>
    </nav>
    <article>
      <table>
        <tr v-for="item of Music.musicList" :key="item.id" @click="onChosen(item.id)">
          <th>{{item.name}}</th>
          <th class="gray12">{{item.singer}}</th>
          <th class="gray12">{{item.duration}}</th>
        </tr>
      </table>
    </article>
  </section>
</template>

<script>
import Close from "@/assets/svg/close.svg";
import { mapState } from "vuex";
export default {
  name: "play-list",
  components: {
    Close
  },
  methods: {
    onVanish() {
      this.$store.commit('CLOSE_PLAY_LIST')
    },
    onChosen(id) {
      this.$store.commit("PLAY_ANOTHER", id);
    }
  },
  computed: {
    ...mapState(["Music"])
  }
};
</script>

<style lang="scss" scoped>
.play-list {
  position: absolute;
  right: 0;
  bottom: 60px;
  height: 350px;
  width: 460px;
  border: 1px solid #b9b9b9;
  border-bottom: none;
  background-color: #fff;
  font-size: 15px;
  // padding: 10px;
  overflow-y: auto;
  nav {
    border-bottom: 1px solid #e3e3e3;
    padding: 0 20px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    tr {
      height: 44px;
      line-height: 44px;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
      &:nth-child(odd) {
        background: #f9f9f9;
      }
      th {
        padding: 0 20px;
        font-weight: normal;
      }
    }
  }
  .gray12 {
    color: rgb(153, 148, 148);
    font-size: 12px;
  }
}
</style>