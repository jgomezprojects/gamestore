// Carrusel de productos destacados - Versión nueva y simple
(function() {
  'use strict';
  
  let currentSlide = 0;
  let autoPlayInterval = null;
  let slides = [];
  let arrowLeft, arrowRight, carouselContainer;

  function initCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    arrowLeft = document.querySelector('.carousel-arrow-left');
    arrowRight = document.querySelector('.carousel-arrow-right');
    carouselContainer = document.querySelector('.carousel-container');

    if (!slides.length || !arrowLeft || !arrowRight || !carouselContainer) {
      console.warn('Elementos del carrusel no encontrados');
      return false;
    }

    // Mostrar el primer slide
    showSlide(0);

    // Event listeners para las flechas
    arrowLeft.addEventListener('click', () => {
      stopAutoPlay();
      previousSlide();
      restartAutoPlay();
    });

    arrowRight.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      restartAutoPlay();
    });

    // Pausar auto-play al pasar el mouse sobre el carrusel
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoPlay);
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Iniciar auto-play
    startAutoPlay();

    return true;
  }

  function showSlide(index) {
    // Asegurar que el índice esté en el rango válido
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Ocultar todos los slides
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
        slide.style.display = 'grid';
      } else {
        slide.classList.remove('active');
        slide.style.display = 'none';
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambiar cada 5 segundos
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function restartAutoPlay() {
    // Reiniciar auto-play después de 3 segundos de inactividad
    setTimeout(() => {
      startAutoPlay();
    }, 3000);
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initCarousel, 100);
    });
  } else {
    setTimeout(initCarousel, 100);
  }

  // También intentar cuando la ventana termine de cargar
  window.addEventListener('load', () => {
    if (slides.length === 0) {
      setTimeout(initCarousel, 200);
    }
  });
})();
