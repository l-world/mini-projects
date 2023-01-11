const USER_API = 'https://randomuser.me/api';
const MILLION = 1000000

const addUserBtn = document. getElementById('add_user'),
      doubleMoneyBtn = document.getElementById('double_money'),
      showOnlyBtn = document.getElementById('show_only'),
      sortBtn = document.getElementById('sort'),
      calculateBtn = document.getElementById('calculate'),
      main = document.querySelector('.main');
let userList = document.querySelector('.wealth-list');

let data = [];

addUser();
addUser();
addUser();

async function getUser(){
    const res = await fetch(USER_API);
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * MILLION)
    }
    return newUser;
}

function updateDOM(userData = data){
    if( document.querySelector('.total')){
        document.querySelector('.total').remove();
    }
    userList.innerHTML = '';
    userData.forEach( user => {
        const li = document.createElement('li');   
        li.innerHTML = `<strong>${user.name}</strong><span>${formatMoney(user.money)}</span>`
        userList.appendChild(li);
    })
}

async function addUser(){
    const user = await getUser();
    data.push(user);
    updateDOM();
}

function doubleMoney(){
    data = data.map( user => {
        return {...user, money: user.money * 2}
    })
    updateDOM();
}

function showOnluMillion(){
    data = data.filter(user => user.money > MILLION);
    updateDOM();
}

function sort(){
    data = data.sort( (a,b) => b.money - a.money );
    updateDOM();
}

function calculateEntire(){
    const totalWealth = data.reduce(( acc ,user) => {
        acc += user.money
        return acc;
    },0)

    const div =document.createElement('div');
    div.classList.add('total');
    div.innerHTML = `<span>total wealth:</span>
    <span>${formatMoney(totalWealth)}</span>`
    main.appendChild(div);
}

function formatMoney(money){
    return ' $' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

addUserBtn.addEventListener('click', addUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showOnlyBtn.addEventListener('click',showOnluMillion);
sortBtn.addEventListener('click',sort);
calculateBtn.addEventListener('click', calculateEntire)
