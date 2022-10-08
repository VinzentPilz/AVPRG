let playStopButton = document.querySelector("#playStopButton"),
    sliders = document.getElementsByClassName("slider"),
    selectList = document.querySelector("#selectList"),
    context = new AudioContext(),
    sound = new Audio("sound.wav"),
    isPlaying = false,
    source = context.createMediaElementSource(sound),
    filter = context.createBiquadFilter();

sound.loop = true;
source.connect(filter);
filter.connect(context.destination);

for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter, false);
}

selectList.addEventListener("change", function (e) {
    filter.type = selectList.options[selectList.selectedIndex].value;
});

function changeParameter() {
    switch (this.id) {
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
        case "gainSlider":
            filter.gain.value = (this.value);
            document.querySelector("#gainOutput").innerHTML = (this.value) + " dB";
            break;
    }
}

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