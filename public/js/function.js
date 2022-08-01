/**************************************************
 * 希声_music 封装函数和交互功能 文件V1.0
 * 编写：翼遥bingo(https://blog.csdn.net/hannah2233)
 * 时间：2022-1-27
 *************************************************/
// 存储全局变量
var xsN = [];

$(function() {
    /* 
    header区域的函数调用
     */

    // 导航栏样式点击切换
    $("ul.clear-fix>li").click(function() {
        // $(this).addClass("active");
        // $(this).siblings("li").removeClass("active");
        switch ($(this).data("action")) {
            case "home":
                dataBox("home");
                break;
            case "my":
                dataBox("my");
                break;
            case "playlistItem":
                dataBox("playlistItem");
                break;
        }
    })
    $("#user-login").on("click", "#loginClick", function() {
        alertLogin();
    });
    userLogin();
    $("#user-login").on("mouseover", "#user-name", function() {
        $('#loginout').css("display", "block");
    })
    $("#loginout").mouseover(function() {
        $('#loginout').css("display", "block");
    })
    $("#user-login").mouseleave(function() {
        $('#loginout').css("display", "none");
    })
    $("#loginout").mouseleave(function() {
        $('#loginout').css("display", "none");
    })

    // 退出登录
    $("#loginout>.loginOut").click(function() {
        _ajaxLoginOut();
        playerSavedata('uid', '');
        playerSavedata('ulist', '');
        layer.msg('已退出');
        clearUserlist();
    })

    /* 
    热门推荐 区域的函数调用
     */
    addListbar("loading"); // 列表加载中
    // 热门推荐子标题的渲染
    _ajaxHotSub();
    // 热门推荐 标题列表的渲染
    var playlistParams = '全部';
    _ajaxPlayList(playlistParams);
    $('.h-title').on('click', '.h-subt', function() {
        $(this).addClass('active1');
        $(this).siblings('span').removeClass('active1');
        // console.log(this);
        choosePlayListType(this);
    })

    // 点击歌单跳转至对应列表
    $("#playlist").on("click", ".listItem", function() {
        dataBox("playlistItem");
        // 获取歌单详情
        // console.log($(this).children('span.songId').text());
        // choosePlaySubList(this);
        var ListId = $(this).children('span.songId').text();
        _ajaxListItem(ListId);
        _ajaxListDetail(ListId);
        _ajaxComment(ListId);
        // 获取歌单的所有歌曲
        addListbar('loading');

        // 音乐获取URL

    })


    // 歌单列表区域
    $(".SongItem>table").on("mouseenter", "tr", function() {
        xsN.ii = $(this).children('td:first-child').text();
        $(this).children('td:first-child').html('<svg t="1643891592840" class="playIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2300" width="30" height="30"><path d="M533.333333 896C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333z m149.333334-320L469.333333 682.666667V384l213.333334 149.333333z m-68.266667 0L512 460.8v145.066667l102.4-72.533334z" fill="#444444" p-id="2301"></path></svg>')
    })
    $(".SongItem>table").on("mouseleave", "tr", function() {
        $(this).children('td:first-child').html(xsN.ii);
    })


    /* 
        底部播放器的函数调用
         */
    // initProgress(); // 初始化音量条，进度条（进度条初始化要在Audio之前）

    // 歌曲详情按钮的处理
    // $("#music").click(function() {

    // })

    $(".SongItem>table").on("click", "tr", function() {
        xsN.SongId = $(this).children("td:nth-child(5)").text();
        _ajaxSongUrl($(this).children("td:nth-child(5)").text());
        // setTimeout
    })
    $(".contain>span").click(function() {
        _ajaxLyric(xsN.SongId, lyricCallback);
        $('.lyric').css("display", "block");
    })

    $(".contain").mouseleave(function() {
        $('.lyric').css("display", "none");
    })






})

// 选择要显示哪个数据区
function dataBox(choose) {
    $('li.active').removeClass('active');
    switch (choose) {
        case "home":
            $('#my').fadeOut();
            $('#playlistItem').fadeOut();
            $('.container').fadeIn();
            $("li[data-action='home']").addClass('active');
            break;
        case "my":
            $('.container').fadeOut();
            $('#playlistItem').fadeOut();
            $("li[data-action='my']").addClass('active');
            if (playerReaddata('uid') === '') {
                alertLogin();
                // console.log("失败");
            } else {
                $('#my').fadeIn();
                // console.log(playerReaddata('uid'));
            }
            break;
        case "playlistItem":
            $("li[data-action='playlistItem']").addClass('active');
            $('.container').fadeOut();
            $('#my').fadeOut();
            $('#playlistItem').fadeIn();
            break;
    }
}

