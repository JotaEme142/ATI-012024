window.onload = function () {
    getParams();
    buildMenu();
    buildList();
    buildProfile();
};

let configFilePath = "";
let profilePath = "";

function getParams(){
    const parametrosURL = new URLSearchParams (window.location.search);
    const idioma = parametrosURL.get('lang');
    const perfil = parametrosURL.get('cedula');
    console.log(idioma);
    console.log(perfil);
    if (idioma == null) {
        configFilePath = `conf/configES.json`;
    }else{
        configFilePath = `conf/config${idioma.toUpperCase()}.json`;
    }
    if (perfil == null){
        profilePath = `../23616754/perfil.json`;
    }else{
        profilePath = `../${perfil}/perfil.json`;
        
    }

}

function buildMenu() {
    fetch(configFilePath)
        .then((respuesta) => respuesta.json())
        .then((CONF) => {
            let menu = document.getElementById("menu");
            const menuLogo = document.createElement("li");
            menuLogo.innerHTML = `<a href=#>${CONF.sitio[0]}<span id="logo">${CONF.sitio[1]}</span>${CONF.sitio[2]}</a>`;
            menu.appendChild(menuLogo);
            const menuNombre = document.createElement("li");
            menuNombre.innerHTML = `<a id="menuNombre" href=#>${CONF.saludo}, ${CONF.nombre}</a>`;
            menu.appendChild(menuNombre);
            const menuSearch = document.createElement("li");
            menuSearch.innerHTML = `<a id="menuSearch" href="#">
            <form>
                <input type="search" placeholder="${CONF.buscar}" />
                <button type="submit">${CONF.buscar}</button>
            </form></a>`;
            menu.appendChild(menuSearch);
            let footer = document.getElementById("footer");
            const copyRight = document.createElement("div");
            copyRight.innerHTML = `<p> ${CONF.copyRight} </p>`;
            footer.appendChild(copyRight);
        })
        .catch((error) => console.log("Hubo un error: " + error.message));
}

function buildList() {
    fetch("../datos/index.json")
        .then((respuesta) => respuesta.json())
        .then((STUDENTS) => {
            let list = document.getElementById("list");
            STUDENTS.forEach((estudiante) => {
                const estudianteActual = document.createElement("li");
                estudianteActual.innerHTML += `
                <img src="../${estudiante.imagen}"/></br>${estudiante.nombre}
            `;
                list.appendChild(estudianteActual);
            });
        })
        .catch((error) => console.log("Hubo un error: " + error.message));
}

function buildProfile(){
    fetch(profilePath)
    .then((respuesta) => respuesta.json())
    .then((PROFILE) => {
        let profileContainer = document.getElementById("profile-container");
        const photo = document.createElement("div");
        photo.innerHTML = `<img id=""rounded-photo src="../${PROFILE.ci}/${PROFILE.ci}.*/>"`;
        profileContainer.appendChild(photo);
        let profileBox = document.getElementById("profile-box");

    })
    .catch((error) => console.log("Hubo un error: " + error.message));
}

