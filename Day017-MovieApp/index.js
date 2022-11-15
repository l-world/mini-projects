const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const search = document.querySelector('.search'),
      main = document.querySelector('.main'),
      form = document.getElementById('form');

      getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovie(data.results);
}

async function showMovie(data){
    // const data = await getMovies(API_URL);
    main.innerHTML = '';
    data.forEach( movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const div = document.createElement('div');
        div.classList.add('movie');
        div.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" class="poster">
            <div class="intro">
                <h3>${title}</h3>
                <div class="${getClassByRate(vote_average)} mark" >${vote_average}</div>
            </div>
            <div class="overview">
                <h2>overview</h2>
                <p class="desp"> ${overview}<p>
            </div>
        `
        main.appendChild(div);
    });
}

function getClassByRate(vote){
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const key = search.value;
    console.log(key);
    if(key && key !== ''){
        getMovies(SEARCH_API + key);
        search.value = ''
    }else{
        window.location.reload()
    }
})

