// script.js – versión limpia
document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js cargado correctamente.");

  // Menú hamburguesa
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && e.target !== menuToggle) {
        mainNav.classList.remove("active");
      }
    });
  }
});
