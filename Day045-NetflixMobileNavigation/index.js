const barBtn = document.querySelector('.bar-btn'),
      closeBtn = document.querySelector('.close'),
      navContainer = document.querySelector('.nav-container');

barBtn.addEventListener('click', e => {
    navContainer.classList.remove('hide');
    navContainer.classList.add('show');
})  

closeBtn.addEventListener('click', e => {
    navContainer.classList.add('hide');
})