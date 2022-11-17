const textEl = document.querySelector('.text'),
      speedInput = document.getElementById('speed');

const text = "we love programming";
let index = 1;
let speed = 300 / speedInput.value;

writeText();

function writeText(){
    textEl.innerText = text.slice(0,index);
    index ++;
    if(index > text.length){
        index = 1;
    }
    setTimeout(writeText,speed);
}

speedInput.addEventListener('input', e => {
    speed = 300 / e.target.value
})