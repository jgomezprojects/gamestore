document.addEventListener("DOMContentLoaded", () => {

  
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 🔥 LIMPIAR CANTIDADES Y PRECIOS INVALIDOS
carrito = carrito
  .filter(p => p && p.nombre && p.precio && p.imagen)
  .map(p => ({
    ...p,
    precio: Number(p.precio) || 0,          // corrige precios inválidos
    cantidad: Number(p.cantidad) || 1       // corrige NaN → 1
  }));

// 🔄 Guardar carrito limpio
localStorage.setItem("carrito", JSON.stringify(carrito));


  const carritoContenedor = document.getElementById("carrito-contenedor");
  const totalElemento = document.getElementById("total");

  const STOCK_MAX = 10;

  function renderizarCarrito() {
    carritoContenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;

      const item = document.createElement("div");
      item.classList.add("carrito-item");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">

        <div class="carrito-info">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio.toFixed(2)}</p>
        </div>

        <div class="cantidad-controles">
          <button class="btn-restar" data-index="${index}">−</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button class="btn-sumar" data-index="${index}">+</button>
        </div>

        <button class="btn-eliminar" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;

      carritoContenedor.appendChild(item);
    });

    totalElemento.textContent = `$${total.toFixed(2)}`;
  }

  // SUMAR
  carritoContenedor.addEventListener("click", (e) => {
    if (e.target.closest(".btn-sumar")) {
      const index = e.target.closest(".btn-sumar").dataset.index;

      if (carrito[index].cantidad < STOCK_MAX) {
        carrito[index].cantidad++;
      } else {
        alert("⚠ Stock máximo alcanzado (10 unidades).");
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    }
  });

  // RESTAR
  carritoContenedor.addEventListener("click", (e) => {
    if (e.target.closest(".btn-restar")) {
      const index = e.target.closest(".btn-restar").dataset.index;

      carrito[index].cantidad--;

      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    }
  });

  // ELIMINAR
  carritoContenedor.addEventListener("click", (e) => {
    if (e.target.closest(".btn-eliminar")) {
      const index = e.target.closest(".btn-eliminar").dataset.index;

      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    }
  });

  // FINALIZAR COMPRA
  document.querySelector(".btn-finalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 👉 Cargar compras anteriores
    let compras = JSON.parse(localStorage.getItem("compras")) || [];

    // 👉 Crear nueva compra
    const nuevaCompra = {
      fecha: new Date().toLocaleString(),
      productos: carrito
    };

    // 👉 Agregar compra al historial
    compras.push(nuevaCompra);

    // 👉 Guardar en localStorage
    localStorage.setItem("compras", JSON.stringify(compras));

    alert("✅ ¡Compra finalizada y guardada en Mis Compras!");

    // 👉 Vaciar carrito
    localStorage.removeItem("carrito");
    carrito = [];
    renderizarCarrito();
  });

  // 👌 Render inicial
  renderizarCarrito();

}); 
