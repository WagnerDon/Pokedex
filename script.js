let totalPokemon = 905;  //not dynamic, last Pokemon is number 905
let numberOfPokemon = 1; //starting Pokemon

window.addEventListener('scroll', () => {
    const maxscroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    if (scrolled > maxscroll) {
        renderPokemon();
    }

    if (window.scrollY < 500) {
        document.getElementById('up').classList.add('d-none');
    } else if (window.scrollY > 500) {
        document.getElementById('up').classList.remove('d-none');
    }
});

let loading = false;

async function loadPokemon(numberOfPokemon) {
    if (loading === false) {
        loading = true;
        let url = `https://pokeapi.co/api/v2/pokemon/${numberOfPokemon}`;
        let payload = await fetch(url);
        loading = false;
        return await payload.json();
    }
}

function init() {
    renderHeader();
    renderPokemon();
}

function renderHeader() {
    document.body.innerHTML = "";
    document.body.innerHTML += headerHTML();
}

function headerHTML() {
    return `
    <h1><img src="img/pokemon.png"></h1>
    <div class="d-flex align-items-center flex-wrap justify-content-center" id="content"></div>
    <img id="up" onclick="document.documentElement.scrollTop = 0" class="back-top position-fixed d-flex justify-content-center align-items-center d-none" src="img/up.png">
    `
}

function thisHTML(number, thisPokemon) {
    return `
<div id="test" class="position-fixed blackbox d-flex justify-content-center" onclick="remove('test')">
    <div class="d-flex flex-column whole" style="${backgroundColor(thisPokemon["types"][0]["type"]["name"])}" onclick="event.stopPropagation()" style="background-color: rgba(255, 255, 255, 25%)">
        <div class="upper align-items-center p-4 d-flex flex-column justify-content-between">
            <div class="test w100 position-relative" onclick="remove('test')">
                <img class="back" src="img/arrow.png">
            </div>
            <img class="position-absolute pokeball" src="img/pokeball.png">
            <div class="w100 d-flex align-items-center justify-content-between">
                <div>
                    <h2>
                        ${capital(thisPokemon["name"])}
                    </h2>
                    <div class="d-flex" id="type"></div>
                </div>
                <p>#${addZero(number)}</p>
            </div>
            <div class="position-relative card-img">
                <img src="${thisPokemon["sprites"]["other"]["official-artwork"]["front_default"]}">
            </div>
        </div>
        <div id="info" class="lower p-4 d-flex flex-column"></div>
    </div>
</div>
`
}

async function renderThis(number) {
    const thisPokemon = await loadPokemon(number);
    document.body.innerHTML += thisHTML(number, thisPokemon);
    for (let x = 0; x < thisPokemon["types"].length; x++) {
        document.getElementById("type").innerHTML += `
        <p class="deco">${capital(thisPokemon["types"][x]["type"]["name"])}</p>
        `;
    }
    document.body.style.overflow = "hidden";
    about(number);
}

async function getInfo(pokemonNumber) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`;
    let payload = await fetch(url);
    return await payload.json();
}

function statsHTML(number) {
    return `
    <div style="z-index: 2" class="d-flex justify-content-between align-items-center">
        <h5 onclick="about(${number})" style="cursor: pointer">About</h5>
        <h5 id="stats">Stats</h5>
        <h5 onclick="abilities(${number})" style="cursor: pointer">Abilities</h5>
    </div>
    <div class="d-flex flex-column h100">
        <div id="stat" class="stats"></div>
    </div>
    `
}

function statHTML(x, thisPokemon) {
    return `
    <div class="d-flex justify-content-between align-items-center">
            <p class="coherent">${capital(thisPokemon["stats"][x]["stat"]["name"])}:</p>
            <div class="stat-bar"><div style="width: ${thisPokemon["stats"][x]["base_stat"]}%" class="meter w0"></div></div>
            <p class="coherent2">${thisPokemon["stats"][x]["base_stat"]}</p>
        </div>
    `
}

async function stats(number) {
    let thisPokemon = await loadPokemon(number);
    let content = document.getElementById('info');
    content.innerHTML = "";
    content.innerHTML += statsHTML(number);

    for (let x = 0; x < thisPokemon["stats"].length; x++) {
        document.getElementById('stat').innerHTML += statHTML(x, thisPokemon);
    }
    document.getElementById('stats').classList.add('animate');
    for (let x = 0; x < document.getElementsByClassName('meter').length; x++) {
        setTimeout(() => { document.getElementsByClassName('meter')[x].classList.remove('w0'); }, 25);
    }
}

function playAnim(value) {
    let who = document.getElementById(value);
    who.classList.add('anim');
}

function abilitiesHTML(number) {
    return `
    <div style="z-index: 2" class="d-flex justify-content-between align-items-center">
        <h5 onclick="about(${number})" style="cursor: pointer">About</h5>
        <h5 onclick="stats(${number})" style="cursor: pointer">Stats</h5>
        <h5 id="abilities">Abilities</h5>
    </div>
    <div class="d-flex flex-column h100">
        <div id="stats" class="stats2" style="overflow: auto"></div>
    </div>
    `
}

async function abilities(number) {
    let thisPokemon = await loadPokemon(number);
    let content = document.getElementById('info');
    content.innerHTML = "";
    content.innerHTML += abilitiesHTML(number);

    for (let x = 0; x < thisPokemon["abilities"].length; x++) {
        ability(x, thisPokemon);
    }
}

async function ability(x, thisPokemon) {
    let replace = thisPokemon["abilities"][x]["ability"]["name"];
    let url = `https://pokeapi.co/api/v2/ability/${replace}`;
    let payload = await fetch(url);
    let thisAbility = await payload.json();
    document.getElementById('stats').innerHTML += `
    <div class="d-flex flex-column">
        <b style="margin-top: 10px">${capital(thisPokemon["abilities"][x]["ability"]["name"])}</b>
        ${thisAbility["effect_entries"][1]["effect"]}
    </div>
    `;
    document.getElementById('abilities').classList.add('animate');
}

