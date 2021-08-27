const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', flipCard));


let isFlippedCard = false;
let secondCard, firstCard;

function flipCard() {
    this.classList.toggle('flipped');
    this.classList.toggle('face-down');
    
    if(!isFlippedCard) {
        // first click
        isFlippedCard = true;
        firstCard = this;
    }
    else {
        // second click
        isFlippedCard = false;
        secondCard = this;

        // check if cards match.
        console.log({firstCard, secondCard});
    }
}

