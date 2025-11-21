const botones = document.querySelectorAll('.btn-carrito');

botones.forEach(btn => {
  btn.addEventListener('click', () => {

    const producto = btn.closest('.producto');

    // ------ STOCK ------
    const stockSpan = producto.querySelector('.stock span');
    let stock = parseInt(stockSpan.textContent);

    if (stock > 0) {
      stock--;
      stockSpan.textContent = stock;

      if (stock === 0) {
        btn.disabled = true;
        btn.textContent = 'Agotado';
        btn.style.backgroundColor = '#555';
      }
    }

    // ------ AGREGAR AL CARRITO ------
    const nombre = producto.querySelector("h3").textContent;
    const precioTexto = producto.querySelector(".precio").textContent.replace("$", "").replace(".", "");
    const precio = parseFloat(precioTexto);
    const imagen = producto.querySelector("img").src;

    const nuevoProducto = { nombre, precio, imagen };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(nuevoProducto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mensaje opcional
    alert("Producto agregado al carrito 🛒");
  });
});
// ===============================
// BUSCADOR DE PRODUCTOS
// ===============================
const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".producto");
const mensaje = document.getElementById("sinResultados");

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  let coincidencias = 0;

  productos.forEach(prod => {
    const nombre = prod.querySelector("h3").textContent.toLowerCase();

    if (nombre.includes(texto)) {
      prod.style.display = "block";
      coincidencias++;
    } else {
      prod.style.display = "none";
    }
  });

  // Si no hay coincidencias, mostramos el mensaje
  if (coincidencias === 0 && texto.trim() !== "") {
    mensaje.style.display = "block";
  } else {
    mensaje.style.display = "none";
  }
});
