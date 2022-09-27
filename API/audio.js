const canvas = document.getElementById('canvas');
const circle = document.getElementById('circles');
const words = document.querySelector('h1');
const intro = document.querySelector('.intro');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    audioContext = window.AudioContext || window.webkitAudioContext;
	context = new audioContext(); 
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
	liveSource = context.createMediaStreamSource(stream); 
    var levelChecker = context.createScriptProcessor(4096,1,1); 
    liveSource.connect(levelChecker); 
    levelChecker.onaudioprocess= function (e){
        {
                var buffer = e.inputBuffer.getChannelData(0);
                
                var maxVol = 0; 
            		for (var i = 0; i < buffer.length; i++) {
            			if (maxVol < buffer[i]) {
            				maxVol = buffer[i];
            			}
            		}
                if (maxVol*10 > 1) {
                    for (let i = 0; i < maxVol*50; i++) {
                        var circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        circles.setAttribute("cx",Math.random()*5000);
                        circles.setAttribute("cy",20 + i * 50);
                        circles.setAttribute("r",Math.random()*20);
                        var ranColor = '#' + Math.floor(Math.random()*16777215).toString(16)
                        circles.setAttribute('fill',ranColor);
                        circle.appendChild(circles);
                        words.style.color= ranColor;
                        intro.style.display= 'none';
                    }
                }
                //else{
                //     intro.style.display= 'block';
                //     window.setTimeout(function(){
                //         hint.style.opacity = 1;
                //         hint.style.transform = 'scale(1)';
                //       },0);
                // }

            }
    };
    }).catch((error) => {
        console.log("Something went wrong when listening to you :(")
      })
}
else{
        console.log("Something went wrong when listening to you :(")
    
}


  