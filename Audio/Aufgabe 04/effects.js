let playStopButton = document.querySelector("#button");
let isPlaying = false;

let context = new AudioContext();
let sound = new Audio("sound.wav");
let source = context.createMediaElementSource(sound);
let gain = context.createGain();
let stereoPanner = context.createStereoPanner();
let delay = context.createDelay(4.0);

source.connect(gain);
gain.connect(delay);
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

document.querySelector("#gainSlider").addEventListener("input", function(e) {
    let gainValue = (this.value / 10);
    document.querySelector("#gainOutput").innerHTML = gainValue + " dB";
    gain.gain.value = gainValue;
});

document.querySelector("#panningSlider").addEventListener("input", function(e) {
    let panValue = ((this.value - 50) / 50);
    document.querySelector("#panningOutput").innerHTML = panValue + " LR";
    stereoPanner.pan.value = panValue;
});

document.querySelector("#delaySlider").addEventListener("input", function(e) {
    let delayValue = (this.value / 25);
    document.querySelector("#delayOutput").innerHTML = delayValue + " sec";
    delay.delayTime.value = delayValue;
});

playStopButton.addEventListener("click", function() {
    if (isPlaying) {
        sound.pause();
        playStopButton.innerHTML = "Play";
    } else {
        sound.play();
        playStopButton.innerHTML = "Stop";
    }

    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function() {
    isPlaying = false;
    playStopButton.innerHTML = "Play";
});