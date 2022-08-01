/**************************************************
 * 希声_music 歌词解析以及滚动模块 文件V1.0
 * 编写：翼遥bingo(https://blog.csdn.net/hannah2233)
 * 时间：2022-1-27
 *************************************************/

var lyricArea = $('#lyric'); // 歌词显示容器

// 在歌词区显示提示语（如歌词加载中、无歌词等）
function lyricTip(str) {
    lyricArea.html("<li class='lyric-tip'>" + str + "</li>")
}
// 歌曲加载完后的回调函数
// 参数：歌词源文件
function lyricCallback(str, id) {
    xsN.lyric = parseLyric(str); // 解析获取到的歌词
    console.log(xsN.lyric);

    lyricArea.html(''); // 清空歌词区域的内容
    lyricArea.scrollTop(0); // 滚动到顶部

    xsN.lastLyric = -1;

    // 显示全部歌词
    var i = 0;
    for (var k in xsN.lyric) {
        var txt = xsN.lyric[k];
        if (!txt) txt = "&nbsp;";
        var li = $("<li data-no='" + i + "' class='lrc-item'>" + txt + "</li>");
        lyricArea.append(li);
        i++;
    }
}

function parseLyric(lrc) {
    if (lrc === '') return '';
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, '');
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}