const sendBtn = document.querySelector('.send_btn')
const appraiseEl = document.querySelector('.appraise');
const resultEl = document.querySelector('.result');
const options = document.querySelectorAll('.option');
const feedback_result_el = document.querySelector('.feedback_result');

let result = "Satisfied"
sendBtn.addEventListener('click', e => {
    feedback_result_el.innerText =`Feedback:${result}`;
    appraiseEl.classList.add('hide');
    resultEl.classList.remove('hide');
});

options.forEach( option => {
    option.addEventListener('click', e => {
        e.preventDefault();
        cancelActive()
        option.classList.add('active');
        result = option.querySelector('label').innerText
    });    
});

function cancelActive(){
    options.forEach( option => option.classList.remove('active') );
}