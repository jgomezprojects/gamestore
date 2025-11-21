// =======================
// MOSTRAR FAVORITOS
// =======================

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("lista-favoritos");
    if (!contenedor) return;

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Si está vacío
    if (favoritos.length === 0) {
        contenedor.innerHTML = `
            <p class="vacio">No tienes productos en favoritos.</p>
        `;
        return;
    }

    // Renderizar productos
    contenedor.innerHTML = favoritos.map(prod => `
        <div class="card-fav">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>${prod.precio}</p>

            <a href="detalle.html?id=${prod.id}" class="btn-ver">Ver producto</a>

            <button class="btn-eliminar" data-id="${prod.id}">Eliminar</button>
        </div>
    `).join("");

    // Eliminar favoritos
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;

            const nuevos = favoritos.filter(item => item.id !== id);
            localStorage.setItem("favoritos", JSON.stringify(nuevos));

            btn.parentElement.remove();
        });
    });

});
