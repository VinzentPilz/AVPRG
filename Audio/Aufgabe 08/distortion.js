let context = new AudioContext();
let sound = new Audio("guitar.wav");
let source = context.createMediaElementSource(sound);
let distortion = context.createWaveShaper();
let isPlaying = false;
let playStopButton = document.querySelector("#playStopButton");

sound.loop = true;

distortion.curve = makeDistortionCurve(0);
distortion.oversample = "4x";

source.connect(distortion);
distortion.connect(context.destination);


document.querySelector("#distortionSlider").addEventListener("input", function() {
    document.querySelector("#distortionOutput").innerHTML = this.value;
    distortion.curve = makeDistortionCurve(this.value);
});




function makeDistortionCurve(amount) {    
    let n_samples = 44100,
        curve = new Float32Array(n_samples);
    
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    
    return curve;
};


playStopButton.addEventListener("click", function(e) {
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