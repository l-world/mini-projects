const leftBtn = document.querySelector('.left'),
      rightBtn = document.querySelector('.right'),
      body = document.body,
      slides = document.querySelectorAll('.slide');

let activeSlide = 0;
setBodyBg();
rightBtn.addEventListener('click', e => {
    activeSlide ++;
    if(activeSlide > slides.length - 1){
        activeSlide = 0;
    }
    setBodyBg();
    setActiveSlide();
})

leftBtn.addEventListener('click', e => {
    activeSlide --;
    if(activeSlide < 0){
        activeSlide = slides.length - 1;
    }
    setBodyBg();
    setActiveSlide();
})

function setBodyBg(){
    body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide(){
    slides.forEach( slide => {
        slide.classList.remove('active');
    })
    slides[activeSlide].classList.add('active');
}
