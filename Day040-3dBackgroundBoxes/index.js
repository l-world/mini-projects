const btn = document.getElementById('btn'),
      boxContainer = document.querySelector('.boxes');
      
btn.addEventListener('click', () => boxContainer.classList.toggle('big'))

function createBoxes(){
    for(let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const div = document.createElement('div');
            div.classList.add('box');
            div.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
            boxContainer.appendChild(div);
        }
    }
}

createBoxes();

