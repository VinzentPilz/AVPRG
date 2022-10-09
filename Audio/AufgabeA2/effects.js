let context = new AudioContext();
var sound = new Audio("guitar.wav");
let source = context.createMediaElementSource(sound);
let gain = context.createGain();
let stereoPanner = context.createStereoPanner();
let delay = context.createDelay(4.0);
//Distortion hier rein
let convolver = context.createConvolver();
let compressor = context.createDynamicsCompressor();
let isPlaying = false;
let sliders = document.getElementsByClassName("slider");


gain.connect(compressor);
compressor.connect(delay)
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

sound.loop = true;

//Gain

document.querySelector("#gainSlider").addEventListener("input", function(e) {
    let gainValue = (this.value / 10);
    document.querySelector("#gainOutput").innerHTML = gainValue + " dB";
    gain.gain.value = gainValue;
});

//Panning

document.querySelector("#panningSlider").addEventListener("input", function(e) {
    let panValue = ((this.value - 50) / 50);
    document.querySelector("#panningOutput").innerHTML = panValue + " LR";
    stereoPanner.pan.value = panValue;
});

//Delay

document.querySelector("#delaySlider").addEventListener("input", function(e) {
    let delayValue = (this.value / 25);
    document.querySelector("#delayOutput").innerHTML = delayValue + " sec";
    delay.delayTime.value = delayValue;
});

//Convolver

loadImpulseResponse("room");

document.querySelector("#selectList").addEventListener("change", function(e) {
    let name = e.target.options[e.target.selectedIndex].value;
    loadImpulseResponse(name);
});

function loadImpulseResponse(name) {
    fetch("impulseResponses/" + name + ".wav")
        .then(response => response.arrayBuffer())
        .then(undecodedAudio => context.decodeAudioData(undecodedAudio))
        .then(audioBuffer => {
            if (convolver) {convolver.disconnect();}

            convolver = context.createConvolver();
            convolver.buffer = audioBuffer;
            convolver.normalize = true;

            source.connect(convolver);
            convolver.connect(gain);
        })
        .catch(console.error);
}

//Turn Off Button

document.querySelector("#reverbOff").addEventListener("click", function (e) {
    if (convolver) {convolver.disconnect();}

    source.connect(gain);
});

//Compressor

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch(this.id) {
        case "thresholdSlider":
            compressor.threshold.value = (this.value - 100);
            document.querySelector("#thresholdOutput").innerHTML = (this.value - 100) + " dB";
            break;

        case "ratioSlider":
            compressor.ratio.value = (this.value / 5);
            document.querySelector("#ratioOutput").innerHTML = (this.value / 5) + " dB";
            break;

        case "kneeSlider":
            compressor.knee.value = (this.value / 2.5);
            document.querySelector("#kneeOutput").innerHTML = (this.value / 2.5) + " degree";
            break;

        case "attackSlider":
            compressor.attack.value = (this.value / 1000);
            document.querySelector("#attackOutput").innerHTML = (this.value / 1000) + " sec";
            break;

        case "releaseSlider":
            compressor.release.value = (this.value / 1000);
            document.querySelector("#releaseOutput").innerHTML = (this.value / 1000) + " sec";
            break;
    }
}



//Play Stop Button

document.querySelector("#playStopButton").addEventListener("click", function(e) {
    if (isPlaying) {
        sound.pause();
        e.target.innerHTML = "Play";
    } else {
        sound.play();
        e.target.innerHTML = "Stop";
    }
    isPlaying = !isPlaying;
});

sound.addEventListener("ended", function(e) {
    isPlaying = false;
    document.querySelector("#playStopButton").innerHTML = "Play";
});