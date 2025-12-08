document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (!track || !nextBtn || !prevBtn) return;

  let index = 0;
  const itemsToShow = 4;
  const totalItems = document.querySelectorAll('.carousel-item').length;
  const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;

  nextBtn.addEventListener('click', () => {
    index++;
    if (index > maxIndex) index = 0;
    track.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
  });

  prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = maxIndex;
    track.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
  });

  // Movimiento automático cada 5 segundos
  setInterval(() => {
    if (nextBtn) nextBtn.click();
  }, 5000);
});
