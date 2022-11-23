const start_btn = document.getElementById('start_btn'),
      screens = document.querySelectorAll('.screen'),
      choose_insect_btns = document.querySelectorAll('.choose_insect_btn'),
      game_container = document.getElementById('game_container'),
      timeEl = document.getElementById('time'),
      scoreEl = document.getElementById('score'),
      message = document.getElementById('message');

let seconds = 0,
    score = 0,
    selected_insect = {};


start_btn.addEventListener('click',  () => screens[0].classList.add('up'));

choose_insect_btns.forEach( btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = {
            src,
            alt
        }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame();
    })
})

function createInsect(){
    const div = document.createElement('div');
    div.classList.add('insect');
    const {x,y} = getRandomLocation();
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.innerHTML = `
        <img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />
    `
    div.addEventListener('click', catchInsect);
    game_container.appendChild(div);
}

function startGame(){
    setInterval(increaseTime,1000)
}

function increaseTime(){
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerText = `${m}:${s}`;
    seconds ++;
}

function getRandomLocation(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return {x,y}
}

function catchInsect(){
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => {
        this.remove();
    }, 2000);
    addInsect();
}

function increaseScore(){
    score++;
    if(score > 19){
        message.classList.add('visible');
    }
    scoreEl.innerText = score;
}

function addInsect(){
    setTimeout( createInsect(),1000);
    setTimeout( createInsect(),1500);
}