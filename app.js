const cards = document.querySelectorAll('.card');
const elMenu = document.querySelector('.menu');
const elWin = document.querySelector('.win');
const elBoard = document.querySelector('.board');

let elPlayerName = document.querySelector('.p-name');
let elPlayerTime = document.querySelector('.p-time');
let lastPlayer;
let elInput = document.querySelector('#name-input');

const couplesCount = cards.length / 2;
let flippedCouplesCount = 0;

let isTimeStart = false;
let tens = 00;
let seconds = 00; 
let minutes = 00;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let Interval;

const soundCorrect = new Audio('sounds/correct.mp3');
const soundUnflip = new Audio('sounds/unflip.mp3');

let isFlippedCard = true;
let lockBoard = false;
let firstCard, secondCard;

const shuffle = (() => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
    })
})()

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (!isTimeStart) {
        console.log('Timer Started');
        isTimeStart = true;
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10); 
    }
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
    checkForWin();
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
        let randomPos = Math.floor(Math.random() * 12);
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

    savePlayer();
    resetTimer();
}

const LoadLastPlayer = (() => {
    if (localStorage.getItem('last_player') != null) {
        let lastPlayer = localStorage.getItem('last_player');
        console.log(`Hello ${lastPlayer} :)`);
        elPlayerName.innerText = lastPlayer;
        elInput.value = lastPlayer;
    }
})()

const savePlayer = () => {
    let newPlayer = elInput.value;
    if (newPlayer.length === 0) {
        newPlayer = 'Player-1';
        console.log(`${newPlayer} is the default name`)
    } 
    if (localStorage.getItem('player_list') === null) {
        localStorage.setItem('player_list', '[]');
    }
    let playerList = JSON.parse(localStorage.getItem('player_list'));
    if (!playerList.includes(newPlayer)) {
        playerList.push(newPlayer);
        console.log(playerList);
    }
    localStorage.setItem('player_list', JSON.stringify(playerList));
    elPlayerName.innerHTML = newPlayer;
    lastPlayer = newPlayer;
    localStorage.setItem('last_player', lastPlayer);
}

const checkForWin = () => {
    if (couplesCount === flippedCouplesCount) {
        isTimeStart = false;
        stopTimer();
        console.log('Timer Stopped');
        elMenu.classList.toggle('hidden');
        elBoard.classList.toggle('transperent');
        let elWinReview = document.querySelector('.win-review');
        const elComplete = document.querySelector('.switch-player');
        const playBtn = document.querySelector('.play-btn');

        elWinReview.innerText = `Good!`;
        elComplete.classList.remove('hidden');
        playBtn.innerText = 'Play Again';
    }
}

const startTimer = () => {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
}

const stopTimer = () => {
    clearInterval(Interval);
}

const resetTimer = () => {
    tens = "00";
    seconds = "00";
    minutes = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
}


