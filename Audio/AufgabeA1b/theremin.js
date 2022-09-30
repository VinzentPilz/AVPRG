var started = false;
var oscillatorNode;
var gainNode;

document.querySelector("#button").addEventListener("click", function (e) {
    let context = new AudioContext();

    oscillatorNode = context.createOscillator();
    gainNode = context.createGain();
    oscillatorNode.connect(gainNode);
    gainNode.connect(context.destination);

    oscillatorNode.start(context.currentTime);

    started = true;
});

document.body.addEventListener("mousemove", function(e){
    if (started) {

    
    let relativeX = e.clientX / window.innerWidth;
    let relativeY = 1 - e.clientY / window.innerHeight;

    //console.log("Mouse: " + e.clientX, e.clientY + " Window: " + window.innerWidth, window.innerHeight);
    //console.log("Relative position: " + relativeX, relativeY);

    oscillatorNode.frequency.value = relativeX * 1000;
    gainNode.gain.value = relativeY;
    }
});