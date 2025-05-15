window.addEventListener('DOMContentLoaded', () => {
  const iconeContainer = document.getElementById('icone');
  const span = iconeContainer.querySelector('span');
  const novaDiv = document.getElementById('novaDiv');
  const overlay = document.getElementById('overlay');
  const btnEnvelope = document.getElementById('btn-envelope');
  const navItems = document.querySelectorAll('.nav-item');

  // Anima o ícone ao carregar
  const icone = document.querySelector('.icone-container');
  icone.classList.add('visivel');

  span.addEventListener('mouseenter', () => {
    iconeContainer.classList.add('icone-hover');
  });

  span.addEventListener('mouseleave', () => {
    iconeContainer.classList.remove('icone-hover');
  });

  function abrirNovaDiv() {
    novaDiv.style.display = 'flex';
    setTimeout(() => {
      novaDiv.classList.add('visivel');
    }, 10);
    overlay.classList.add('visivel');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function fecharNovaDiv() {
    novaDiv.classList.remove('visivel');
    overlay.classList.remove('visivel');
    setTimeout(() => {
      novaDiv.style.display = 'none';
    }, 500);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  btnEnvelope.addEventListener('click', (e) => {
    e.preventDefault();
    const aberto = novaDiv.classList.contains('visivel');

    if (!aberto) {
      abrirNovaDiv();
      navItems.forEach(item => item.classList.remove('active'));
      btnEnvelope.classList.add('active');
    } else {
      fecharNovaDiv();
      btnEnvelope.classList.remove('active');
    }
  });

  navItems.forEach(item => {
    if (item !== btnEnvelope) {
      item.addEventListener('click', () => {
        if (novaDiv.classList.contains('visivel')) {
          fecharNovaDiv();
        }
        btnEnvelope.classList.remove('active');
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    }
  });

  overlay.addEventListener('click', () => {
    fecharNovaDiv();
    btnEnvelope.classList.remove('active');
  });

  iconeContainer.addEventListener('click', () => {
    if (!novaDiv.classList.contains('visivel')) {
      abrirNovaDiv();
      navItems.forEach(item => item.classList.remove('active'));
      btnEnvelope.classList.add('active');
    } else {
      fecharNovaDiv();
      btnEnvelope.classList.remove('active');
    }
  });

  // Tornar função acessível globalmente para o link "Contato"
  window.formularioContato = function () {
    abrirNovaDiv();

    navItems.forEach(i => i.classList.remove('active'));

    // Ativa o link "Contato" se ele tiver a classe nav-item
    const contatoLink = document.querySelector('.nav-link.text-light');
    if (contatoLink) {
      contatoLink.classList.add('active');
    }

    // Também ativa o btn-envelope se quiser
    btnEnvelope.classList.add('active');
  };
});
