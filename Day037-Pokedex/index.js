const container = document.querySelector(".container");
const pokemon_count = 150;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

async function getPokeman() {
    for (let i = 1; i <= pokemon_count; i++) {
        await requestPokemon(i);
    }
}

async function requestPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createdCard(data);
}

async function createdCard(data) {
    const div = document.createElement("div");
    div.classList.add("card");
    const id = data.id.toString().padStart(3, '0')
    const poke_types = data.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    div.style.backgroundColor = color

    div.innerHTML = `
    <div class="img_wrap">
        <img src="src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png"" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${data.name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>`;

    container.appendChild(div);
}

getPokeman();