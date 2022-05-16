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
let playAgain = document.querySelector(".playAgain");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = { count: 0, p1: 0, p2: 0 };
let clicks = { count: 0, p1: 0, p2: 0 };
let names = getUrlData();
let p1 = names.name1.charAt(0).toUpperCase() + names.name1.slice(1);
let p2 = names.name2.charAt(0).toUpperCase() + names.name2.slice(1);
let score1 = document.querySelector(".scoreBoard1");
let score2 = document.querySelector(".scoreBoard2");
let isPlayerOne = true;
document.addEventListener("DOMContentLoaded", function () {
  congrats.style.display = "none";
  createBoard(board, playCards);
  arrangeCard();
  playAgain.addEventListener("click", replay);
  document.getElementById("p1").innerText = p1;
  document.getElementById("p2").innerText = p2;
  document.querySelector(".p2").setAttribute("id", "");

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
    if (isPlayerOne) {
      cardsWon.count += 1;
      cardsWon.p1 += 1;
      score1.innerHTML = cardsWon.p1;
    } else {
      cardsWon.count += 1;
      cardsWon.p2 += 1;
      score2.innerHTML = cardsWon.p2;
    }
    playCards = removeCards(playCards, cardsSelected[0]);
    board.innerHTML = "";
    createBoard(board, playCards);
    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));

    setTimeout(checkWon, 500);
  } else {
    isPlayerOne = !isPlayerOne;
    imgs[firstCard].setAttribute("src", "pics/back.png");
    imgs[secondCard].setAttribute("src", "pics/back.png");

    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }
  cardsSelected = [];
  cardsId = [];
  clicks.count += 1;

  setTimeout(alterPlayers(isPlayerOne), 500);
}

function checkWon() {
  if (cardsWon.count == cardArray.length / 2) {
    let winner = cardsWon.p1 > cardsWon.p2 ? p1 : p2;
    document.getElementById("winner").innerHTML = `${winner} has won the game!`;
    congrats.style.display = "flex";
  }
}

function replay() {
  arrangeCard();
  board.innerHTML = "";
  createBoard(board, playCards);
  cardsWon.p1 = 0;
  cardsWon.p2 = 0;
  cardsWon.count = 0;
  clicks.count = 0;
  clicks.p1 = 0;
  clicks.p2 = 0;
  isPlayerOne = true;
  congrats.style.display = "none";
  location.reload();
}

function getUrlData() {
  let playersNames = [],
    hash;
  let hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    playersNames[hash[0]] = hash[1];
  }
  return playersNames;
}

function alterPlayers(player) {
  if (player) {
    clicks.p1 += 1;
    document.querySelector(".p1").setAttribute("id", "p1");
    document.querySelector(".clickBoard1").innerHTML = clicks.p1;
    document.querySelector(".p2").setAttribute("id", "");
  } else {
    clicks.p2 += 1;
    document.querySelector(".p2").setAttribute("id", "p2");
    document.querySelector(".clickBoard2").innerHTML = clicks.p2;
    document.querySelector(".p1").setAttribute("id", "");
  }
}
