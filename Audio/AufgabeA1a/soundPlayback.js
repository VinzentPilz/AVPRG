//let context = new AudioContext();

/**
let sound = new Audio("sound1.wav");
let soundNode = context.createMediaElementSource(sound);
let gainNode = context.createGain();

gainNode.gain.value = 0.8;

soundNode.connect(gainNode);
gainNode.connect(context.destination);
*/


//Das kann irggendwie nicht richtig sein, aber sonst kommt die selbe Fehlermeldung wie in den Videos
function playSound(name)
{
    let context = new AudioContext();
    
    let sound = new Audio(name);
    let soundNode = context.createMediaElementSource(sound);
    let gainNode = context.createGain();

    gainNode.gain.value = 0.5;

    soundNode.connect(gainNode);
    gainNode.connect(context.destination);

    sound.play();
}

document.querySelector("#button1").addEventListener("click", function() {
    console.log("Clicked button1");

    playSound("sound1.wav");

});

document.querySelector("#button2").addEventListener("click", function() {
    console.log("Clicked button2");

    playSound("sound2.wav");
    
});

document.querySelector("#button3").addEventListener("click", function() {
    console.log("Clicked button3");

    playSound("sound3.wav");
    
});

document.querySelector("#button4").addEventListener("click", function() {
    console.log("Clicked button4");

    playSound("sound4.wav");
    
});