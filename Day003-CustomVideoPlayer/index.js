var video = document.getElementById('video'), play = document.getElementById('play'), stopBtn = document.getElementById('stop'), progress = document.getElementById('progress'), timestamp = document.querySelector('.timestamp');
video === null || video === void 0 ? void 0 : video.addEventListener('click', switchVideoStatus);
video.addEventListener('pause', switchBtnIcon);
video.addEventListener('play', switchBtnIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', switchVideoStatus);
stopBtn.addEventListener('click', stopVideo);
progress.addEventListener('change', setProgress);
function switchVideoStatus() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}
function switchBtnIcon() {
    if (video.paused) {
        play.innerHTML = "<i class=\"fa fa-play fa-2x\"></i>";
    }
    else {
        play.innerHTML = "<i class=\"fa fa-pause fa-2x\"></i>";
    }
}
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}
function updateProgress() {
    progress.value = String((video.currentTime / video.duration) * 100);
    // get minite 
    var minites = Math.floor(video.currentTime / 60);
    if (minites < 10) {
        minites = "0" + minites;
    }
    // get second
    var seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timestamp.innerHTML = "".concat(minites, ":").concat(seconds);
}
function setProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}
