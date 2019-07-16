<template>
  <section class="lyrics-carousel">
    <nav>
      <h1>{{song.name}}</h1>
    </nav>
    <sub>
      <span>专辑:</span>
      <router-link :to="{name: 'name'}">{{song.al.name}}</router-link>
      <span>歌手:</span>
      <router-link :to="{name: 'name'}">{{song.ar[0].name}}</router-link>
    </sub>
    <article @scroll="debounceScrollyHandler">
      <pre ref="lyrics-box" :style="{marginTop:marginTop+'px'}">{{processedLyrics(lyrics)}}</pre>
    </article>
  </section>
</template>

<script>
import { parseLyricsTime, debounce } from "@/utils";
import { mapState } from "vuex";
export default {
  name: "Lyrics-Carousel", // 歌词轮播组件
  props: {
    lyrics: {
      type: String,
      required: true
    },
    currentTime: {
      type: Number
    },
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      marginTop: 120, //歌词卷曲幅度(30px为一个单位)
      timeList: [], // 记录所有的跳跃的点
      lyricsBox: null
    };
  },
  mounted() {
    console.log(debounce);
    // this.lyricsBox = this.$refs["lyrics-box"];
    // // 监听这个dom的scroll事件
    // this.lyricsBox.addEventListener(
    //   "scroll",
    //   () => {
    //     console.log(this.$refs.viewBox.scrollTop);
    //   },
    //   false
    // );
    // console.log();
  },
  computed: {
    ...mapState(["Music"])
  },
  methods: {
    debounceScrollyHandler: debounce(function() {
      document.querySelector(".lyrics-carousel > article").scrollTop = 0;
    }, 3000),
    // scrollHandler(e) {
    //   console.log(e);
    // },

    processedLyrics(lyrics) {
      // 返回替换[0.0.0.000]时间标记的歌词
      return lyrics.replace(/\[.*\]/g, "");
    }
  },
  beforeDestroy() {
    if (this.lyricsBox !== null) {
    }
  },
  watch: {
    "Music.id"(id) {
      this.marginTop = 120;
    },
    lyrics(newLyrics) {
      this.timeList = newLyrics.match(/\[(\d{2}:\d{2})\.\d{3}\]/g) || [];
    },
    currentTime(newCurrentTime) {
      // 将时间转为整数
      const processedCurrent = Number.parseInt(newCurrentTime);
      // 获取分和秒
      const { minutes, seconds } = parseLyricsTime(processedCurrent);
      // console.log(minutes, seconds);
      for (let item of this.timeList) {
        const currentMin = Number.parseInt(item.substr(1, 2));
        const currentSec = Number.parseInt(item.substr(4, 2));
        // console.log(minutes, currentMin, currentSec, seconds);
        if (minutes === currentMin && currentSec === seconds) {
          this.marginTop -= 30;
        }
      }
      // const _timeFlag = this.lyrics.find(`[${minutes}:${seconds}.]`);
    }
  }
};
</script>

<style lang="scss" scoped>
.lyrics-carousel {
  // z-index: 10;
  @media (max-width: 762px) {
    text-align: center;
  }
  > nav > h1 {
    font-size: 20px;
    font-weight: normal;
  }
  > sub {
    a {
      margin: 0 6px;
    }
  }
  article {
    // text-align: center;
    height: 300px;
    overflow-y: auto;
    margin-top: 20px;
    pre {
      transition: all 1s;
      line-height: 30px;
      font-size: 15px;
      font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    }
  }
}
</style>