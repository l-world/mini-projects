const showBtn = document.querySelector('.show-btn'),
      container = document.querySelector('.container');

const colors = ['info','success','error'];
const contents = ['Message One', 'Message Two', 'Message Three','Message Four', 'Message Five']

showBtn.addEventListener('click', e => {
    let div = document.createElement('div');
    div.classList.add('message');
    div.classList.add( randomColor() )
    div.innerText = randomContent()
    container.appendChild(div);
    setTimeout( () => {
        div.remove();
    }, 3000)
})

function randomColor(){
    return colors[ Math.floor(Math.random() * colors.length)]
}

function randomContent(){
    return contents[ Math.floor( Math.random() * contents.length)]
}







