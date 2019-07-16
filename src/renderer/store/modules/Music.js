const state = {
  id: 415086030,
  name: "",
  singer: '',
  coverImgUrl: '',
  musicUrl: '',
  percent: 0,
  currentTime: 0,
  totalTime: 0,
  playFlag: 1,   // 播放指示器 0 暂停  1播放
  musicList: [],  // 当前播放列表
  playListVisible: false,   // 播放列表显示
}

const mutations = {
  UPDATE_MUSIC_COVER(state, url) {
    state.coverImgUrl = url
  },
  UPDATE_MUSIC_NAME(state, name) {
    state.name = name
  },
  UPDATE_MUSIC_SINGER(state, singer) {
    state.singer = singer
  },
  UPDATE_MUSIC_PERCENT(state, percent) {
    state.percent = percent
  },
  START_MUSIC(state) {
    state.playFlag = 1
  },
  PAUSE_MUSIC(state) {
    state.playFlag = 0
  },
  UPDATE_SONG_LIST(state, list) {
    state.musicList = list
  },
  PLAY_ANOTHER(state, id) {
    state.id = id
  },
  PLAY_PRE(state) {
    for (let i = 0; i < state.musicList.length; i++) {
      if (state.musicList[i].id === state.id && i > 1) {
        state.id = state.musicList[i - 1].id
        // console.log(state.musicList[i - 1])
      }
    }
  },
  PLAY_NEXT(state) {
    for (let i = 0; i < state.musicList.length - 1; i++) {
      if (state.musicList[i].id === state.id) {
        state.id = state.musicList[i + 1].id
        return;
        // console.log(state.musicList[i + 1])

      }
    }
  },
  CLOSE_PLAY_LIST(state) {
    state.playListVisible = false
  },
  OPEN_PLAY_LIST(state) {
    state.playListVisible = true
  }
}


export default {
  state,
  mutations,
}
