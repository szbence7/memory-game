if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => { console.log('Service Worker Registered'); });
}

const cardArray = [
  {
    name: "cherries",
    img: "img/cherries.png",
  },
  {
    name: "grapes",
    img: "img/grapes.png",
  },
  {
    name: "mango",
    img: "img/mango.png",
  },
  {
    name: "peach",
    img: "img/peach.png",
  },
  {
    name: "pineapple",
    img: "img/pineapple.png",
  },
  {
    name: "watermelon",
    img: "img/watermelon.png",
  },
  {
    name: "cherries",
    img: "img/cherries.png",
  },
  {
    name: "grapes",
    img: "img/grapes.png",
  },
  {
    name: "mango",
    img: "img/mango.png",
  },
  {
    name: "peach",
    img: "img/peach.png",
  },
  {
    name: "pineapple",
    img: "img/pineapple.png",
  },
  {
    name: "watermelon",
    img: "img/watermelon.png",
  },
];

cardArray.sort(() => Math.random() - 0.5);

const blur = document.querySelector(".blur");
const gridDisplay = document.getElementById("grid");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("restart");
const welcome = document.getElementById("welcome");
let cardChosen = [];
let cardChosenIds = [];
const cardWon = [];
resultDisplay.innerHTML = cardWon.length;
let isProcessing = false;
let startTime;
let moves = 0;
let gameInProgress = false;

function start () {
    gridDisplay.classList.remove("blur")
    resultDisplay.classList.remove("blur")
    restartButton.classList.remove("blur")
    document.querySelector("h2").classList.remove("blur")
    welcome.parentNode.removeChild(welcome)
    startTime = Date.now();
    gameInProgress = true;
}

function createCard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/cardback.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
    gridDisplay.classList.add("blur")
    resultDisplay.classList.add("blur")
    restartButton.classList.add("blur")
    document.querySelector("h2").classList.add("blur")
  }
}
createCard();

function checkMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1];

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute("src", "img/blank.png");
        cards[optionTwoId].setAttribute("src", "img/blank.png");
        alert("You have clicked the same image!");
    }

    if (cardChosen[0] == cardChosen[1]) {
        cards[optionOneId].setAttribute("src", "img/white.png");
        cards[optionTwoId].setAttribute("src", "img/white.png");
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardWon.push(cardChosen);
    } else {
        cards[optionOneId].setAttribute("src", "img/blank.png");
        cards[optionTwoId].setAttribute("src", "img/blank.png");
    }
    resultDisplay.textContent = cardWon.length;

    cardChosen = [];
    cardChosenIds = [];

    if (cardWon.length === cardArray.length / 2) {
        const gameStats = calculateScore();
        const playerName = prompt("Congratulations! Enter your name for the leaderboard:");
        if (playerName) {
            saveScore(playerName, gameStats);
        }
    }
}

function flipCard() {
  if (isProcessing || 
      this.getAttribute("data-id") === cardChosenIds[0] || 
      cardChosen.length >= 2) {
    return;
  }

  moves++;

  const cardId = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);

  if (cardChosen.length === 2) {
    isProcessing = true;
    setTimeout(() => {
      checkMatch();
      isProcessing = false;
    }, 400);
  }
}

function calculateScore() {
    const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
    const baseScore = 1000;
    const movesPenalty = moves * 10;
    const timePenalty = timeInSeconds;
    
    let bonusPoints = 0;
    if (moves === cardArray.length) {
        bonusPoints += 500;
    }
    if (timeInSeconds < 30) {
        bonusPoints += 300;
    }

    const finalScore = Math.max(0, baseScore - movesPenalty - timePenalty + bonusPoints);
    return {
        score: finalScore,
        moves: moves,
        time: timeInSeconds,
        date: new Date().toISOString()
    };
}

function saveScore(playerName, gameStats) {
    if (!playerName.trim()) {
        alert("Please enter your name!");
        return;
    }

    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playerName,
            score: gameStats.score,
            moves: gameStats.moves,
            time: gameStats.time
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Congratulations! You're ranked #${data.rank} on the leaderboard!`);
        } else {
            alert('Failed to save score. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save score. Please try again.');
    });
}

function restart(){
    window.location.reload();
}