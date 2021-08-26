const cards = document.querySelectorAll('.card');

function flipCard() {
    this.classList.toggle('flipped');
    this.classList.toggle('face-down');
}

cards.forEach(card => card.addEventListener('click', flipCard))
