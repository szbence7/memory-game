if (addToHomeScreen) {
    document.documentElement.requestFullscreen();
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

function start () {
    gridDisplay.classList.remove("blur")
    resultDisplay.classList.remove("blur")
    restartButton.classList.remove("blur")
    document.querySelector("h2").classList.remove("blur")
    welcome.parentNode.removeChild(welcome)
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

if (cardChosenIds[0] === cardChosenIds[1]) {
    cards[cardChosenIds[0]].setAttribute("src", "img/cardback.png");
    cards[cardChosenIds[1]].setAttribute("src", "img/cardback.png");
    alert("You clicked the same image!");
    cardChosen = [];
    cardChosenIds = [];
}

  if (cardChosen[0] == cardChosen[1]) {
    console.log("You found a match!");
    cards[cardChosenIds[0]].setAttribute("src", "img/bw.png");
    cards[cardChosenIds[1]].setAttribute("src", "img/bw.png");
    cards[cardChosenIds[0]].removeEventListener("click", flipCard);
    cards[cardChosenIds[1]].removeEventListener("click", flipCard);
    cardWon.push(cardChosen);
    console.log(cardWon.length);
    resultDisplay.innerHTML = cardWon.length;
    console.log('You found a match!');
  } else {
    cards[cardChosenIds[0]].setAttribute("src", "img/cardback.png");
    cards[cardChosenIds[1]].setAttribute("src", "img/cardback.png");
    /* alert("Try again!"); */
  }
  cardChosen = [];
  cardChosenIds = [];

  if (cardWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations! You won!";
    document.querySelector('h2').innerHTML = resultDisplay.textContent
    gridDisplay.parentNode.removeChild(gridDisplay);
    fwContainer = document.createElement('div');
    fw = document.createElement('div');
    fw2 = document.createElement('div');
    fwContainer.setAttribute('class', 'pyro');
    fw.setAttribute('class', 'before');
    fw2.setAttribute('class', 'after');
    document.body.appendChild(fwContainer);
    fwContainer.appendChild(fw)
    fwContainer.appendChild(fw2)
  } 
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  console.log(cardChosen);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 400);
  }
}

flipCard();

function restart(){
    window.location.reload();
}