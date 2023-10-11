const accordions = document.querySelectorAll('.accordion');

const openAccordion = (accordion) => {
    const content = accordion.querySelector('.accordion_content');
    accordion.classList.add('accordion_active');
    content.style.maxHeight = content.scrollHeight + 'px';
}

const closeAccordion = (accordion) => {
    const content = accordion.querySelector('.accordion_content');
    accordion.classList.remove('accordion_active');
    content.style.maxHeight = null;
}

accordions.forEach( accordion => {
    const intro = accordion.querySelector('.accordion_intro');
    const content = accordion.querySelector('.accordion_content');

    intro.addEventListener('click', () => {
        if(content.style.maxHeight){
            closeAccordion(accordion)
        }else{
            accordions.forEach( accordion => closeAccordion(accordion));
            openAccordion(accordion);
        }
    })

})