const board = document.querySelector('.board');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
const BOXS = 500

createdBox();

function createdBox(){
    for (let i = 0; i < BOXS; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        div.addEventListener('mouseover',() => setColor(div));
        div.addEventListener('mouseout',() => removeColor(div));
        board.appendChild(div);
    }
}

function setColor(element){
    const color = randomColor();
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element){
    element.style.background = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #000'
}

function randomColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}
