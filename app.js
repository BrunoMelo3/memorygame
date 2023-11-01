document.addEventListener('DOMContentLoaded', () => {

  const fst = `sounds/faustao-errou.mp3`;
  const ss = `sounds/silvio-santos-certa-resposta.mp3`;
  const ml = `sounds/milton-leite-que-beleza.mp3`;
  const pb = `sounds/vou-resumir-com-duas-palavras-para-bens.mp3`;

  const audioSS = new Audio(ss);
  const audioFST = new Audio(fst);
  const audioML = new Audio(ml);
  const audioPB = new Audio(pb);

  //list all card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const errorDisplay = document.querySelector('#error')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let cardsError = []

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      audioML.play()
      alert('Você clicou na mesma imagem!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      audioSS.play()
      alert('Você encontrou uma correspondência!')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      cardsError.push(cardsChosen)
      audioFST.play()
      alert('Não foi dessa vez, tente novamente!')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    errorDisplay.textContent = cardsError.length
    if  (cardsWon.length === cardArray.length/2) {
      const percent = Number(cardsWon.length/(cardsError.length+cardsWon.length)).toLocaleString('pt-BR',{style: 'percent', maximumFractionDigits:2})
      resultDisplay.textContent = `${cardsWon.length}! Parabéns, você encontrou todos! Seu aproveitamento foi de ${percent}.`
      audioPB.play()
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
