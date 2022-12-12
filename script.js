let totalPokemon = 905;  //not dynamic, last Pokemon is number 905
let numberOfPokemon = 1; //starting Pokemon
let oneBlock = 12;
let greenlight = true;

window.addEventListener('scroll', () => {
    const maxscroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (scrolled > maxscroll && greenlight === true) {
        setTimeout(renderPokemon, 2000);
        greenlight = false;
        setTimeout(greenlight = true, 2000)
    }

    if (window.scrollY < 500) {
        document.getElementById('up').classList.add('d-none');
    } else if (window.scrollY > 500) {
        document.getElementById('up').classList.remove('d-none');
    }
});

async function loadPokemon(numberOfPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${numberOfPokemon}`;
    let payload = await fetch(url);
    return await payload.json();
}

function renderUI() {
    document.body.innerHTML = "";
    document.body.innerHTML += `
    <h1>Pokedex Scroller</h1>
    <div class="d-flex align-items-center flex-wrap justify-content-center" id="content"></div>
    <img id="up" onclick="document.documentElement.scrollTop = 0" class="back-top position-fixed d-flex justify-content-center align-items-center d-none" src="img/up.png">
    `;
    renderPokemon();
}

async function renderPokemon() {
    for (let i = numberOfPokemon; i < numberOfPokemon + 12; i++) {
        if (i <= totalPokemon) {
            let currentPokemon = await loadPokemon(i);
            document.getElementById('content').innerHTML += `
            <div style="${backgroundColor(currentPokemon["types"][0]["type"]["name"])}" id="${i}" class="card p-3 m-2 position-relative">
                <h3>${capital(currentPokemon["name"])}</h3>
                <img class="front-img position-absolute" src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}">
                <img class="pokeball position-absolute" src="img/pokeball.png">
            </div>
            `;
            for (let x = 0; x < currentPokemon["types"].length; x++) {
                document.getElementById(i).innerHTML += `
                <p class="deco">${capital(currentPokemon["types"][x]["type"]["name"])}</p>
                `;
            }
        }
    }
    numberOfPokemon += 12;
}

function capital(value) {
    return value[0].toUpperCase() + value.slice(1); //[0] || charAt(0)
}

function backgroundColor(value) {
    if (value === "grass") {
        return "background-color: rgb(120,200,80)";
    }
    if (value === "normal") {
        return "background-color: rgb(168,168,120)";
    }
    if (value === "fire") {
        return "background-color: rgb(240,128,48)";
    }
    if (value === "water") {
        return "background-color: rgb(104,144,240)";
    }
    if (value === "electric") {
        return "background-color: rgb(248,208,48)";
    }
    if (value === "ice") {
        return "background-color: rgb(152,216,216)";
    }
    if (value === "fighting") {
        return "background-color: rgb(192,48,40)";
    }
    if (value === "poison") {
        return "background-color: rgb(160,64,160)";
    }
    if (value === "ground") {
        return "background-color: rgb(223,191,104)";
    }
    if (value === "flying") {
        return "background-color: rgb(168,144,240)";
    }
    if (value === "psychic") {
        return "background-color: rgb(248,87,135)";
    }
    if (value === "bug") {
        return "background-color: rgb(168,184,32)";
    }
    if (value === "rock") {
        return "background-color: rgb(184,160,56)";
    }
    if (value === "ghost") {
        return "background-color: rgb(112,88,152)";
    }
    if (value === "dark") {
        return "background-color: rgb(112,88,72)";
    }
    if (value === "dragon") {
        return "background-color: rgb(112,56,248)";
    }
    if (value === "steel") {
        return "background-color: rgb(184,184,208)";
    }
    if (value === "fairy") {
        return "background-color: rgb(240,182,188)";
    }
}