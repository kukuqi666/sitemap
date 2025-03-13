// 控制音乐播放
var audio = document.querySelector('#background-music');
audio.volume = 0.5; // 设置音量

// 添加点击事件来切换音乐播放状态
document.querySelector('.container').addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
