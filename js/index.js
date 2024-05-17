window.onload = function () {
    buildMenu();
    buildList();
};

function buildMenu() {
    fetch("../conf/configES.json")
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
                <input type="search" placeholder="Buscar" />
                <button type="submit">Buscar</button>
            </form></a>`;
            menu.appendChild(menuSearch);
        })
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
        .catch((error) => console.log("Hubor un error: " + error.message));
}

