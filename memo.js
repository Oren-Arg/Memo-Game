let cardArray = [
  {
    name: "Apple",
    image:
      "https://i.pinimg.com/564x/db/dd/79/dbdd79e524679fceed9024c486147e36.jpg",
  },
  {
    name: "Apple",
    image:
      "https://i.pinimg.com/564x/db/dd/79/dbdd79e524679fceed9024c486147e36.jpg",
  },
  {
    name: "Fries",
    image:
      "https://www.pinclipart.com/picdir/middle/12-126220_french-fries-fast-food-cartoon-junk-food-potato.png",
  },
  {
    name: "Fries",
    image:
      "https://www.pinclipart.com/picdir/middle/12-126220_french-fries-fast-food-cartoon-junk-food-potato.png",
  },
  {
    name: "Cookie",
    image:
      "https://github.com/Oren-Arg/Memo-Game/blob/main/baker-bakery-cookie-dessert-food-icon-605262.png",
  },
  {
    name: "Cookie",
    image:
      "https://github.com/Oren-Arg/Memo-Game/blob/main/baker-bakery-cookie-dessert-food-icon-605262.png",
  },
  {
    name: "Doughnut",
    image:
      "https://banner2.cleanpng.com/20171216/1f2/donut-png-5a35ec804b2b36.4838824115134833923079.jpg",
  },
  {
    name: "Doughnut",
    image:
      "https://banner2.cleanpng.com/20171216/1f2/donut-png-5a35ec804b2b36.4838824115134833923079.jpg",
  },
  {
    name: "hotdog",
    img: "https://w7.pngwing.com/pngs/516/668/png-transparent-hot-dog-sausage-fast-food-cartoon-cartoon-hot-dog-cartoon-character-barbecue-food-thumbnail.png",
  },
  {
    name: "hotdog",
    img: "https://w7.pngwing.com/pngs/516/668/png-transparent-hot-dog-sausage-fast-food-cartoon-cartoon-hot-dog-cartoon-character-barbecue-food-thumbnail.png",
  },
  {
    name: "Hamburger",
    image:
      "https://png.pngtree.com/png-clipart/20190516/original/pngtree-cute-minimalist-creative-cartoon-hamburger-png-image_4057859.jpg",
  },
  {
    name: "Hamburger",
    image:
      "https://png.pngtree.com/png-clipart/20190516/original/pngtree-cute-minimalist-creative-cartoon-hamburger-png-image_4057859.jpg",
  },
];

let grid = document.querySelector(".grid");
let source = document.querySelector("#source");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;
document.addEventListener("DOMContentLoaded", function () {
  createBoard(grid, cardArray);
  arrangeCard();
  playAgain.addEventListener("click", replay);

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});

function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://png.pngtree.com/png-clipart/20200225/original/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_5280161.jpg"
    );
    img.setAttribute("data-id", index);
    grid.appendChild(img);
  });
}

function arrangeCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

function flipCard() {
  let selected = this.dataset.id;
  let clicked = cardArray[selected].name;
  cardsSelected.push(clicked);

  cardsId.push(selected);
  this.classList.add("flip");
  this.setAttribute("src", cardArray[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    alert("you have found a match");
    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon, 500);
  } else {
    imgs[firstCard].setAttribute(
      "src",
      "https://png.pngtree.com/png-clipart/20200225/original/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_5280161.jpg"
    );
    imgs[secondCard].setAttribute(
      "src",
      "https://png.pngtree.com/png-clipart/20200225/original/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_5280161.jpg"
    );
    alert("wrong, please try again");

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
    alert("You won");
    setTimeout(() => (popup.style.display = "flex"), 300);
  }
}

function replay() {
  arrangeCard();
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  cardsWon = 0;
  clicks = 0;
  clickBoard.innerHTML = 0;
  scoreBoard.innerHTML = 0;
  popup.style.display = "none";
}
