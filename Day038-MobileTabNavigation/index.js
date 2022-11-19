const contents = document.querySelectorAll('.content');
const lis = document.querySelectorAll('li');

lis.forEach( (li,idx) => {
    li.addEventListener('click', () => {
        hideAllContet();
        hideAllActice();
        
        li.classList.add('active');
        contents[idx].classList.add('show');
    })
})

function hideAllContet() {
    contents.forEach( content => {
        content.classList.remove('show')
    })
}

function hideAllActice() {
    lis.forEach( li => {
        li.classList.remove('active')
    })
}