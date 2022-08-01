/**************************************************
 * 希声_music 播放器主要功能 文件V1.0
 * 编写：翼遥bingo(https://blog.csdn.net/hannah2233)
 * 时间：2022-1-27
 *************************************************/
// 初始化 Audio
// function initAudio() {
//     xsN.audio = $('<audio></audio>').appendTo('body');

//     // 应用初始音量
//     xsN.audio[0].volume = volume_bar.percent;
//     // 绑定歌曲进度变化事件
//     xsN.audio[0].addEventListener('timeupdate', updateProgress); // 更新进度
//     xsN.audio[0].addEventListener('play', audioPlay); // 开始播放了
//     xsN.audio[0].addEventListener('pause', audioPause); // 暂停
//     $(xsN.audio[0]).on('ended', autoNextMusic); // 播放结束
//     xsN.audio[0].addEventListener('error', audioErr); // 播放器错误处理
// }

// 进度条的处理
var initProgress = function() {
    // 初始化播放进度条
    music_bar = new xsNpgb("#music-progress", 0, mBcallback);
}

// xsN(希声牛tt)进度条插件
// 进度条框 id， 初始量， 回调函数
xsNpgb = function(bar, percent, callback) {
    this.bar = bar;
    this.percent = percent;
    this.callback = callback;
    this.locked = false;
    this.init();
}
xsNpgb.prototype = {
    // 进度条初始化
    init: function() {
        var xs = this,
            mdown = false;
        // 加载进度条html元素
        $(xs.bar).html('<div class="xsNpgb-bar"></div><div class="xsNpgb-cur"></div><div class="xsNpgb-dot"></div>');
        // 获取偏移量
        mk.minLength = $(mk.bar).offset().left;
        mk.maxLength = $(mk.bar).width() + mk.minLength;
    }
}