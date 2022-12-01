const video = document.getElementById('video'),
      play = document.getElementById('play'),
      stopBtn = document.getElementById('stop'),
      progress = document.getElementById('progress'),
      timestamp = document.getElementById('timestamp');

video.addEventListener('click',toggleVideoStatus)
video.addEventListener('pause',togglePlayBtnIcon)
video.addEventListener('play',togglePlayBtnIcon)
video.addEventListener('timeupdate',updateProgress)

play.addEventListener('click',toggleVideoStatus)
stopBtn.addEventListener('click', stopVideo)
progress.addEventListener('change',setVideoProgress)



// play & pause video
function toggleVideoStatus(){
    if(video.paused){ //if video is paused,play it
        video.play();
    }else{  // if video is playing,pause it
        video.pause()
    }
}

//play & pause btn icon update
function togglePlayBtnIcon(){
    if(video.paused){ // if video is paused, button icon is play
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }else{  // if video is playing, button icon is pause
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// update range and timestamp
function updateProgress (){
    /* 
        duration 属性返回当前视频的长度，以秒计
        currentTime 属性设置或返回视频播放的当前位置（以秒计）
    */
    progress.value = (video.currentTime / video.duration) * 100;

    // get minites
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = "0" + mins
    }

    // get seconds
    let seconds = Math.floor(video.currentTime % 60)
    if(seconds < 10){
        seconds = "0" + seconds
    }

    timestamp.innerHTML = `${mins}:${seconds}`
}

function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}