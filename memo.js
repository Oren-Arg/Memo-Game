const cardArray = [
  {
    name: "Western Wall",
    img: "./pics/westernwall.jpg",
  },
  {
    name: "Western Wall",
    img: "./pics/westernwall.jpg",
  },
  {
    name: "TajMahal",
    img: "./pics/tajmahal.jpg",
  },
  {
    name: "TajMahal",
    img: "./pics/tajmahal.jpg",
  },
  {
    name: "Bahai",
    img: "./pics/bahai.jpg",
  },
  {
    name: "Bahai",
    img: "./pics/bahai.jpg",
  },
  {
    name: "GoldenBridge",
    img: "./pics/goldenbridge.jpg",
  },
  {
    name: "GoldenBridge",
    img: "./pics/goldenbridge.jpg",
  },
  {
    name: "GrandCanyon",
    img: "./pics/grandcanyon.jpg",
  },
  {
    name: "GrandCanyon",
    img: "./pics/grandcanyon.jpg",
  },
  {
    name: "Georgia",
    img: "pics/georgia.jpg",
  },
  {
    name: "Georgia",
    img: "pics/georgia.jpg",
  },
  {
    name: "Deadsea",
    img: "pics/deadsea.jpg",
  },
  {
    name: "Deadsea",
    img: "pics/deadsea.jpg",
  },
];

let playCards = cardArray;
let matches = document.querySelector(".matches");
let congrats = document.querySelector(".congrats");
let board = document.querySelector(".board");
let scoreBoard = document.querySelector(".scoreBoard");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;
document.addEventListener("DOMContentLoaded", function () {
  congrats.style.display = "none";
  createBoard(board, playCards);
  arrangeCard();
  playAgain.addEventListener("click", replay);

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});

function createBoard(board, array) {
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute("class", "board-card");
    img.setAttribute("src", "pics/back.png");
    img.setAttribute("data-id", index);
    board.appendChild(img);
  });
}

function matchedBoard(card) {
  let matchCard = document.createElement("img");
  matchCard.setAttribute("class", "matchedboard-card");
  matchCard.setAttribute("src", card.img);
  matchCard.setAttribute("name", card.name);
  matches.appendChild(matchCard);
}

function arrangeCard() {
  playCards.sort(() => 0.5 - Math.random());
}

function flipCard() {
  let selected = this.dataset.id;
  let clicked = playCards[selected].name;
  cardsSelected.push(clicked);
  cardsId.push(selected);
  this.classList.add("flip");

  this.setAttribute("src", playCards[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function removeCards(arr, cardToRemove) {
  for (card of arr) {
    if (card.name == cardToRemove) {
      matchedBoard(card);
      break;
    }
  }
  return arr.filter((el) => el.name != cardToRemove);
}

function checkForMatch() {
  let imgs = document.querySelectorAll("img.board-card");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    playCards = removeCards(playCards, cardsSelected[0]);
    board.innerHTML = "";
    createBoard(board, playCards);
    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));

    setTimeout(checkWon, 500);
  } else {
    imgs[firstCard].setAttribute("src", "pics/back.png");
    imgs[secondCard].setAttribute("src", "pics/back.png");

    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }
  cardsSelected = [];
  cardsId = [];
  clicks += 1;
  clickBoard.innerHTML = clicks;
}

function checkWon() {
  if (cardsWon == cardArray.length / 2) {
    congrats.style.display = "flex";
  }
}

function replay() {
  arrangeCard();
  board.innerHTML = "";
  createBoard(board, playCards);
  cardsWon = 0;
  clicks = 0;
  clickBoard.innerHTML = 0;
  scoreBoard.innerHTML = 0;
  congrats.style.display = "none";
  location.reload();
}
