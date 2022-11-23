const figureParts = document.querySelectorAll('.figure-part'),
    wrongLettersEl = document.querySelector('.wrong-letters') as HTMLDivElement,
    lettersContainer = document.querySelector('.letters-container') as HTMLDivElement,
    messageEl = document.querySelector('.message') as HTMLHeadingElement,
    playAgainBtn = document.querySelector('.play-again-btn'),
    tipEl = document.querySelector('.tip'),
    playAgainContainer = document.querySelector('.play-again-container') as HTMLDivElement;

const words = ['application', 'friendly', 'world', 'code', 'interface'];

let correctLetters: string[] = [], //记录正确字母
    wrongLetters: string[] = [],  // 记录错误字母
    currentWord: string = getRandomWord(), // 当前得到的随机单词
    playable: boolean = true; //是否可以玩

/* 
    显示输入单词的横线
*/

displayLettrs();

function displayLettrs() {
    lettersContainer.innerHTML = `
        ${currentWord.split('').map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>`).join('')
        }
    `
    const innerWord = lettersContainer.innerText.replace(/\n/g, '');
    if (innerWord === currentWord) {
        messageEl.innerHTML = 'Congratulations! You won! 😃';
        playAgainContainer.style.visibility = 'visible';
        playable = false;
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            (part as HTMLSpanElement).style.display = 'block';
        } else {
            (part as HTMLSpanElement).style.display = 'none';
        }
    })

    // Check if lost
    if (wrongLetters.length == figureParts.length) {
        messageEl.innerHTML = 'Unfortunately you lost. 😕';
        playAgainContainer.style.visibility = 'visible';
        playable = false;
    }
}

function notification() {
    console.log('notification');
    tipEl?.classList.add('show');
    setTimeout(() => {
        tipEl?.classList.remove('show')
    }, 2000);
}

function getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)]
}

window.addEventListener('keydown', e => {
    if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (currentWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayLettrs();
				} else {
					notification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					notification();
				}
			}
		}
	}
})

playAgainBtn?.addEventListener('click', () =>{
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    currentWord = getRandomWord();
    displayLettrs();
    updateWrongLettersEl();
    playAgainContainer.style.visibility = 'hidden';
})


