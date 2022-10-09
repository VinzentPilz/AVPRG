let context = new AudioContext();
var sound = new Audio("guitar.wav");
let source = context.createMediaElementSource(sound);
let gain = context.createGain();
let stereoPanner = context.createStereoPanner();
let delay = context.createDelay(4.0);
//Distortion hier rein
let convolver = context.createConvolver();
let compressor = context.createDynamicsCompressor();
let filter = context.createBiquadFilter();
let isPlaying = false;
let sliders = document.getElementsByClassName("slider");
let selectListFilter = document.querySelector("#selectListFilter");

gain.connect(compressor);
compressor.connect(delay)
delay.connect(filter);
filter.connect(stereoPanner);
stereoPanner.connect(context.destination);

sound.loop = true;

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

//Slider Event Listener

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter)
}

function changeParameter() {
    switch(this.id) {
        //Gain
        case "gainSlider":
            let gainValue = (this.value / 10);
            document.querySelector("#gainOutput").innerHTML = gainValue + " dB";
            gain.gain.value = gainValue;
            break;

        //Panning
        case "panningSlider":
            let panValue = ((this.value - 50) / 50);
            document.querySelector("#panningOutput").innerHTML = panValue + " LR";
            stereoPanner.pan.value = panValue;
            break;

        //Delay
        case "delaySlider":
            let delayValue = (this.value / 25);
            document.querySelector("#delayOutput").innerHTML = delayValue + " sec";
            delay.delayTime.value = delayValue;
            break;

        //Compressor
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

        //Filter
        case "frequencySlider":
            filter.frequency.value = (this.value);
            document.querySelector("#frequencyOutput").innerHTML = (this.value) + " Hz";
            break;

        case "detuneSlider":
            filter.detune.value = (this.value);
            document.querySelector("#detuneOutput").innerHTML = (this.value) + " cents";
            break;

        case "qSlider":
            filter.Q.value = (this.value);
            document.querySelector("#qOutput").innerHTML = (this.value) + " ";
            break;

        case "gainSliderFilter":
            filter.gain.value = (this.value);
            document.querySelector("#gainOutputFilter").innerHTML = (this.value) + " dB";
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