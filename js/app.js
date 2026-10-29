dayjs.locale("es");
console.log(dayjs().format("D [de] MMMM [de] YYYY"));

let apodActual = null;

// Lee los favoritos de localStorage 
function leerFavoritos() {
    const guardado = localStorage.getItem("favoritos");
    if (guardado === null) {
        return [];
    }
    return JSON.parse(guardado);
}

// Guardar favoritos en localStorage
function guardarFavoritos(favoritos) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Mostar la lista en pantalla
function mostrarFavoritos() {
    const lista = document.getElementById("lista-favoritos");
    lista.innerHTML = "";

    const favoritos = leerFavoritos();

    favoritos.forEach(function (fav) {
        const li = document.createElement("li");
        li.textContent = dayjs(fav.date).format("D [de] MMMM [de] YYYY") + " - " + fav.title;
        li.style.cursor = "pointer";

        li.addEventListener("click", function () {
            cargarApod(fav.date);
        });

        lista.appendChild(li);
    });
}

// Agregar a favoritos
function agregarFavorito() {
    const mensaje = document.getElementById("mensaje-favorito");

    if (apodActual === null) {
        mensaje.textContent = "Aún no hay una APOD para guardar.";
        return;
    }

    const favoritos = leerFavoritos();

    const yaExiste = favoritos.some(function (fav) {
        return fav.date === apodActual.date;
    });

    if (yaExiste) {
        mensaje.textContent = "Esta APOD ya está en tus favoritos.";
        return;
    }

    favoritos.push({ date: apodActual.date, title: apodActual.title });
    guardarFavoritos(favoritos);
    mostrarFavoritos();
    mensaje.textContent = "¡Guardada en favoritos!";
}

document.getElementById("btn-favorito").addEventListener("click", agregarFavorito);

mostrarFavoritos();

// Traer datos de funcionalidades 1 y 2

const datos = await respuesta.json();
apodActual = datos;
