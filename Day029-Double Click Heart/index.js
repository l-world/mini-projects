const clickArea = document.querySelector('.click-area'),
      clickCountEl = document.querySelector('.click-count');


let clickTime = 0,
    timesClicked = 0;

clickArea.addEventListener('click', e => {
    if(clickTime === 0){
        clickTime = new Date().getTime();
    }else{
        if((new Date().getTime() - clickTime) < 800) {
            createHeart(e)
            clickTime = 0
        } else {
            clickTime = new Date().getTime();
            timesClicked = 0;
        }
    }
})

function createHeart(e){

    const div = document.createElement('div');
    div.classList.add('heart');

    const x = e.clientX;
    const y = e.clientY;

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    div.style.top = `${yInside}px`
    div.style.left = `${xInside}px`

    clickArea.appendChild(div); 

    clickCountEl.innerText = ++ timesClicked;

    setTimeout( () =>{
        div.remove();
    },800)
}