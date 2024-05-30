window.onload = function () {
    getParams();
    cargarArchivosJSON();
};

let configPath = "";
let profilePath = "";
const dataPath = "/datos/index.json";

function getParams() {
    const parametrosURL = new URLSearchParams(window.location.search);
    const idioma = parametrosURL.get("lang");
    const perfil = parametrosURL.get("cedula");
    if (idioma == null) {
        configPath = `\/conf/configES.json`;
    } else {
        configPath = `\/conf/config${idioma.toUpperCase()}.json`;
    }
    if (perfil == null) {
        profilePath = `../23616754/perfil.json`;
    } else {
        profilePath = `../${perfil}/perfil.json`;
    }
}

async function cargarArchivosJSON() {
    try {
        const [CONF, PROFILE, DATA] = await Promise.all([
            fetch(configPath).then((response) => response.json()),
            fetch(profilePath).then((response) => response.json()),
            fetch(dataPath).then((response) => response.json()),
        ]);
        console.log("Datos del archivo conf:", CONF);
        console.log("Datos del archivo profile:", PROFILE);
        console.log("Datos del archivo datos:", DATA);

        /*----------------Pagina Perfil----------------*/
        if(window.location.pathname ==="/23616754/perfil.html"){
            let profileContainer = document.getElementById("profile-container");
            const photo = document.createElement("div");
            photo.innerHTML = `<img id="rounded-photo" src="/${PROFILE.ci}/${PROFILE.ci}.jpg"/>`;
            profileContainer.appendChild(photo);
            const profileBox = document.createElement("div");
            profileBox.id = "profile-box";
            profileBox.innerHTML =`
            <p id="name">${PROFILE.nombre}</p>
            <p id="description">${PROFILE.descripcion}</p><br>
            <p>${CONF.color}: ${PROFILE.color}<br>
            <br>${CONF.libro}: ${PROFILE.libro.join(', ')}<br>
            <br>${CONF.musica}: ${PROFILE.musica.join(', ')}<br>
            <br>${CONF.video_juego}: ${PROFILE.video_juego.join(', ')}<br>
            <br>${CONF.lenguajes}: ${PROFILE.lenguajes.join(', ')}<br>
            <br>${CONF.email.replace("[email]", `<a id="email" href="${PROFILE.email}">${PROFILE.email}</a>`)}
            </p>
            `;
            profileContainer.appendChild(profileBox);
        }
        /*----------------Pagina Listado----------------*/
        if(window.location.pathname === "/index.html"){
            let menu = document.getElementById("menu");
            const menuLogo = document.createElement("li");
            menuLogo.innerHTML = `<a href=#>${CONF.sitio[0]}<span id="logo">${CONF.sitio[1]}</span>${CONF.sitio[2]}</a>`;
            menu.appendChild(menuLogo);
            const menuNombre = document.createElement("li");
            menuNombre.innerHTML = `<a id="menuNombre" href=#>${CONF.saludo}, ${PROFILE.nombre}</a>`;
            menu.appendChild(menuNombre);
            const menuSearch = document.createElement("li");
            menuSearch.innerHTML = `<a id="menuSearch" href="#">
            <form>
                <input id="searchInput" type="search" placeholder="${CONF.buscar}" />
                <button id="searchButton" type="submit">${CONF.buscar}</button>
            </form></a>`;
            menu.appendChild(menuSearch);
            const footer = document.getElementById("footer");
            const copyRight = document.createElement("p");
            copyRight.innerHTML = `${CONF.copyRight}`;
            footer.appendChild(copyRight);
            let list = document.getElementById("list");
                DATA.forEach((estudiante) => {
                    const estudianteActual = document.createElement("li");
                    estudianteActual.innerHTML += `
                    <img src="../${estudiante.imagen}"/></br>${estudiante.nombre}
                `;
                    list.appendChild(estudianteActual);
                });
            const section = document.getElementById("contenido-principal");
            const searchInput = document.getElementById("searchInput");
            const errorMsg = document.createElement("p");
            errorMsg.id = "search-fault";
            const filteredList = document.getElementById("list").getElementsByTagName("li");
            searchInput.addEventListener("keyup", function () {
                const searchTerm = searchInput.value.toLowerCase();
                let coincidencias = false;
                for (const profile of filteredList) {
                    const name = profile.textContent.toLowerCase();
                    if(name.includes(searchTerm)){
                        profile.style.display = "block";
                        coincidencias = true;
                    }else {
                        profile.style.display = "none";
                    }
                }
                errorMsg.innerHTML = `${CONF.mensaje_error.replace("[query]", searchInput.value)}`
                errorMsg.style.display = coincidencias ? "none" : "block";
            });
            section.appendChild(errorMsg);
        }
    } catch (error) {
        console.error("Error al cargar los archivos JSON:", error);
    }
}