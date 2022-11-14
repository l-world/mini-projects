const textarea = document.getElementById('textarea'),
      tagsEl = document.getElementById('choices');

textarea.focus();

textarea.addEventListener('keyup', e => {
    createTags(e.target.value);

    if(e.key === 'Enter'){
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }

    if(e.key === 'Control'){
        e.preventDefault();
    }
})

function createTags(input){
    const tags = input.split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => tag.trim())

    tagsEl.innerHTML = '';
    
    tags.forEach( value => {
        const span = document.createElement('span');
        span.classList.add('tag')
        span.innerText = value;
        tagsEl.appendChild(span);
    });
}

function randomSelect(){
    const times = 30;
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        highlight(randomTag);
        setTimeout(() => {
            unHighlight(randomTag)
        }, 100);
    }, 100)

    setTimeout( () => {
        clearInterval(interval);
        setTimeout(() => {
            const randomTag = pickRandomTag()
            highlightTag(randomTag)
        }, 100)
    }, times * 100)
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlight(tag){
    tag.classList.add('highlight');
}

function unHighlight(tag){
    tag.classList.remove('highlight');
}