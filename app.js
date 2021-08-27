const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', flipCard));


let isFlippedCard = false;
let firstCard, secondCard;

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

        checkForMatch();
    }
}


// check if cards match.
const checkForMatch = () => {
    if(firstCard.dataset.mark === secondCard.dataset.mark) {
        console.log('Right Couple');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    else {
        console.log('Wrong Couple');
        setTimeout(() => {
            firstCard.classList.toggle('flipped');
            firstCard.classList.toggle('face-down');
            secondCard.classList.toggle('flipped');
            secondCard.classList.toggle('face-down');
        }, 1200)
    }
}

