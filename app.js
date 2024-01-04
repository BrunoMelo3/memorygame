function updateSelect() {

  let select = document.querySelector('#level');
  let optionValue = select.options[select.selectedIndex];
  let value = optionValue.value;
  document.querySelector(".grid").innerHTML = "";
  const resultDisplay = document.querySelector('#result');
  const errorDisplay = document.querySelector('#error');
  resultDisplay.textContent = "";
  errorDisplay.textContent = "";

  const grid = document.querySelector('.grid')

  if (value != "0") {

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
        name: 'A',
        img: 'images/A.JPG'
      },
      {
        name: 'B',
        img: 'images/B.JPG'
      },
      {
        name: 'C',
        img: 'images/C.JPG'
      },
      {
        name: 'D',
        img: 'images/D.JPG'
      },
      {
        name: 'E',
        img: 'images/E.JPG'
      },
      {
        name: 'F',
        img: 'images/F.JPG'
      },
      {
        name: 'A',
        img: 'images/A.JPG'
      },
      {
        name: 'B',
        img: 'images/B.JPG'
      },
      {
        name: 'C',
        img: 'images/C.JPG'
      },
      {
        name: 'D',
        img: 'images/D.JPG'
      },
      {
        name: 'E',
        img: 'images/E.JPG'
      },
      {
        name: 'F',
        img: 'images/F.JPG'
      },
      {
        name: 'G',
        img: 'images/G.JPG'
      },
      {
        name: 'H',
        img: 'images/H.JPG'
      },
      {
        name: 'I',
        img: 'images/I.JPG'
      },
      {
        name: 'G',
        img: 'images/G.JPG'
      },
      {
        name: 'H',
        img: 'images/H.JPG'
      },
      {
        name: 'I',
        img: 'images/I.JPG'
      },
      {
        name: 'J',
        img: 'images/J.JPG'
      },
      {
        name: 'K',
        img: 'images/K.JPG'
      },
      {
        name: 'L',
        img: 'images/L.JPG'
      },
      {
        name: 'J',
        img: 'images/J.JPG'
      },
      {
        name: 'K',
        img: 'images/K.JPG'
      },
      {
        name: 'L',
        img: 'images/L.JPG'
      }
    ];

    const texts = [
      "Você clicou na mesma imagem!",
      "Você encontrou uma correspondência!",
      "Não foi dessa vez, tente novamente!",
      "! Parabéns, você encontrou todos! Seu aproveitamento foi de"
    ];

    if (value == "1") {
      grid.style.width = "500px";
      cardArray.splice(12, 12);

    } else if (value == "2") {
      grid.style.width = "700px";
      cardArray.splice(18, 6);

    } else if (value == "3") {
      grid.style.width = "900px";

    }

    cardArray.sort(() => 0.5 - Math.random())

    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    let cardsError = []

    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.JPG')
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

      if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.JPG')
        cards[optionTwoId].setAttribute('src', 'images/blank.JPG')
        audioML.play()

        const divMessage = document.querySelector(".alert");
        const msg = texts[0];

        function ativar(msg) {
          const message = document.createElement("div");
          message.classList.add("messageeq");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        ativar(msg);

      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        audioSS.play()

        const divMessage = document.querySelector(".alert");
        const msg = texts[1];

        function ativar(msg) {
          const message = document.createElement("div");
          message.classList.add("messageacer");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        ativar(msg);

        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'images/blank.JPG')
        cards[optionTwoId].setAttribute('src', 'images/blank.JPG')
        cardsError.push(cardsChosen)
        audioFST.play()

        const divMessage = document.querySelector(".alert");
        const msg = texts[2];

        function ativar(msg) {
          const message = document.createElement("div");
          message.classList.add("messageerr");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        ativar(msg);

      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      errorDisplay.textContent = cardsError.length
      if (cardsWon.length === cardArray.length / 2) {
        const percent = Number(cardsWon.length / (cardsError.length + cardsWon.length)).toLocaleString('pt-BR', { style: 'percent', maximumFractionDigits: 2 })
        resultDisplay.textContent = `${cardsWon.length}${texts[3]} ${percent}.`

        document.querySelector(".grid").innerHTML = "";

        grid.style.width = "710px";
        const card = document.createElement('img')
        card.setAttribute('src', 'images/congratulations.jpg')
        card.setAttribute('data-id', 0)
        grid.appendChild(card)

        let canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 1100;
        let container = document.getElementsByClassName("button-wrapper")[0];
        container.appendChild(canvas);

        let confetti_button = confetti.create(canvas);
        confetti_button({
          particleCount: 200,
          spread: 200,
          startVelocity: 15,
          scalar: 0.9,
          ticks: 200
        }).then(() => container.removeChild(canvas));

        audioPB.play()
      }
    }

    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
      }
    }

    createBoard()
  }
}
atualizouSelect()
