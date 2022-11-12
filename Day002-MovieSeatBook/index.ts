const movieSelect = document.getElementById('movie_select') as HTMLSelectElement,
      seats = document.querySelectorAll('.row .seat:not(.occupied)'),
      count = document.querySelector('.count'),
      total = document.querySelector('.total'),
      hall = document.querySelector('.hall') as HTMLDivElement;
const SELECTED_SEATS_INDEX = 'selected_seats_index';
const SELECTED_MOVIE_INDEX = 'select_movie_index';

populateUI();

hall.addEventListener('click',  e => {
    const ele = (e.target as HTMLDivElement)
    if( ele.classList.contains('seat') && ! ele.classList.contains('occupied')){
        ele.classList.toggle('selected');
        updateCountTotal();
    }
})

let ticketPrice:number = +movieSelect.value;
movieSelect?.addEventListener('change', e =>{
    ticketPrice = +(e.target as HTMLSelectElement).value;
    updateCountTotal();
    setStorage(SELECTED_MOVIE_INDEX,(e.target as HTMLSelectElement).selectedIndex);
})

function updateCountTotal(){
    const seatsSelected:NodeListOf<Element> = document.querySelectorAll('.row .seat.selected');
    const len =seatsSelected.length;

    const seatsIndex:number[] = [...(seatsSelected as any)].map( seat => {
        return [...(seats as any)].indexOf(seat)
    })

    setStorage(SELECTED_SEATS_INDEX,seatsIndex);   
    
    (count as HTMLElement).innerText = `${len}`;
    (total as HTMLElement).innerText = `${len * ticketPrice}`;
}

function populateUI(){
    const stotageSeats:number[] = JSON.parse(getStorage(SELECTED_SEATS_INDEX));
    console.log(stotageSeats);
    if(stotageSeats !== null && stotageSeats.length > 0){
        seats.forEach( (seat,index) => {
            if(stotageSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const stotageSelectIndex = +getStorage(SELECTED_MOVIE_INDEX);
    if(stotageSelectIndex!== null){
        movieSelect.selectedIndex = stotageSelectIndex;
    }
}

function setStorage(name:string,value:any):void{
    localStorage.setItem(name,JSON.stringify(value));
}

function getStorage(name:string){
    return localStorage.getItem(name);
}

updateCountTotal();



