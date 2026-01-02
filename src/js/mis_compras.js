document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-compras");
  let compras = JSON.parse(localStorage.getItem("compras")) || [];

  if (compras.length === 0) {
    lista.innerHTML = `<p style="text-align:center; color:#bbb;">Aún no tienes compras registradas.</p>`;
    return;
  }

  compras.reverse().forEach(compra => {
    const div = document.createElement("div");
    div.classList.add("compra-item");

    let html = `
      <p class="fecha">📅 ${compra.fecha}</p>
    `;

    compra.productos.forEach(p => {
      html += `
        <div class="producto">
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="producto-info">
            <h4>${p.nombre}</h4>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Precio c/u: $${p.precio.toFixed(2)}</p>
          </div>
        </div>
      `;
    });

    div.innerHTML = html;
    lista.appendChild(div);
  });
});
// 🗑 ELIMINAR TODO EL HISTORIAL DE COMPRAS
document.getElementById("btn-borrar-compras").addEventListener("click", () => {
  if (!confirm("¿Seguro que deseas borrar todas tus compras?")) return;

  localStorage.removeItem("compras");

  document.getElementById("lista-compras").innerHTML =
    `<p style="text-align:center; color:#bbb;">Aún no tienes compras registradas.</p>`;

  alert("🗑 Historial de compras eliminado.");
});
