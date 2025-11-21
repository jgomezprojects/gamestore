const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
const itemsToShow = 4;
const totalItems = document.querySelectorAll('.carousel-item').length;

nextBtn.addEventListener('click', () => {
  index++;
  if (index > totalItems / itemsToShow - 1) index = 0;
  track.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener('click', () => {
  index--;
  if (index < 0) index = totalItems / itemsToShow - 1;
  track.style.transform = `translateX(-${index * 100}%)`;
});

//Movimiento automático cada 5 segundos
setInterval(() => {
  nextBtn.click();
}, 5000);
items.forEach(item => {
  item.addEventListener('click', () => {
    const productId = item.getAttribute('data-id');
    window.location.href = `detalle.html?id=${productId}`;
  });
});
