const select = document.getElementById('movies'),
      seats = document.querySelectorAll('.row .seat:not(.occupied)'),
      count = document.querySelector('.count'),
      total = document.querySelector('.total'),
      hall = document.querySelector('.hall');

const SELECT_SEATE ='select_seats';
const SELECTED_MOVIE_INDEX = 'selected_movie_index';
const SELECTED_MOVIE_PRICE = 'selected_movie_price';


popolateUI();

let unitPrice = +select.value;

hall.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedSeat();
    }
})

select.addEventListener('change', e => {
    unitPrice = +e.target.value;
    storageMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedSeat();
})

// update count and total-money
function updateSelectedSeat(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //在总的seats中找到被选中的seat并记录索引
    const seatIndex = Array.from(selectedSeats).map( seat => {
        return [...seats].indexOf(seat)
    })
    console.log('seatIndex', seatIndex);
    localStorage.setItem(SELECT_SEATE, JSON.stringify(seatIndex));

    // update count and total
    const len = selectedSeats.length;
    count.innerText = len;
    total.innerText = `${unitPrice * len}`
}

// Get data from localstorage and populate UI
function popolateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem(SELECT_SEATE));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach( (seat,index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
              }
        });
    }

    const selectedMovieIndex = localStorage.getItem(SELECTED_MOVIE_INDEX);
    if(selectedMovieIndex !== null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function storageMovieData(index,price){
    localStorage.setItem(SELECTED_MOVIE_INDEX,index);
    localStorage.setItem(SELECTED_MOVIE_PRICE,price);
}

// Initial count and total set
updateSelectedSeat();

/* 
第一步，在点击座位的时候，更新样式，以及座位的数量和总共的价格，以及缓存这些数据
第二步，从缓存中读取数据，并更新到UI上
*/

