const generatorBtn = document.querySelector('.generator-btn'),
      copyBtn = document.querySelector('.copy-btn'),
      form = document.querySelector('.password-form'),
      passwordText = document.querySelector('.password-text'),

      passwordLengthEl = document.querySelector('.password-length'),
      uppercaseEl = document.querySelector('.uppercase'),
      lowercaseEl = document.querySelector('.lowercase'),
      numberEl = document.querySelector('.number'),
      symbolEl = document.querySelector('.symbol');

/* 生成密码 */
generatorBtn.addEventListener('click', e => {
    e.preventDefault();
    const length = +passwordLengthEl.value,
          isUppcase = uppercaseEl.checked,
          isLowercase = lowercaseEl.checked,
          isNumber = numberEl.checked,
          isSymbol = symbolEl.checked;
    
    passwordText.innerText = generatorPassWord(isUppcase,isLowercase,isNumber,isSymbol,length);
})

/* 复制密码 */
copyBtn.addEventListener('click', e => {
    e.preventDefault();
    const textarea = document.createElement('textarea');
    const password = passwordText.innerText;
    if(!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!')
})

const randomFunc  = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function generatorPassWord(upper,lower,number,symbol,length){
    let createPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower},{upper},{number},{symbol}].filter( item => {
        return Object.values(item)[0];
    })
    if(typesCount === 0){
        return ''
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach( type => {
            const funName = Object.keys(type)[0];
            createPassword += randomFunc[funName]()
        })
    }

    const finalPassword = createPassword.slice(0, length);
    
    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
