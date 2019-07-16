<template>
  <section class="player" @click="ClosePlayList">
    <div
      class="player__wrapper"
      :style="{ backgroundImage: 'url('+song.al.picUrl+')',
              backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}"
    >
      <player-core :lyrics="lyric" :url="url" :song="song"></player-core>
      <comment-list :commentList="commentDataList"></comment-list>
    </div>
  </section>
</template>

<script>
import {
  getLyric,
  getSongUrl,
  getCommentList,
  getSongDetail,
  searchSongs
} from "@/api";
import PlayerCore from "./components/player-core";
import CommentList from "./components/comment-list";
import { parseLyricsTime } from "@/utils";
import { mapState } from "vuex";
export default {
  name: "Player",
  components: {
    PlayerCore,
    CommentList
  },
  computed: {
    ...mapState(["Music"])
  },
  data() {
    return {
      lyric: "",
      url: "",
      song: {
        name: "曾经的你",
        id: 167975,
        ar: [
          {
            id: 5770,
            name: "许巍",
            tns: [],
            alias: []
          }
        ],
        al: {
          name: "每一刻都是崭新的",
          picUrl:
            "https://p2.music.126.net/GoiTB6oG3vQWntnCjKRw0g==/109951163092691594.jpg"
        }
      },
      commentDataList: []
    };
  },
  created() {
    this.getSongInfo(this.Music.id);
    this.searchSongList("民谣");
    this.getCommenList(this.Music.id);
  },
  methods: {
    ClosePlayList(){
      this.$store.commit('CLOSE_PLAY_LIST')
    },  
    async getCommenList(id) {
      let { hotComments } = await getCommentList(id);
      this.commentDataList = hotComments;
    },
    // 根据id获取歌曲详情
    async getSongInfo(id) {
      let lyric = getLyric(id);
      let url = getSongUrl(id);
      let song = getSongDetail(id);
      Promise.all([lyric, url, song]).then(([res_lyric, res_url, res_song]) => {
        const lyric_data = res_lyric.lrc.lyric;
        const url_data = res_url.data[0].url;
        const song_data = res_song.songs[0];
        this.lyric = lyric_data;
        this.url = url_data;
        this.song = song_data;

        //   同步歌曲信息到store中
        this.UPDATE_MUSIC_COVER(this.song.al.picUrl);
        this.UPDATE_MUSIC_NAME(this.song.name);
        this.UPDATE_MUSIC_SINGER(this.song.ar[0].name);
      });
    },
    async searchSongList(keywords) {
      const { result } = await searchSongs(keywords);
      const songList = result["songs"].map(i => {
        let { minutes, seconds } = parseLyricsTime(i.duration / 1000);
        seconds = Number.parseInt(seconds);
        if (seconds < 10) seconds = "0" + seconds;
        return {
          id: i.id,
          singerId: i.artists[0].id,
          albumId: i.album.id,
          name: i.name,
          singer: i.artists[0].name,
          alubm: i.album.name,
          duration: `${minutes}:${seconds}`
        };
      });
      this.UPDATE_SONG_LIST(songList);
    },
    UPDATE_SONG_LIST(list) {
      this.$store.commit("UPDATE_SONG_LIST", list);
    },
    UPDATE_MUSIC_COVER(url) {
      this.$store.commit("UPDATE_MUSIC_COVER", url);
    },
    UPDATE_MUSIC_NAME(name) {
      this.$store.commit("UPDATE_MUSIC_NAME", name);
    },
    UPDATE_MUSIC_SINGER(name) {
      this.$store.commit("UPDATE_MUSIC_SINGER", name);
    }
  },
  watch: {
    "Music.id"(id) {
      this.getSongInfo(this.Music.id);
      this.getCommenList(this.Music.id);
      this.$store.commit("START_MUSIC");
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  flex-direction: column;
  &__wrapper {
    position: relative;
    overflow: hidden;
    background-attachment: fixed;
    background-position: center;
    // background-size: 120%;

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(20px);
      // transform: scale(1.2);
      z-index: 1;
      opacity: 0.6;
    }
    // z-index: -1;
    .player-core {
      background-color: #fff;
      padding: 30px;
      min-height: 500px;
    }
  }
}
</style>