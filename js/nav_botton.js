const nav = document.querySelector('nav.bottom-nav'); // sua nav (ajuste o seletor se necessário)
const body = document.body;
const items = document.querySelectorAll('.nav-item');

function checkScrollFim() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Definir o "fim" como estar a menos de 100px do final
  if (scrollTop + windowHeight >= docHeight - 100) {
    // Inverte cores
    body.classList.add('fim-pagina');
    nav.classList.add('nav-preta');
  } else {
    // Volta ao normal
    body.classList.remove('fim-pagina');
    nav.classList.remove('nav-preta');
  }
}

// Gerenciar active da nav
items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

window.addEventListener('scroll', checkScrollFim);
window.addEventListener('load', checkScrollFim);
