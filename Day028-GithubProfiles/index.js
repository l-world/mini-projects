const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUser(usename){
    try {
        const config = {
            headers: {
                Accept: 'application/json',
            },
        }
        const res = await fetch(APIURL + usename,config);
        const data = await res.json();
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        createErrorCard('No profile with this username')
    }
}

async function getRepos(usename){
    console.log('getRepos', usename);
    try {
       
        const config = {
            headers: {
                Accept: 'application/json',
            },
        }
        const res = await fetch(APIURL + usename + '/repos?sort=created',config);
        const data = await res.json();
        console.log(data);
        addReposToCard(data);
    } catch (error) {
        console.log('111')
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="profile_img">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    console.log('add repositories')
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)
        search.value = ''
    }
})
