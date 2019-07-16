import request from '../utils/request'


// 根据歌曲id获取歌词
export function getLyric(id) {
    return request({
        url: "lyric",
        method: 'get',
        params: { id }
    })
}

// 根据id获取歌曲url
export function getSongUrl(id) {
    return request({
        url: "song/url",
        params: { id },
        method: 'get'
    })
}

export function getSongDetail(ids) {
    return request({
        url: 'song/detail',
        method: 'get',
        params: { ids }
    })
}

export function searchSongs(keywords) {
    return request({
        url: 'search',
        method: 'get',
        params: { keywords }

    })
}


export function getCommentList(id) {
    return request({
        url: 'comment/music',
        method: 'get',
        params: { id }

    })
}
