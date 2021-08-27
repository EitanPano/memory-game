const cards = document.querySelectorAll('.card');

const shuffle = (() => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() *12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
    })
})()

let soundCorrect = new Audio('sounds/correct.mp3');
let soundUnflip = new Audio('sounds/unflip.mp3');

let isFlippedCard = true;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.toggle('flipped');
    this.classList.toggle('face-down');

    if (isFlippedCard) {
        // first card click
        isFlippedCard = false;
        firstCard = this;

        return;
    }
    // second card click
    isFlippedCard = true;
    secondCard = this;

    checkForMatch();
}

// check if cards match.
const checkForMatch = () => {
    const isMatch = firstCard.dataset.mark === secondCard.dataset.mark;

    isMatch ? disableCards() : unflipCards();
}

// Cards match, disable them
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    soundCorrect.play();
    resetBoard();
}

// Wrong couple flipped, unflip.
const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.toggle('flipped');
        firstCard.classList.toggle('face-down');
        secondCard.classList.toggle('flipped');
        secondCard.classList.toggle('face-down');

        soundUnflip.play();
        resetBoard();
    }, 1200)
}

const resetBoard = () => {
    [isFlippedCard, lockBoard] = [true, false];
    [firstCard, secondCard] = [null, null];
}

