const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



// Main variable
let date = new Date();

// Function that returns the current calendar date
function getCurrentDate(element, asString) {
    if (element) {
        if (asString) {
            return element.textContent = weekdays[date.getDay()] + ', ' + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        }
        return element.value = date.toISOString().slice(0, 10);
    }
    return date;
}


// Main function that generates the calendar
function generateCalendar() {

    // Take a calendar and if it already exists remove it
    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.remove();
    }

    // Creates the table that will store the dates
    const table = document.createElement("table");
    table.id = "calendar";

    // Creates the headers for the days of the week
    const trHeader = document.createElement('tr');
    trHeader.className = 'weekends';
    weekdays.map(week => {
        const th = document.createElement('th');
        const w = document.createTextNode(week.substring(0, 3));
        th.appendChild(w);
        trHeader.appendChild(th);
    });

    // Adds the headers to the table
    table.appendChild(trHeader);

    //Take the day of the week from the first day of the month
    const weekDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();

    //Take the last day of the month
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    let tr = document.createElement("tr");
    let td = '';
    let empty = '';
    let btn = document.createElement('button');
    let week = 0;

    // If the day of the week of the first day of the month is greater than 0 (first day of the week);
    while (week < weekDay) {
        td = document.createElement("td");
        empty = document.createTextNode(' ');
        td.appendChild(empty);
        tr.appendChild(td);
        week++;
    }

    // It runs from the 1st to the last day of the month
    for (let i = 1; i <= lastDay;) {
        // As long as the day of the week is < 7, it will add columns to the week row
        while (week < 7) {
            td = document.createElement('td');
            let text = document.createTextNode(i);
            btn = document.createElement('button');
            btn.className = "btn-day";
            btn.addEventListener('click', function () { changeDate(this) });
            week++;



            // Control it to stop exactly on the last day
            if (i <= lastDay) {
                i++;
                btn.appendChild(text);
                td.appendChild(btn)
            } else {
                text = document.createTextNode(' ');
                td.appendChild(text);
            }
            tr.appendChild(td);
        }
        // Adds the row to the table
        table.appendChild(tr);

        // Creates a new line to be used
        tr = document.createElement("tr");

        //Reset the weekday counter
        week = 0;
    }
    // Adds the table to the div it should belong to
    const content = document.getElementById('table');
    content.appendChild(table);
    changeActive();
    changeHeader(date);
    document.getElementById('date').textContent = date;
    getCurrentDate(document.getElementById("currentDate"), true);
    getCurrentDate(document.getElementById("date"), false);
}

// Change the date via the form
function setDate(form) {
    let newDate = new Date(form.date.value);
    date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    generateCalendar();
    return false;
}

// Method Changes the month and year at the top of the calendar
function changeHeader(dateHeader) {
    const month = document.getElementById("month-header");
    if (month.childNodes[0]) {
        month.removeChild(month.childNodes[0]);
    }
    const headerMonth = document.createElement("h1");
    const textMonth = document.createTextNode(months[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear());
    headerMonth.appendChild(textMonth);
    month.appendChild(headerMonth);
}

// Function to change the color of the active day button
function changeActive() {
    let btnList = document.querySelectorAll('button.active');
    btnList.forEach(btn => {
        btn.classList.remove('active');
    });
    btnList = document.getElementsByClassName('btn-day');
    for (let i = 0; i < btnList.length; i++) {
        const btn = btnList[i];
        if (btn.textContent === (date.getDate()).toString()) {
            btn.classList.add('active');
        }
    }
}

// Function that takes the current date
function resetDate() {
    date = new Date();
    generateCalendar();
}

// Changes the date by the number of the button clicked
function changeDate(button) {
    let newDay = parseInt(button.textContent);
    date = new Date(date.getFullYear(), date.getMonth(), newDay);
    generateCalendar();
}

// Month and day forward and backward functions
function nextMonth() {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    generateCalendar(date);
}

function prevMonth() {
    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    generateCalendar(date);
}


function prevDay() {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    generateCalendar();
}

function nextDay() {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    generateCalendar();
}

document.onload = generateCalendar(date);
