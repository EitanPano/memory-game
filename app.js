const cards = document.querySelectorAll('.card');
const elMenu = document.querySelector('.menu');
const elWin = document.querySelector('.win');
const elBoard = document.querySelector('.board');

const couplesCount = cards.length/2;
let flippedCouplesCount = 0;

const shuffle = (() => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() *12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
    })
})()

const soundCorrect = new Audio('sounds/correct.mp3');
const soundUnflip = new Audio('sounds/unflip.mp3');

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
    flippedCouplesCount++;
    // Check if player finished flipping
    if (couplesCount === flippedCouplesCount){
        elMenu.classList.toggle('hidden');
        elBoard.classList.toggle('transperent');
        let elWinReview = document.querySelector('.winReview');
        let elComplete = document.querySelector('.complete');
        elWinReview.innerText = `Good!`;
        elComplete.classList.remove('hidden');
    }
}

// Wrong card couple flipped, unflip.
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
// Reset all "let" variables
const resetBoard = () => {
    [isFlippedCard, lockBoard] = [true, false];
    [firstCard, secondCard] = [null, null];
}
// shuffle cards and start the game
const playGame = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() *12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
        if (card.classList.contains('flipped')) {
            card.classList.toggle('flipped');
            card.classList.toggle('face-down');
        }
    })
    elMenu.classList.toggle('hidden');
    elBoard.classList.remove('transperent');
    flippedCouplesCount = 0;
}

