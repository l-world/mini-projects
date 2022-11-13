const jokeEle = document.querySelector('.joke'),
    getJokeBtn = document.querySelector('.btn');

getJokeBtn.addEventListener('click', generateJoke)

generateJoke();

async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    const res = await fetch('https://icanhazdadjoke.com', config)
    const data = await res.json()
    jokeEle.innerHTML = data.joke
}


