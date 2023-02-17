const cardArray = [ 
    {
        name: 'cherries',
        img: 'img/cherries.png',
    },
    {
        name: 'grapes',
        img: 'img/grapes.png',
    },
    {
        name: 'mango',
        img: 'img/mango.png',
    },
    {
        name: 'peach',
        img: 'img/peach.png',
    },
    {
        name: 'pineapple',
        img: 'img/pineapple.png',
    },
    {
        name: 'watermelon',
        img: 'img/watermelon.png',
    },
    {
        name: 'cherries',
        img: 'img/cherries.png',
    },
    {
        name: 'grapes',
        img: 'img/grapes.png',
    },
    {
        name: 'mango',
        img: 'img/mango.png',
    },
    {
        name: 'peach',
        img: 'img/peach.png',
    },
    {
        name: 'pineapple',
        img: 'img/pineapple.png',
    },
    {
        name: 'watermelon',
        img: 'img/watermelon.png',
    },
]

cardArray.sort(() => Math.random() - 0.5)

const gridDisplay = document.getElementById('grid')
let cardChosen = []
let cardChosenIds = []
const cardWon = []

function createCard() {
    for (let i = 0; i < cardArray.length; i++) {
     const card = document.createElement('img')
     card.setAttribute('src', 'img/cardback.png')
     card.setAttribute('data-id', i)
     card.addEventListener('click', flipCard)
     gridDisplay.appendChild(card)
    }
}
createCard()

function checkMatch() {
    const cards = document.querySelectorAll('img')

    if (cardChosen[0] == cardChosen[1]) {
        console.log('You found a match!')
        cards[cardChosenIds[0]].setAttribute('src', '#')
        cards[cardChosenIds[1]].setAttribute('src', '#')
        cards[cardChosenIds[0]].removeEventListener('click', flipCard)
        cards[cardChosenIds[1]].removeEventListener('click', flipCard)
        cardsWon.push(cardChosen)
} 
    cardChosen = []
    cardChosenIds = []
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardChosenIds.push(cardId)
    console.log(cardChosen)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

flipCard()