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

async function loadPokemon(numberOfPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${numberOfPokemon}`;
    let payload = await fetch(url);
    return await payload.json();
}

function init() {
    renderHeader();
    renderPokemon();
}

function renderHeader() {
    document.body.innerHTML = "";
    document.body.innerHTML += `
    <h1><img src="img/pokemon.png"></h1>
    <div class="d-flex align-items-center flex-wrap justify-content-center" id="content"></div>
    <img id="up" onclick="document.documentElement.scrollTop = 0" class="back-top position-fixed d-flex justify-content-center align-items-center d-none" src="img/up.png">
    `;
}

async function renderThis(number) {
    const thisPokemon = await loadPokemon(number);
    document.body.innerHTML += `
    <div id="test" class="position-fixed blackbox d-flex justify-content-center" onclick="remove('test')">
        <div class="d-flex flex-column whole" style="${backgroundColor(thisPokemon["types"][0]["type"]["name"])}" onclick="event.stopPropagation()" style="background-color: rgba(255, 255, 255, 25%)">
            <div class="upper align-items-center p-4 d-flex flex-column justify-content-between">
                <div class="test position-relative w100" onclick="remove('test')">
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
            <div class="lower p-4"></div>
        </div>
    </div>
    `;
    for (let x = 0; x < thisPokemon["types"].length; x++) {
        document.getElementById("type").innerHTML += `
        <p class="deco">${capital(thisPokemon["types"][x]["type"]["name"])}</p>
        `;
    }
    document.body.style.overflow = "hidden";
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