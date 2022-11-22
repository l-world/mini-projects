const container = document.querySelector('.container');
const unsplashURL = 'https://source.unsplash.com/random/';
const rows = 10;

generatorImg();

function generatorImg(){
    for(let i = 0; i < rows * 3; i++){
        const img = document.createElement('img');
        img.src = `${unsplashURL}${getRandomSize()}`
        container.appendChild(img);
    }
}

function getRandomSize(){
    console.log(getRandomNum())
    return `${getRandomNum()}x${getRandomNum()}`
}

function getRandomNum(){
    //300 - 309
    return Math.floor( Math.random() * 10) + 300;
}