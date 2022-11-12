var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var movieSelect = document.getElementById('movie_select'), seats = document.querySelectorAll('.row .seat:not(.occupied)'), count = document.querySelector('.count'), total = document.querySelector('.total'), hall = document.querySelector('.hall');
var SELECTED_SEATS_INDEX = 'selected_seats_index';
var SELECTED_MOVIE_INDEX = 'select_movie_index';
populateUI();
hall.addEventListener('click', function (e) {
    var ele = e.target;
    if (ele.classList.contains('seat') && !ele.classList.contains('occupied')) {
        ele.classList.toggle('selected');
        updateCountTotal();
    }
});
var ticketPrice = +movieSelect.value;
movieSelect === null || movieSelect === void 0 ? void 0 : movieSelect.addEventListener('change', function (e) {
    ticketPrice = +e.target.value;
    updateCountTotal();
    setStorage(SELECTED_MOVIE_INDEX, e.target.selectedIndex);
});
function updateCountTotal() {
    var seatsSelected = document.querySelectorAll('.row .seat.selected');
    var len = seatsSelected.length;
    var seatsIndex = __spreadArray([], seatsSelected, true).map(function (seat) {
        return __spreadArray([], seats, true).indexOf(seat);
    });
    setStorage(SELECTED_SEATS_INDEX, seatsIndex);
    count.innerText = "".concat(len);
    total.innerText = "".concat(len * ticketPrice);
}
function populateUI() {
    var stotageSeats = JSON.parse(getStorage(SELECTED_SEATS_INDEX));
    console.log(stotageSeats);
    if (stotageSeats !== null && stotageSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (stotageSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    var stotageSelectIndex = +getStorage(SELECTED_MOVIE_INDEX);
    if (stotageSelectIndex !== null) {
        movieSelect.selectedIndex = stotageSelectIndex;
    }
}
function setStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}
function getStorage(name) {
    return localStorage.getItem(name);
}
updateCountTotal();
