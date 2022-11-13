const chunks = document.querySelectorAll('.chunk');

window.addEventListener('scroll', scrolling);

scrolling();

function scrolling() {
    const triggerBottom = window.innerHeight * (4/5);
    chunks.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if(triggerBottom > boxTop) { //向下滚
            box.classList.add('show');
        }else{//向上滚
            box.classList.remove('show')
        }
    })
}