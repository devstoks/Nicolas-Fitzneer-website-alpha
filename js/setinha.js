document.getElementById('arrow-down').addEventListener('click', function () {
    const target = document.getElementById('icategorias');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // em milissegundos (quanto maior, mais devagar)
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    window.requestAnimationFrame(step);
});