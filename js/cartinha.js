// Seletor das cartas e categorias
const cartasContainer = document.querySelector('.cartas-container');
const galeria = document.querySelector('main');
const ipersonal = document.getElementById('ipessoal');
const iwork = document.getElementById('iwork');
const iprops = document.getElementById('iprops');
let cartasTimeout;
const aboutme = document.getElementById("aboutme");

// Função para verificar se as cartas estão visíveis
function checarCartas() {
    const galeriaTop = galeria.getBoundingClientRect().top;
    const galeriaBottom = galeria.getBoundingClientRect().bottom;
    const aboutmeTop = aboutme.getBoundingClientRect().top;
    const aboutmeBottom = aboutme.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    const galeriaVisivel = galeriaTop < windowHeight && galeriaBottom > 0;
    const aboutmeVisivel = aboutmeTop < windowHeight && aboutmeBottom > 0;

    if (galeriaVisivel && !aboutmeVisivel) {
        if (!cartasContainer.classList.contains('visivel')) {
            clearTimeout(cartasTimeout);
            cartasTimeout = setTimeout(() => {
                cartasContainer.style.bottom = '-250px';
                cartasContainer.style.opacity = '1';
                cartasContainer.classList.add('visivel');
            }, 140);
        }
    } else {
        clearTimeout(cartasTimeout);
        cartasContainer.style.bottom = '-300px';
        cartasContainer.style.opacity = '0';
        cartasContainer.classList.remove('visivel');
    }
}

// Função para alterar as imagens e o texto da categoria
function mudarCategoria(categoria) {
    const categoriaTexto = document.querySelector('#icategorias h1');

    ipersonal.classList.add('esconder');
    iwork.classList.add('esconder');
    iprops.classList.add('esconder');

    ipersonal.classList.remove('mostrar');
    iwork.classList.remove('mostrar');
    iprops.classList.remove('mostrar');

    if (categoria === 'personal') {
        categoriaTexto.textContent = 'Personal';
        ipersonal.classList.remove('esconder');
        ipersonal.classList.add('mostrar');
    } else if (categoria === 'work') {
        categoriaTexto.textContent = 'Work';
        iwork.classList.remove('esconder');
        iwork.classList.add('mostrar');
    } else if (categoria === 'iprops') {
        categoriaTexto.textContent = 'Props';
        iprops.classList.remove('esconder');
        iprops.classList.add('mostrar');
    }
}

// Função para rolar até o título
function rolarParaTitulo() {
    const categoriaTexto = document.querySelector('#icategorias h1');
    const tituloRect = categoriaTexto.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const scrollPosition = tituloRect.top + window.scrollY - (windowHeight / 2) + (tituloRect.height / 2);

    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

// Eventos das cartas
document.querySelector('.carta-1').addEventListener('click', () => {
    mudarCategoria('personal');
    rolarParaTitulo();
});

document.querySelector('.carta-2').addEventListener('click', () => {
    mudarCategoria('work');
    rolarParaTitulo();
});

document.querySelector('.carta-3').addEventListener('click', () => {
    mudarCategoria('iprops');
    rolarParaTitulo();
});

// Eventos da bottom nav
document.getElementById('btn-personal').addEventListener('click', (e) => {
    e.preventDefault();
    mudarCategoria('personal');
    rolarParaTitulo();
});

document.getElementById('btn-work').addEventListener('click', (e) => {
    e.preventDefault();
    mudarCategoria('work');
    rolarParaTitulo();
});

document.getElementById('btn-props').addEventListener('click', (e) => {
    e.preventDefault();
    mudarCategoria('iprops');
    rolarParaTitulo();
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    mudarCategoria('personal');
});

// Listener de scroll para verificar visibilidade das cartas
window.addEventListener('scroll', checarCartas);
window.addEventListener('load', checarCartas);

// Animação categorias conforme desce
document.addEventListener('DOMContentLoaded', () => {
    const blocos = document.querySelectorAll('.bloco');
    const jaApareceu = new Set();

    function verificarBlocos() {
        blocos.forEach((bloco) => {
            const rect = bloco.getBoundingClientRect();
            const visivel = rect.top < window.innerHeight && rect.bottom > 0;

            if (visivel && !jaApareceu.has(bloco)) {
                bloco.classList.add('aparecer');
                jaApareceu.add(bloco);
            }
        });
    }

    window.addEventListener('scroll', verificarBlocos);
    window.addEventListener('load', verificarBlocos);
});