function aboutHTML(thisPokemon, number, thisInfo) {
    return `
    <div style="z-index: 2" class="d-flex justify-content-between align-items-center">
        <h5 id="about">About</h5>
        <h5 onclick="stats(${number})" style="cursor: pointer">Stats</h5>
        <h5 onclick="abilities(${number})" style="cursor: pointer">Abilities</h5>
    </div>
    <div class="d-flex flex-column h100">
        <p class="mb10">${thisInfo["flavor_text_entries"][0]["flavor_text"].replace("", " ")}</p>
        <div class="stats">
            <div class="d-flex justify-content-between align-items-center">
                <p class="coherent">Base Experience:</p>
                <div class="stat-bar"><div style="width: ${thisPokemon["base_experience"]}%" class="meter w0"></div></div>
                <p class="coherent2">${thisPokemon["base_experience"]}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="coherent">Base Happiness:</p>
                <div class="stat-bar"><div style="width: ${thisInfo["base_happiness"]}%" class="meter w0"></div></div>
                <p class="coherent2">${thisInfo["base_happiness"]}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="coherent">Capture Rate:</p>
                <div class="stat-bar"><div style="width: ${thisInfo["capture_rate"]}%" class="meter w0"></div></div>
                <p class="coherent2">${thisInfo["capture_rate"]}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="coherent">Height:</p>
                <div class="stat-bar"><div style="width: ${thisPokemon["height"]}%" class="meter w0"></div></div>
                <p class="coherent2">${thisPokemon["height"]}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p class="coherent">Weight:</p>
                <div class="stat-bar"><div style="width: ${thisPokemon["weight"]}%" class="meter w0"></div></div>
                <p class="coherent2">${thisPokemon["weight"]}</p>
            </div>
        </div>
    </div>
    `
}

async function about(number) {
    let thisInfo = await getInfo(number);
    let thisPokemon = await loadPokemon(number);
    let content = document.getElementById('info');
    content.innerHTML = "";
    content.innerHTML += aboutHTML(thisPokemon, number, thisInfo);
    document.getElementById('about').classList.add('animate');
    for (let x = 0; x < document.getElementsByClassName('meter').length; x++) {
        setTimeout(() => { document.getElementsByClassName('meter')[x].classList.remove('w0'); }, 25);
    }
}

function addZero(value) {
    if (value < 100) {
        if (value < 10) {
            return "00" + value;
        } else {
            return "0" + value;
        }
    }
}

function remove(number) {
    document.getElementById(number).remove();
    document.body.style.overflow = "auto";
}

async function renderPokemon() {
    for (let i = numberOfPokemon; i < numberOfPokemon + 12; i++) {
        if (i <= totalPokemon) {
            let currentPokemon = await loadPokemon(i);
            document.getElementById('content').innerHTML += `
            <div onclick="renderThis(${i})" style="${backgroundColor(currentPokemon["types"][0]["type"]["name"])}" id="${i + "card"}" class="card p-3 m-2 position-relative">
                <h3>${capital(currentPokemon["name"])}</h3>
                <img class="front-img position-absolute" src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}">
                <img class="pokeball position-absolute" src="img/pokeball.png">
            </div>
            `;
            for (let x = 0; x < currentPokemon["types"].length; x++) {
                document.getElementById(i + "card").innerHTML += `
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
        return "background: rgb(120,200,80)";
    }
    if (value === "normal") {
        return "background: rgb(168,168,120)";
    }
    if (value === "fire") {
        return "background: rgb(240,128,48)";
    }
    if (value === "water") {
        return "background: rgb(104,144,240)";
    }
    if (value === "electric") {
        return "background: rgb(248,208,48)";
    }
    if (value === "ice") {
        return "background: rgb(152,216,216)";
    }
    if (value === "fighting") {
        return "background: rgb(192,48,40)";
    }
    if (value === "poison") {
        return "background: rgb(160,64,160)";
    }
    if (value === "ground") {
        return "background: rgb(223,191,104)";
    }
    if (value === "flying") {
        return "background: rgb(168,144,240)";
    }
    if (value === "psychic") {
        return "background: rgb(248,87,135)";
    }
    if (value === "bug") {
        return "background: rgb(168,184,32)";
    }
    if (value === "rock") {
        return "background: rgb(184,160,56)";
    }
    if (value === "ghost") {
        return "background: rgb(112,88,152)";
    }
    if (value === "dark") {
        return "background: rgb(112,88,72)";
    }
    if (value === "dragon") {
        return "background: rgb(112,56,248)";
    }
    if (value === "steel") {
        return "background: rgb(184,184,208)";
    }
    if (value === "fairy") {
        return "background: rgb(240,182,188)";
    }
}