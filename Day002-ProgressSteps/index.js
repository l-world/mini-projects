const prevBtn = document.querySelector(".prev"),
      nextBtn = document.querySelector(".next");
let  curCircle = document.querySelector("li:first-of-type");

prevBtn.addEventListener("click", e => {
    prev();
});

nextBtn.addEventListener("click", e => {
    next(); 
});

/**
 * @description: 上一步
 * @param {*} ele
 * @return {*}
 */
function prev(){
    if(curCircle && curCircle.classList.contains('active') && curCircle.innerHTML !== '1'){
        curCircle.classList.remove('active');
        curCircle.previousElementSibling.classList.remove('active');
    }

    if(curCircle.previousElementSibling){
        curCircle =  curCircle.previousElementSibling.previousElementSibling;
    }else{
        return;
    }
    if(parseInt(curCircle.innerHTML) == 1){
        prevBtn.classList.remove('btn_active');
        nextBtn.classList.add('btn_active');
    }
}

/**
 * @description: 下一步
 * @param {*} ele
 * @return {*}
 */
function next(){
    if(curCircle.nextElementSibling && !curCircle.nextElementSibling.classList.contains('active')){
        curCircle.nextElementSibling.classList.add('active');
        curCircle.nextElementSibling.nextElementSibling.classList.add('active');
    }
    if(curCircle.nextElementSibling){
        curCircle =  curCircle.nextElementSibling.nextElementSibling;
    }else{
        return;
    }

    if(parseInt(curCircle.innerHTML) > 1){
        prevBtn.classList.add('btn_active');
        nextBtn.classList.remove('btn_active');
    }    
}

