const searchEl = document.querySelector('.search'),
      userListEl = document.querySelector('.user_list');
let lis = [];

searchEl.addEventListener('input', e => filterUser(e.target.value) )

createLi();

async function getUserDate(){
    const res = await fetch('https://randomuser.me/api?results=50')
    const { results } = await res.json();
    return results;
}

async function createLi(){
    const data = await getUserDate();
    userListEl.innerHTML = '';
    data.forEach( user => {
        const li = document.createElement('li');
        lis.push(li);
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}" class="avator">
            <div>
                <h5 class="name">${user.name.first} ${user.name.last}</h5>
                <small class="intro">${user.location.city}, ${user.location.country}</small>
            </div>
        `
        userListEl.appendChild(li);
    });
    
}

function filterUser(name){
    console.log(name);
    lis.forEach(item => {
        if(item.innerText.toLowerCase().includes(name.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}

