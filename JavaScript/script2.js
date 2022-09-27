const body = document.querySelector('body');
const mouth = document.getElementById('mouth')
const leftEye = document.getElementById('innerLeft');
const rightEye = document.getElementById('innerRight');
let winHeight = window.innerHeight;
let winWidth = window.innerWidth;

let color = 
    [{background: '#ee6055',},
    {background: '#60d394',},
    {background: '#aaf683',},
    {background: '#ffd97d'},
    {background: '#ff9b85'}];
let colorTiming=    {
            duration: 8000,
            iterations: Infinity,
        }


let sadMouth =  [
            {transform: 'rotateX(180deg)',transformOrigin: '50% 80%',},
    ]
let sadLeftEye = [
            {transform: 'translate(4px,3px)'},
        ]
let sadRightEye=[
            {transform: 'translate(-4px,3px)'},
        ]
let sadTiming = {
            duration: 2500,
            fill: 'forwards',
        }

let sadLeft = leftEye.animate(sadLeftEye,sadTiming);
let sadRight = rightEye.animate(sadRightEye,sadTiming);
let turnSad = mouth.animate(sadMouth,sadTiming);
let colorChange = body.animate(color,colorTiming);



colorChange.play();
turnSad.play();
sadLeft.play();
sadRight.play();

window.addEventListener('click',reverseAni);
function reverseAni(){
    sadLeft.reverse();
    turnSad.reverse();
    sadRight.reverse();
}