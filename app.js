// Kommenteld ki vagy töröld ezt a részt fejlesztés közben
/*
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => { console.log('Service Worker Registered'); });
}
*/

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
let cardsWon = [];
resultDisplay.innerHTML = cardsWon.length;
let isProcessing = false;
let startTime;
let moves = 0;
let gameInProgress = false;

// Játékos neve változó
let playerName = null;

// Név kezelő függvények
function savePlayerName(name) {
    if (name && name.trim() !== '') {
        localStorage.setItem('playerName', name.trim());
    }
}

function getPlayerName() {
    return localStorage.getItem('playerName');
}

function start () {
    const playerName = getPlayerName();
    if (playerName) {
        document.querySelector("h2").textContent = `Welcome back, ${playerName}!`;
        setTimeout(() => {
            document.querySelector("h2").textContent = "Matches: 0/8";
        }, 2000);
    }
    
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
        cards[optionOneId].setAttribute("src", "img/cardback.png");
        cards[optionTwoId].setAttribute("src", "img/cardback.png");
        alert("You have clicked the same image!");
    }

    if (cardChosen[0] == cardChosen[1]) {
        cards[optionOneId].setAttribute("src", "img/bw.png");
        cards[optionTwoId].setAttribute("src", "img/bw.png");
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        cardsWon.push(cardChosen);
    } else {
        cards[optionOneId].setAttribute("src", "img/cardback.png");
        cards[optionTwoId].setAttribute("src", "img/cardback.png");
    }
    resultDisplay.textContent = cardsWon.length;

    cardChosen = [];
    cardChosenIds = [];

    if (cardsWon.length === cardArray.length / 2) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const score = calculateScore(cardsWon.length, moves, timeSpent);
        
        let playerName = localStorage.getItem('playerName');
        
        if (!playerName) {
            playerName = prompt("Congratulations! Enter your name for the leaderboard:");
            if (playerName) {
                localStorage.setItem('playerName', playerName);
            }
        }
        
        if (playerName) {
            fetch('save_score.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playerName,
                    score: score,
                    moves: moves,
                    time: timeSpent
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Congratulations ${playerName}! Your rank: ${data.rank}`);
                } else {
                    console.error('Error saving score:', data.error);
                    alert('Failed to save score: ' + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save score. Network error.');
            });
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

function calculateScore(matches, moves, time) {
    const baseScore = matches * 100;
    const movesPenalty = moves * 5;
    const timePenalty = time * 2;
    return Math.max(0, baseScore - movesPenalty - timePenalty);
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