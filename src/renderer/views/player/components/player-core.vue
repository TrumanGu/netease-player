<template>
  <section class="player-core">
    <section class="player-core__cover">
      <img :src="song.al.picUrl" width="300" height="300" alt="music-cover">
      <div class="contron-tab">
        <span class="tab-item">
          <Fav width="16px" height="16px"></Fav>喜欢
        </span>
        <span class="tab-item">
          <Download width="16px" height="16px"></Download>下载
        </span>
        <span class="tab-item">
          <Share width="16px" height="16px"></Share>分享
        </span>
        <span class="tab-item">
          <Collect width="16px" height="16px"></Collect>收藏
        </span>
      </div>
      <audio autoplay ref="core-audio" :src="url"></audio>
    </section>
    <section class="player-core__info">
      <lyrics-carousel :lyrics="lyrics" :song="song" :currentTime.sync="currentTime"></lyrics-carousel>
    </section>
    <section></section>
  </section>
</template>

<script>
import Fav from "@/assets/svg/fav.svg";
import Download from "@/assets/svg/download.svg";
import Collect from "@/assets/svg/collect.svg";
import Share from "@/assets/svg/share.svg";
import lyricsCarousel from "./lyrics-carousel";
import { mapState } from "vuex";
export default {
  name: "Player-Core",
  components: {
    Fav,
    Download,
    Collect,
    Share,
    lyricsCarousel
  },
  props: {
    lyrics: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      intervals: {
        currentTime: null
      },
      duration: 0, // 歌曲总时长
      currentTime: 0, // 当前播放时间
      percent: 0 // 播放百分比
    };
  },
  computed: {
    ...mapState(["Music"])
  },
  methods: {
    getCurrentTime() {
      // currentTime 获取当前播放时间
      return this.$refs["core-audio"].currentTime;
    },
    getDuration() {
      // duration 获取歌曲的总时间
      return this.$refs["core-audio"].duration;
    },
    musicStart() {
      this.$refs["core-audio"].play();
    },
    musicPause() {
      this.$refs["core-audio"].pause();
    },
    UPDATE_MUSIC_PERCENT(percent) {
      this.$store.commit("UPDATE_MUSIC_PERCENT", percent);
    }
  },
  mounted() {
    this.intervals.currentTime = setInterval(() => {
      this.currentTime = this.getCurrentTime();
      let _percent = this.currentTime / this.getDuration();
      if (isFinite(_percent)) this.percent = _percent;
      this.UPDATE_MUSIC_PERCENT(this.percent);
    }, 1000);
  },
  beforeDestroy() {
    window.clearInterval(this.intervals.currentTime);
  },
  watch: {
    "Music.playFlag"(newValue, oldValue) {
      // console.log(newValue);
      if (newValue === 0) {
        this.musicPause();
      } else if (newValue === 1) {
        this.musicStart();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player-core {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  z-index: 10;
  justify-content: center;
  &__cover {
    z-index: 10;
    min-width: 400px;
    // flex: 3;
    text-align: center;
    .contron-tab {
      font-size: 12px;
      width: 300px;
      padding-top: 20px;
      margin: auto;
      display: flex;
      justify-content: center;
      .tab-item {
        cursor: pointer;
        margin-left: 5px;
        display: inline-block;
        padding: 3px 5px;
        width: 50px;
        border: 1px solid #a3a5a9;
        background-color: #c9cacd;
        &:active {
          transform: scale(0.95);
        }
        svg {
          vertical-align: bottom;
        }
      }
    }
  }
  &__info {
    // flex: 4;
    margin-left: 40px;
    z-index: 10;
    min-width: 300px;
  }
}
</style>