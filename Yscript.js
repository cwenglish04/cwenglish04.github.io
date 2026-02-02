// Trigger confetti on page load
function createConfetti() {
    const colors = ['#ff6b9d', '#ff85b5', '#c06c84', '#6c5b7b', '#fff'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.innerHTML = ['❤️', '💕', '💖', '💗', '✨', '🎉'][Math.floor(Math.random() * 6)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10vh';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

window.addEventListener('load', createConfetti);