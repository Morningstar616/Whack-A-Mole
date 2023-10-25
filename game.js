const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp=false;
let score = 0;

function randTime(min,max){
  return Math.round(Math.random() * (max-min) + min);
}

function randHoles(holes){
  const r = Math.floor(Math.random() * holes.length);
  const hole = holes[r];
  if(hole === lastHole){
    console.log("Cant have the same hole");
    return randHoles(holes);
  }
  lastHole=hole;
  return hole;
}

function pop(){
  const time = randTime(200,1000);
  const hole = randHoles(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) pop();
  },time);
}

function startGame(){
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  pop();
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e){
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click',bonk));