// 点击登录区域
function userLogin() {
    var loginHtml;
    if (playerReaddata('uid')) {
        loginHtml = `<img src="${xsN.avatar}" alt="" id="user-awatar">
        <span id="user-name">${xsN.uname}</span>`;
    } else {
        loginHtml = `<a id="loginClick" href="javascript:void(0);">登录</a>`;
    }
    $('#user-login').html(loginHtml);

}

// 登录弹窗区域
function alertLogin() {
    layer.open({
        type: 1,
        title: "用户输入",
        area: "300px",
        skin: 'layui-layer-rim',
        shadow: 0.5,
        btn: ['提交', '取消', "帮助"],
        content: $("#login-page"),
        yes: function(index, layero) {
            _ajaxUser({
                phone: $("#loginInput1").val(),
                password: $("#loginInput2").val()
            })
            layer.close(index);
        },
        btn3: function(index, layero) {
            layer.open({
                title: '自行查找',
                shade: 0.6,
                anim: 4,
                content: '登录网易云音乐账号即可'
            })
        }
    })
}
// 读取本地存储信息
// 参数 ： 键值
// 返回 :  数据
function playerReaddata(key) {
    if (!window.localStorage) return '';
    key = "byntt_" + key; // 添加前缀，防止串用
    xsN.uname = JSON.parse(window.localStorage ? localStorage.getItem('byntt_uname') : Cookie.read('byntt_uname'));
    xsN.avatar = JSON.parse(window.localStorage ? localStorage.getItem('byntt_avatar') : Cookie.read('byntt_avatar'));
    return JSON.parse(window.localStorage ? localStorage.getItem(key) : Cookie.read(key));
}

// 本地浏览器存储登录用户
function playerSavedata(key, data) {
    key = 'byntt_' + key; // 添加前缀，防止串用
    data = JSON.stringify(data); // 对象格式转为JSON格式
    if (window.localStorage) {
        // 在本地存储一个键值对
        localStorage.setItem(key, data);
    } else {
        Cookie.write(key, data);
    }

}

/*************  加载列表中的提示条 **********************/
// 参数：类型（more、nomore、loading、nodata、clear）
function addListbar(types) {
    var html
    switch (types) {
        case "more": // 还可以加载更多
            html = '<div class="list-item text-center list-loadmore list-clickable" title="点击加载更多数据" id="list-foot">点击加载更多...</div>';
            break;

        case "nomore": // 数据加载完了
            html = '<div class="list-item text-center" id="list-foot">全都加载完成</div>';
            break;

        case "loading": // 加载中
            html = '<div class="list-item text-center" id="list-foot">播放列表加载中...</div>';
            break;

        case "nodata": // 列表中没有内容
            html = '<div class="list-item text-center" id="list-foot">可能是个假列表，什么也没有</div>';
            break;

        case "clear": // 清空列表
            html = '<div class="list-item text-center list-clickable" id="list-foot" onclick="clearDislist();">清空列表</div>';
            break;
    }
    $(".LeftTop").append(html);
    $(".SongItem").append(html);
    setTimeout(function() {
        $("div").remove('#list-foot');
    }, 1000);

}
/* 
    热门推荐 区域的函数调用
     */
function choosePlayListType(e) {
    playlistParams = $(e).text()
    console.log(playlistParams);
    _ajaxPlayList(playlistParams == '为您推荐' ? '全部' : playlistParams);
}

// 清除用户信息
function clearUserlist() {
    if (!xsN.uid) return false;

    // 查找用户歌单起点
    // for (var i = 1; i < musicList.length; i++) {
    //     if (musicList[i].creatorID !== undefined && musicList[i].creatorID == rem.uid) break; // 找到了就退出
    // }

    // 删除记忆数组
    // musicList.splice(i, musicList.length - i); // 先删除相同的
    // musicList.length = i;

    // 刷新列表显示
    // clearSheet();
    initList();
    window.location.reload();
}

// // 清空歌单显示
// function clearSheet() {
//     xsN.SongList.html('');
// }

// 初始化播放列表
function initList() {
    // 登陆过，那就读取出用户的歌单，并追加到系统歌单的后面
    if (playerReaddata('uid')) {
        rem.uid = playerReaddata('uid');
        rem.uname = playerReaddata('uname');
        // musicList.push(playerReaddata('ulist'));
        var tmp_ulist = playerReaddata('ulist'); // 读取本地记录的用户歌单

        if (tmp_ulist) musicList.push.apply(musicList, tmp_ulist); // 追加到系统歌单的后面
    }

}