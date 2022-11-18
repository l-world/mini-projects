const USER_API:string = 'https://randomuser.me/api';
const MILLION:number = 1000000;

const addUserBtn = document.getElementById('add_user'),
      doubleMoneyBtn = document.getElementById('double_money'),
      showOnlyBtn = document.getElementById('show_only'),
      sortBtn = document.getElementById('sort'),
      entireBtn = document.getElementById('calc_entire'),
      mainEl = document.querySelector('.main');

interface User {
    name:string,
    wealth:number
}

let users:User[] = [];


addUser();
addUser();
addUser();

async function getUser(){
    const res = await fetch(USER_API);
    const data = await res.json();
    const user = data.results[0];
    const newUser:User = {
        name:`${user.name.first} ${user.name.last}`,
        wealth:Math.floor( Math.random() * MILLION)
    }
    return newUser;
}

async function addUser(){
    const user:User = await getUser();
    users.push(user)
    updateDOM();
} 

function doubleMoney(){
    users = users.map( user => {
        return {...user, wealth: user.wealth * 2}
    })

    updateDOM();
}

function showOnlyMillion(){
    users = users.filter( user => user.wealth > MILLION);
    updateDOM();
}

function sortByRichest(){
    console.log('111');
    users = users.sort( (a,b) => b.wealth - a.wealth);
    updateDOM();
}

function calcTotalWealth(){
    let amount:number = users.reduce( (count,user) => {
        count += user.wealth
        return count
    },0)

    const div = document.createElement('div');
    div.classList.add('entire');
    div.innerHTML = `<span>total wealth:</span><strong>${formatMoney(amount)}</strong>`
    mainEl?.appendChild(div);
}

function updateDOM(privateData = users){
    mainEl!.innerHTML = `<div class="title"><strong>person</strong>wealth</div>`
    privateData.forEach( user =>{
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `<strong>${user.name}</strong><span>${formatMoney(user.wealth)}</span>`
        mainEl?.appendChild(div)
    })
}

function formatMoney(money:number):string{
    return '$' + money.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn?.addEventListener('click', addUser);
doubleMoneyBtn?.addEventListener('click', doubleMoney);
showOnlyBtn?.addEventListener('click', showOnlyMillion);
sortBtn?.addEventListener('click', sortByRichest);
entireBtn?.addEventListener('click',calcTotalWealth)


/*  tsc index.ts --watch --lib "es2015, es2016, dom" */