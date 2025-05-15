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
  }

  function fecharNovaDiv() {
    novaDiv.classList.remove('visivel');
    overlay.classList.remove('visivel');
    document.body.style.overflow = '';
    setTimeout(() => {
      novaDiv.style.display = 'none';
    }, 500);
  }

  // Função para abrir ou fechar e gerenciar classe active do botão envelope
  btnEnvelope.addEventListener('click', (e) => {
    e.preventDefault();
    const aberto = novaDiv.classList.contains('visivel');

    if (!aberto) {
      // Abre o formulário
      abrirNovaDiv();
      // Remove active de todos os itens nav
      navItems.forEach(item => item.classList.remove('active'));
      // Adiciona active no envelope
      btnEnvelope.classList.add('active');
    } else {
      // Fecha o formulário
      fecharNovaDiv();
      // Remove active do envelope
      btnEnvelope.classList.remove('active');
    }
  });

  // Quando clicar em outros itens da nav, remove active do envelope
  navItems.forEach(item => {
    if(item !== btnEnvelope) {
      item.addEventListener('click', () => {
        // Fecha a div e overlay se estiver aberto
        if (novaDiv.classList.contains('visivel')) {
          fecharNovaDiv();
        }
        // Remove active do envelope e deste item antigo
        btnEnvelope.classList.remove('active');

        // Remove active de todos e coloca só no clicado
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    }
  });

  // Clicar no overlay fecha tudo e remove active do envelope
  overlay.addEventListener('click', () => {
    fecharNovaDiv();
    btnEnvelope.classList.remove('active');
  });

  // Clique no iconeContainer também pode abrir/fechar a div (se quiser manter)
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
});
