const video = document.getElementById('video') as HTMLVideoElement,
      play = document.getElementById('play') as HTMLButtonElement,
      stopBtn = document.getElementById('stop') as HTMLButtonElement,
      progress = document.getElementById('progress') as HTMLInputElement,
      timestamp = document.querySelector('.timestamp') as HTMLSpanElement;

video?.addEventListener('click',switchVideoStatus);
video.addEventListener('pause',switchBtnIcon);
video.addEventListener('play',switchBtnIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', switchVideoStatus);
stopBtn.addEventListener('click', stopVideo);

progress.addEventListener('change', setProgress);


function switchVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function switchBtnIcon(){
    if(video.paused){
        play.innerHTML = `<i class="fa fa-play fa-2x"></i>`
    }else{
        play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`
    }
}

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

function updateProgress(){
    progress.value = String((video.currentTime / video.duration) * 100);

    // get minite 
    let minites:number|string = Math.floor(video.currentTime / 60);
    if(minites < 10){
        minites = "0" + minites;
    }

    // get second
    let seconds:number|string = Math.floor( video.currentTime % 60 );
    if(seconds < 10){
        seconds = "0" + seconds
    }

    timestamp.innerHTML = `${minites}:${seconds}`
}

function setProgress(){
    video.currentTime = (+progress.value * video.duration) / 100;
}

