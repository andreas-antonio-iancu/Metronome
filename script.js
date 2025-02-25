const bpmSlider = document.getElementById('bpm-slider');
const bpmValue = document.getElementById('bpm-value');
const timeSignatureValue = document.getElementById('time-signature-value');
const timeMinus = document.getElementById('time-minus');
const timePlus = document.getElementById('time-plus');
const startPauseBtn = document.getElementById('start-pause');
const zoomContainer = document.getElementById('zoom-container');

const metronomeSound = new Audio ( "assets/audio/metronome-2.mp3");
const accentSound = new Audio ( "assets/audio/metronome-1.mp3");

let bpm = bpmSlider.value;
let isRunning = false;
let interval;
let timeSignature = 4;
let beatCounter = 0;

function startMetronome() {
    if (isRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = '⏵︎';
        zoomContainer.classList.remove('zooming');
    } else {
        interval = setInterval(playBeat, (60000 / bpm));
        startPauseBtn.textContent = '⏹︎';
        zoomContainer.classList.add('zooming');
        zoomContainer.style.animationDuration = `${(60 / bpm)}s`;
    }
    isRunning = !isRunning;
}

    function playBeat() {
        
        beatCounter++;
        if (beatCounter > timeSignature) {
            beatCounter = 1;
        }
    
        if (beatCounter === 1) {
            // Accent sound on the first beat
            accentSound.currentTime = 0;
            accentSound.play();
        } else {
            // Regular sound for other beats
            metronomeSound.currentTime = 0;
            metronomeSound.play();
        }
    
        console.log('Beat:', beatCounter);
    }

bpmSlider.addEventListener('input', () => {
    bpm = bpmSlider.value;
    bpmValue.textContent = bpm;
    if (isRunning) {
        clearInterval(interval);
        interval = setInterval(playBeat, (60000 / bpm));
        zoomContainer.style.animationDuration = `${(60 / bpm)}s`;
    }
});

timeMinus.addEventListener('click', () => {
    if (timeSignature > 1) {
        timeSignature--;
        timeSignatureValue.textContent = `${timeSignature}/4`;
    }
});

timePlus.addEventListener('click', () => {
    timeSignature++;
    timeSignatureValue.textContent = `${timeSignature}/4`;
});

startPauseBtn.addEventListener('click', startMetronome);
