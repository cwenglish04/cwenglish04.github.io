const noBtn = document.getElementById('noBtn');
let isMoving = false;

// Apply fixed positioning when button needs to move
function activateFixedPosition() {
    noBtn.style.position = 'fixed';
}

// Handle both mouse and touch events
noBtn.addEventListener('mouseenter', () => {
    activateFixedPosition();
    moveButton();
});

// For mobile: when user tries to tap the button
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    activateFixedPosition();
    moveButton();
});

// Desktop: when user tries to click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    activateFixedPosition();
    moveButton();
});

// Also move on focus (keyboard navigation)
noBtn.addEventListener('focus', () => {
    activateFixedPosition();
    moveButton();
});

function moveButton() {
    if (isMoving) return;
    isMoving = true;

    // Get safe boundaries (accounting for button size)
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    const padding = 10;

    const maxX = Math.max(window.innerWidth - buttonWidth - padding, 0);
    const maxY = Math.max(window.innerHeight - buttonHeight - padding, 0);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    setTimeout(() => {
        isMoving = false;
    }, 100);
}

// Easter egg: clicking Yes triggers confetti
document.querySelector('.btn-yes').addEventListener('click', (e) => {
    createConfetti();
});

function createConfetti() {
    const colors = ['#ff6b9d', '#ff85b5', '#c06c84', '#6c5b7b', '#fff'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.innerHTML = ['❤️', '💕', '💖', '💗', '✨'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10vh';
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}