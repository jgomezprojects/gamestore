// script.js – versión mejorada
document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js cargado correctamente.");

  // Menú hamburguesa
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  let navOverlay = null;

  // Crear overlay para el menú móvil
  function createNavOverlay() {
    if (window.innerWidth > 768) return; // Solo en móvil
    
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      document.body.appendChild(navOverlay);
      
      navOverlay.addEventListener('click', () => {
        closeMenu();
      });
    }
  }

  function openMenu() {
    if (mainNav) {
      mainNav.classList.add("active");
      createNavOverlay();
      if (navOverlay) {
        navOverlay.style.display = 'block';
        setTimeout(() => {
          navOverlay.style.opacity = '1';
        }, 10);
      }
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mainNav) {
      mainNav.classList.remove("active");
      if (navOverlay) {
        navOverlay.style.opacity = '0';
        setTimeout(() => {
          navOverlay.style.display = 'none';
        }, 300);
      }
      // Restaurar scroll del body
      document.body.style.overflow = '';
    }
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mainNav.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Cerrar menú al hacer clic fuera (solo en desktop)
    document.addEventListener("click", (e) => {
      if (window.innerWidth > 768) {
        if (!mainNav.contains(e.target) && e.target !== menuToggle) {
          closeMenu();
        }
      }
    });

    // Cerrar menú al redimensionar a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && mainNav.classList.contains("active")) {
        closeMenu();
      }
    });

    // Cerrar menú con tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("active")) {
        closeMenu();
      }
    });
  }
});
