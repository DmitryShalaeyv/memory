"use strict";

Array.prototype.shuffle = function() {
  if(this.length == 1) return this;
  for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
};

const deck = ["6_BUB.gif", "7_BUB.gif", "8_BUB.gif", "9_BUB.gif", "10_BUB.gif", "A_BUB.gif", "J_BUB.gif", "K_BUB.gif", "Q_BUB.gif", "6_CH.gif", "7_CH.gif", "8_CH.gif", "9_CH.gif", "10_CH.gif", "A_CH.gif", "J_CH.gif", "K_CH.gif", "Q_CH.gif", "6_PIK.gif", "7_PIK.gif", "8_PIK.gif", "9_PIK.gif", "10_PIK.gif", "A_PIK.gif", "J_PIK.gif", "K_PIK.gif", "Q_PIK.gif", "6_TREF.gif", "7_TREF.gif", "8_TREF.gif", "9_TREF.gif", "10_TREF.gif", "A_TREF.gif", "J_TREF.gif", "K_TREF.gif", "Q_TREF.gif"];

const VISIBLE_TIME = 3000;
const VISIBLE_DECK_TIME = 3000;
const CARD_HEIGHT = 96;
const CARD_WIDTH = 71;
const NUM_CARDS = 16;
const IMG_PATH = "img/";
const CARD_BACK = IMG_PATH + "1COVER.gif";
let wrong = 0;
let lastClicked = null;
let cards = [];

function arrVarible(arr) {
  const arrVar = [];
  for(let i = 0; i < NUM_CARDS / 2; i++) {
    arrVar.push(arr[i]);
  }
  return arrVar;
}

function newGame() {
  document.getElementById("box").innerHTML = "";
  wrong = 0;
  window.document.getElementById("wrong").innerHTML = 0;
  const clon = [...deck];
  const arrSh = clon.shuffle();
  const arrV = arrVarible(arrSh);
  const arrDub = [...arrV, ...arrV];
  cards = arrDub.shuffle();

  const box = document.getElementById("box");
  let img = null;
  for(let i = 1; i <= NUM_CARDS; i++) {
      img = document.createElement("img");
      img.width = CARD_WIDTH;
      img.height = CARD_HEIGHT;
      img.addEventListener("click", cardClicked);
      img.alt = i;
      box.appendChild(img);
  }

  const imgs = window.document.getElementsByTagName("img");
  for(let i = 0; i < imgs.length; i++) {
    imgs[i].src = IMG_PATH + cards[i];
  }
  setTimeout(() => {
    for(let i = 0; i < imgs.length; i++) {
      imgs[i].src = CARD_BACK;
    }
  }, VISIBLE_DECK_TIME);
}

function cardClicked(elem) {
  //if(elem.currentTarget.src == CARD_BACK) return;
   let ClickedNumber = elem.target.alt;
   elem.target.src = IMG_PATH + cards[ClickedNumber - 1];
  if(lastClicked == null) {
    lastClicked = elem.target;
    if(elem.target.src == lastClicked.src) return;
  }
  if(elem.target.src !== lastClicked.src) {
    wrong++;
    window.document.getElementById("wrong").innerHTML = wrong;
    let tmp = lastClicked;
    let img = elem.target;
    setTimeout(function() {
      img.src = CARD_BACK;
      tmp.src = CARD_BACK;
    }, VISIBLE_TIME);
    
  }
  lastClicked = null;
  
  if(elem.target.src != CARD_BACK) return;
}

// const box = document.getElementById("box");
// let img = null;

// for(let i = 1; i <= NUM_CARDS; i++) {
//   img = document.createElement("img");
//   img.width = CARD_WIDTH;
//   img.height = CARD_HEIGHT;
//   img.addEventListener("click", cardClicked);
//   img.alt = i;
//   box.appendChild(img);
// }

window.document.getElementById("new").addEventListener("click", newGame);
//newGame();
