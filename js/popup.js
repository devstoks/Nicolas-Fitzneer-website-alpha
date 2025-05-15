// Pega todas as imagens que têm a classe "imagem-clicavel"
const imagens = document.querySelectorAll('.imagem-clicavel');
const popup = document.getElementById('popup-imagem');
const imagemGrande = document.getElementById('imagem-grande');
const botaoFechar = document.getElementById('fechar-popup');
const rostoInferior = document.getElementById('icone-container');

let isZoomed = false;
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;
let pressStartTime = 0;

// Ao clicar nas imagens
imagens.forEach(img => {
  img.addEventListener('click', function () {
    abrirImagem(this.id);
  });
});

// Função para abrir o popup
function abrirImagem(idImagem) {
  const imagemClicada = document.getElementById(idImagem);
  const estilo = window.getComputedStyle(imagemClicada);
  const backgroundImage = estilo.getPropertyValue('background-image');
  const url = backgroundImage.slice(5, -2); // remove url(" e ")
  imagemGrande.src = url;

  // Exibe o popup e ativa a animação de zoom
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden'; // <html>

  // Remove a classe de animação anterior, força o reflow e adiciona novamente
  imagemGrande.classList.remove('imagem-animada');
  void imagemGrande.offsetWidth; // Força o reflow
  imagemGrande.classList.add('imagem-animada');

  // Impede o zoom enquanto a animação está acontecendo
  setTimeout(() => {
    imagemGrande.classList.remove('imagem-animada'); // Remover a animação
  }, 500); // Tempo da animação: 0.5s
}

// Função para fechar o popup
function fecharImagem() {
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto'; // <html>
  resetarZoom();
}

// Fechar o popup ao pressionar a tecla 'Esc'
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    fecharImagem();
  }
});

// Detectar início do clique
imagemGrande.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return; // apenas botão esquerdo
  pressStartTime = Date.now();

  if (isZoomed) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    imagemGrande.style.cursor = 'grabbing';
    e.preventDefault();
  }
});

// Detectar fim do clique
imagemGrande.addEventListener('mouseup', (e) => {
  if (e.button !== 0) return;
  const pressDuration = Date.now() - pressStartTime;

  if (pressDuration < 150) {
    // Clique rápido: alterna o zoom
    if (!isZoomed) {
      aplicarZoom();
    } else {
      resetarZoom();
    }
  } else {
    // Clique longo: manter posição ao soltar
    if (isDragging && isZoomed) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      currentX += dx;
      currentY += dy;
      imagemGrande.style.transform = `translate(${currentX}px, ${currentY}px) scale(2)`;
      imagemGrande.style.cursor = 'grab';
    }
  }

  isDragging = false;
});

// Movimentar enquanto arrasta
document.addEventListener('mousemove', (e) => {
  if (isDragging && isZoomed) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    imagemGrande.style.transform = `translate(${currentX + dx}px, ${currentY + dy}px) scale(2)`;
  }
});

// Função para aplicar zoom
function aplicarZoom() {
  isZoomed = true;
  imagemGrande.style.transform = `translate(${currentX}px, ${currentY}px) scale(2)`;
  imagemGrande.style.cursor = 'grab';
}

// Função para resetar zoom
function resetarZoom() {
  imagemGrande.style.transform = 'translate(0, 0) scale(1)';
  imagemGrande.style.cursor = 'default';
  isZoomed = false;
  currentX = 0;
  currentY = 0;
}

// Botão de fechar
botaoFechar.addEventListener('click', fecharImagem);
