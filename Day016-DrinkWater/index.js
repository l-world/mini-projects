const cupSmalls = document.querySelectorAll('.cup_small'),
      liter = document.getElementById('liters'),
      percentage = document.getElementById('percentage'),
      remained = document.getElementById('remained');

updateBigCup();
    
cupSmalls.forEach( (ele,index) => {
    ele.addEventListener('click',  () => highlightCup(index));
})

function highlightCup(index){
    if(cupSmalls[index].classList.contains('full') && !cupSmalls[index].nextElementSibling.classList.contains('full')){
        index --;
    }
    cupSmalls.forEach( (ele,idx) =>{
        if(idx <= index){
            ele.classList.add('full');
        }else{
            ele.classList.remove('full');
        }
    })
    updateBigCup()
}

function updateBigCup(){
    const fullSmallCups = document.querySelectorAll('.cup_small.full').length,
          totalSmallCups = cupSmalls.length;

    if(fullSmallCups  === 0){
        percentage.style.visibility = 'hidden';
        percentage.style.height = '0'
    }else{
        percentage.style.visibility = 'visible';
        percentage.style.height = `${fullSmallCups / totalSmallCups * 330}px`;
        percentage.innerText = `${fullSmallCups / totalSmallCups * 100}%`
    }

    if(fullSmallCups === totalSmallCups){
        remained.style.visibility = 'hidden';
        remained.style.height = '0'
    }else{
        remained.style.visibility = 'visible'
        liter.innerText = `${2 - (250 * fullSmallCups / 1000)}L`
    }
}