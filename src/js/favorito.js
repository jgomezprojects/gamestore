// ================
// FAVORITOS
// ================
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Eliminar productos corruptos o incompletos
favoritos = favoritos.filter(p =>
    p &&
    p.id &&
    p.nombre &&
    p.precio &&
    p.imagen
);

// Guardar limpieza
localStorage.setItem("favoritos", JSON.stringify(favoritos));


// ===============================
// CAPTURAR PRODUCTO DESDE DETALLE
// ===============================

function getProductoDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return null;

    const nombre = document.getElementById("producto-nombre")?.textContent?.trim() || null;
    const precio = document.getElementById("producto-precio")?.textContent?.trim() || null;
    const imagen = document.getElementById("producto-imagen")?.src || null;

    if (!nombre || !precio || !imagen) return null;

    return { id, nombre, precio, imagen };
}

// ===============================
// EVENTOS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const btnFav = document.getElementById("btnFavorito");
    if (!btnFav) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    // Marcar si ya es favorito
    if (favoritos.some(item => item.id === id)) {
        btnFav.classList.add("activo");
        btnFav.textContent = "⭐ En favoritos";
    }

    // Evento del botón
    btnFav.addEventListener("click", () => {

        const producto = getProductoDetalle();
        if (!producto) {
            console.warn("No se pudo obtener el producto desde detalle.");
            return;
        }

        const existe = favoritos.some(item => item.id === producto.id);

        if (existe) {
            favoritos = favoritos.filter(item => item.id !== producto.id);
            btnFav.classList.remove("activo");
            btnFav.textContent = "⭐ Agregar a favoritos";
        } else {
            favoritos.push(producto);
            btnFav.classList.add("activo");
            btnFav.textContent = "⭐ En favoritos";
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });

});
// ========================================
// MOSTRAR FAVORITOS EN favoritos.html
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaFavoritos");
    if (!lista) return; // Estamos en detalle, no en favoritos.html

    lista.innerHTML = "";

    if (favoritos.length === 0) {
        lista.innerHTML = `<p style="text-align:center; color:#aaa;">No tienes productos en favoritos.</p>`;
        return;
    }

    favoritos.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("fav-card");

        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">

            <div class="fav-info">
                <h3>${p.nombre}</h3>
                <p>${p.precio}</p>
                <a class="ver-detalles" href="detalle.html?id=${p.id}">Ver detalles</a>
            </div>

            <button class="btn-eliminar" data-id="${p.id}">🗑</button>
        `;

        lista.appendChild(card);
    });

    // Eliminar favorito
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            favoritos = favoritos.filter(item => item.id !== id);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            btn.parentElement.remove();
        });
    });

});
