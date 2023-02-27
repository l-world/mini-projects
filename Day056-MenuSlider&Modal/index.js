const signUpBtn = document.querySelector('.sign_up_btn'),
      closeBtn = document.querySelector('.close'),
      modal = document.querySelector('.modal'),
      navBtn = document.querySelector('.navbar_btn');

signUpBtn.addEventListener('click', e =>{
    modal.classList.add('show');
})

modal.addEventListener('click', e =>{
    e.target.classList.remove('show')
});

closeBtn.addEventListener('click', e =>{
    modal.classList.remove('show');
})

navBtn.addEventListener('click', e =>{
    document.body.classList.toggle('show-nav')
})