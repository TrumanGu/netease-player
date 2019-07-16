<template>
  <section class="play-bar">
    <div class="play-bar_cover">
      <img :src="Music.coverImgUrl" width="58" height="58" alt="封面图" />
    </div>
    <div class="play-bar_controller">
      <SkipPrevious @click="playPre"></SkipPrevious>
      <Play v-if="Music.playFlag===0" @click="onPlay"></Play>
      <Pause v-if="Music.playFlag===1" @click="onPause"></Pause>
      <SkipNext @click="playNext"></SkipNext>
    </div>
    <div class="play-bar__progress-bar">
      <div class="play-bar__progress-bar--info">
        <span>{{Music.name}}</span> -
        <span>{{Music.singer}}</span>
      </div>
      <div class="play-bar__progress-bar--bar">
        <div class="progress-inner" :style="{width:+ Music.percent*100+'%'}">
          <div class="progress-button">
            <div class="inner-circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="play-bar__selects">
      <Fav></Fav>
      <!-- <LoopRandom></LoopRandom> -->
      <LoopLoop></LoopLoop>
      <!-- <LoopForward></LoopForward> -->
      <Voice></Voice>
      <Menu @click="$store.commit('OPEN_PLAY_LIST')"></Menu>
    </div>
    <transition name="slide" mode="out-in">
      <play-list v-show="Music.playListVisible"></play-list>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import PlayList from "@/components/play-list.vue";
import SkipNext from "../assets/svg/skip-next.svg";
import SkipPrevious from "../assets/svg/skip-previous.svg";
import Play from "../assets/svg/play.svg";
import LoopRandom from "../assets/svg/loop_random.svg";
import LoopLoop from "../assets/svg/loop_loop.svg";
import LoopForward from "../assets/svg/loop_forward.svg";
import Menu from "../assets/svg/menu.svg";
import Voice from "../assets/svg/voice.svg";
import Pause from "../assets/svg/pause.svg";
import Fav from "../assets/svg/fav.svg";
export default {
  name: "Play-Bar",
  computed: {
    ...mapState(["Music"])
  },
  components: {
    SkipNext,
    SkipPrevious,
    Play,
    LoopRandom,
    LoopLoop,
    LoopForward,
    Menu,
    Voice,
    Fav,
    Pause,
    PlayList
  },
  created() {
    this.START_MUSIC();
  },
  methods: {
    playPre() {
      this.$store.commit("PLAY_PRE");
    },
    playNext() {
      this.$store.commit("PLAY_NEXT");
    },
    onPlay() {
      this.START_MUSIC();
    },
    onPause() {
      this.PAUSE_MUSIC();
    },
    START_MUSIC() {
      this.$store.commit("START_MUSIC");
    },
    PAUSE_MUSIC() {
      this.$store.commit("PAUSE_MUSIC");
    }
  }
};
</script>

<style lang="scss" scoped>
.play-bar {
  height: 60px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  z-index: 999999;
  display: flex;
  // position: relative;
  &__cover {
    padding: 1px;
  }
  &_controller {
    padding: 0 30px;
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-between;
    svg {
      width: 36px;
      height: 36px;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
    }
  }
  &__progress-bar {
    width: calc(100% - 230px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    &--info {
      font-size: 12px;
      span:last-child {
        color: gray;
      }
    }
    &--bar {
      margin-top: 10px;
      border-radius: 5px;
      position: relative;
      background: #eee;
      .progress-inner {
        transition: linear 1s;
        position: relative;
        height: 2px;
        background-color: red;
        .progress-button {
          right: 0;
          position: absolute;
          width: 10px;
          height: 10px;
          border: 1px solid #eee;
          border-radius: 10px;
          background-color: #fff;
          top: -4px;
          .inner-circle {
            width: 4px;
            height: 4px;
            background-color: red;
            border-radius: 16px;
            margin: 3px 3px;
          }
        }
      }
    }
  }
  &__selects {
    width: 300px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-self: center;
    svg {
      width: 18px;
      height: 18px;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
    }
    // background-color: hotpink;
  }
}
.slide-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(350px);
  // opacity: 0;
}
</style>