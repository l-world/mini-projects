const wordEl = document.getElementById('word'),
      wrongLettersEl = document.getElementById('wrong-letters'),
      playAgainBtn = document.getElementById('play-button'),
      popup = document.getElementById('popup-container'),
      notification = document.getElementById('notification-container'),
      finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'echo','interface', 'wizard','love'];

let selectWord = randomWord()
let playable = true;

const correctLetters = [];
const wrongLetters = [];

function randomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord(){
    wordEl.innerHTML = `
    ${selectWord.split('').map( letter => {
        return `<span class='letter'>${correctLetters.includes(letter) ? letter : ''}</span>`
    }).join('')}
    `
    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if(innerWord === selectWord){
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex';
        playable = false; 
    }
}

function updateWrongLetters(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map( letter => `<span>${letter}</span>`)}
    `
    figureParts.forEach( (part,index) =>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = "block";
        }else{
            part.style.display = "none"
        }
    })

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Unfortunatelay you lost.'
        popup.style.display = 'flex';
        playable = false
    }
}

function showNotification(){
    notification.classList.add('show');
    setTimeout( () => {
        notification.classList.remove('show')
    },2000)
}

window.addEventListener('keydown', e => {
    if(playable){
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toLowerCase();
            if(selectWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
                    displayWord();
                }else{
                    showNotification()
                }
            }else{
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter);
                    updateWrongLetters()
                }else{
                    showNotification();
                }
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    playable = false;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectWord = randomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none'
})

displayWord();