const body = document.querySelector('body');
displayHeight = () => body.style.height = window.innerHeight + 'px';
displayWidth = () => body.style.width = window.innerWidth + 'px';

const leftEye = document.getElementById('innerLeft');
const rightEye = document.getElementById('innerRight');
const movingChar = document.getElementById('movingChar');
const note2= document.getElementById('note2');
const mouth =  document.getElementById("mouth");
const title =  document.getElementById("title");
const audio = new Audio("music.mp3");
window.addEventListener('pointermove', getPosition);
window.addEventListener('pointermove', function() {
    audio.play();
  });
window.addEventListener('pointerdown', getPosition);
window.addEventListener('click',changePage);

function animation(){
    mouth.setAttribute("d",)
}
function updateWidth(){
    width = document.body.clientWidth;
    height = document.body.clientHeight;
}
function getPosition(event) {
    let xPos = event.clientX;
    let yPos = event.clientY;
    let eyeX = (xPos/window.innerWidth) * 8 + 11; 
    let eyeY = (yPos/window.innerHeight) * 9 + 8; 
    leftEye.setAttribute('cx',eyeX);
    leftEye.setAttribute('cy',eyeY);
    rightEye.setAttribute('cy',25-eyeY);
    rightEye.setAttribute('cx',eyeX + 65);
    movingChar.style.left = xPos - 14;
    movingChar.style.top = yPos;
    note2.style.left = -xPos + window.innerWidth;
    note2.style.top = yPos/10+20;
    body.style.backgroundColor=("hsl(" + xPos/10 + ", 50%, 70%)")
    title.setAttribute('fill',("hsl(" + xPos/10 + ", 70%, 40%)"));
}
function changePage(){
    window.location.href = "animation.html";
}