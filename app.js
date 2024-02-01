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

    const Err = `sounds/joker-laugh.mp3`;
    const Corr = `sounds/u-are-correct-sir.mp3`;
    const Eqq = `sounds/pica-pau.mp3`;
    const pb = `sounds/katchau.mp3`;

    const audioCorr = new Audio(Corr);
    const audioErr = new Audio(Err);
    const audioEqq = new Audio(Eqq);
    const audioPB = new Audio(pb);

    //list all card options
    const cardArray = [
      {
        name: 'A',
        img: 'images/A.jpg',
        attb: "0",
        effect: true
      },
      {
        name: 'B',
        img: 'images/B.jpg',
        attb: "0",
        effect: true
      },
      {
        name: 'C',
        img: 'images/C.jpg',
        attb: "1",
        effect: true
      },
      {
        name: 'D',
        img: 'images/D.jpg',
        attb: "1",
        effect: true
      },
      {
        name: 'E',
        img: 'images/E.jpg',
        attb: "2",
        effect: true
      },
      {
        name: 'F',
        img: 'images/F.jpg',
        attb: "2",
        effect: true
      },
      {
        name: 'A',
        img: 'images/G.jpg',
        attb: "3",
        effect: true
      },
      {
        name: 'B',
        img: 'images/H.jpg',
        attb: "3",
        effect: true
      },
      {
        name: 'C',
        img: 'images/I.jpg',
        attb: "4",
        effect: true
      },
      {
        name: 'D',
        img: 'images/J.jpg',
        attb: "4",
        effect: true
      },
      {
        name: 'E',
        img: 'images/K.jpg',
        attb: "5",
        effect: true
      },
      {
        name: 'F',
        img: 'images/L.jpg',
        attb: "5",
        effect: true
      },
      {
        name: 'G',
        img: 'images/M.jpg',
        attb: "6",
        effect: true
      },
      {
        name: 'H',
        img: 'images/N.jpg',
        attb: "6",
        effect: true
      },
      {
        name: 'I',
        img: 'images/O.jpg',
        attb: "7",
        effect: true
      },
      {
        name: 'G',
        img: 'images/P.jpg',
        attb: "7",
        effect: true
      },
      {
        name: 'H',
        img: 'images/Q.jpg',
        attb: "8",
        effect: true
      },
      {
        name: 'I',
        img: 'images/R.jpg',
        attb: "8",
        effect: true
      },
      {
        name: 'J',
        img: 'images/S.jpg',
        attb: "9",
        effect: true
      },
      {
        name: 'K',
        img: 'images/T.jpg',
        attb: "9",
        effect: true
      },
      {
        name: 'L',
        img: 'images/U.jpg',
        attb: "10",
        effect: true
      },
      {
        name: 'J',
        img: 'images/V.jpg',
        attb: "10",
        effect: true
      },
      {
        name: 'K',
        img: 'images/W.jpg',
        attb: "11",
        effect: true
      },
      {
        name: 'L',
        img: 'images/X.jpg',
        attb: "11",
        effect: true
      }
    ];

    const texts = [
      "Você clicou na mesma imagem!",
      "Você encontrou uma correspondência!",
      "Não foi dessa vez, tente novamente!",
      "! Parabéns, você encontrou todos! Seu aproveitamento foi de"
    ];

    if (value == "1") {
      //grid.style.maxWidth = "440px";
      cardArray.splice(12, 12);
    } else if (value == "2") {
      //grid.style.maxWidth = "660px";
      cardArray.splice(18, 6);
    } else if (value == "3") {
      //grid.style.maxWidth = "880px";
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
        card.setAttribute('src', 'images/Y.jpg')
        card.setAttribute('data-id', i)

        card.addEventListener('click', flipCard)
        card.addEventListener('mouseover', () => addEffect(i));
        card.addEventListener('mouseout', () => removeEffect(i));
        grid.appendChild(card)
        if (value == "1") {
          card.width = 138;
          card.height = 138;
          grid.style.maxWidth = "1000px";
        } else if (value == "2") {
          card.width = 115;
          card.height = 115;
          grid.style.maxWidth = "1200px";
        } else if (value == "3") {
          card.width = 90;
          card.height = 90;
          grid.style.maxWidth = "800px";
        }
      }

    }

    const addEffect = (cardId) => {

      if (cardArray[cardId].effect == true) {
        const card = document.querySelector(`[data-id="${cardId}"]`);
        card.classList.add("active");
      }
    }

    const removeEffect = (cardId) => {
      const card = document.querySelector(`[data-id="${cardId}"]`);
      card.classList.remove("active");
    }

    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/Y.jpg')
        cards[optionTwoId].setAttribute('src', 'images/Y.jpg')
        audioEqq.play()

        const divMessage = document.querySelector(".alert");
        const msg = texts[0];

        function messactivate(msg) {
          const message = document.createElement("div");
          message.classList.add("messageeq");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        messactivate(msg);
        removeEffect(optionOneId);
        removeEffect(optionTwoId);

      }
      else if (cardsChosen[0] === cardsChosen[1]) {


        const divMessage = document.querySelector(".alert");
        const msg = texts[1];

        function messactivate(msg) {
          const message = document.createElement("div");
          message.classList.add("messageacer");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        messactivate(msg);

        cards[optionOneId].setAttribute('src', 'images/Z.png');
        cards[optionTwoId].setAttribute('src', 'images/Z.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        cardArray[optionOneId].effect = false;
        cardArray[optionTwoId].effect = false;
        removeEffect(optionOneId);
        removeEffect(optionTwoId);

        cardsWon.push(cardsChosen)

        if (cardsWon.length != cardArray.length / 2) {
          audioCorr.play()
        }

      } else {
        cards[optionOneId].setAttribute('src', 'images/Y.jpg')
        cards[optionTwoId].setAttribute('src', 'images/Y.jpg')
        cardsError.push(cardsChosen)
        audioErr.play()

        const divMessage = document.querySelector(".alert");
        const msg = texts[2];

        function messactivate(msg) {
          const message = document.createElement("div");
          message.classList.add("messageerr");
          message.innerText = msg;
          divMessage.appendChild(message);

          setTimeout(() => {
            message.style.display = "none";
          }, 2000);
        }

        messactivate(msg);
        removeEffect(optionOneId);
        removeEffect(optionTwoId);

      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      errorDisplay.textContent = cardsError.length

      if (cardsWon.length === cardArray.length / 2) {
        const percent = Number(cardsWon.length / (cardsError.length + cardsWon.length)).toLocaleString('pt-BR', { style: 'percent', maximumFractionDigits: 2 })
        resultDisplay.textContent = `${cardsWon.length}${texts[3]} ${percent}.`

        document.querySelector(".grid").innerHTML = "";

        grid.style.justifyContent = "center";
        grid.style.alignItems = "center";
        const card = document.createElement('img')
        card.setAttribute('src', 'images/congratulations.gif')
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
      cardsChosen.push(cardArray[cardId].attb)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
      }
    }

    createBoard()
  }
}

