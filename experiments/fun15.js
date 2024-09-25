let width = 100;
let cells = new Array(width).fill(0).map(() => Math.round(Math.random()));
let synth;
const scale = ["C5", "D5", "E5", "G5", "A5"];
const colors = [];

function generateColors() {
    for (let i = 0; i < width; i++) {
        colors[i] = color(0);
    }
}

function setup() {
    createCanvas(800, 400);
    synth = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.1,
            decay: 0.2,
            sustain: 0.5,
            release: 1.0
        }
    }).toDestination();
    Tone.Transport.scheduleRepeat(updateAndPlay, "2n");
    Tone.Transport.start();
    generateColors();
}

function updateAndPlay() {
    updateCells();
    playSound();
    drawCells();
}

function updateCells() {
    let newCells = new Array(width).fill(0);
    for (let i = 1; i < width - 1; i++) {
        newCells[i] = (cells[i - 1] + cells[i] + cells[i + 1]) % 2;
    }
    cells = newCells;
}

function playSound() {
    for (let i = 0; i < width; i++) {
        if (cells[i] === 1) {
            let note = scale[i % scale.length];
            synth.triggerAttackRelease(note, "4n");
        }
    }
}

function drawCells() {
    background(255);
    for (let i = 0; i < width; i++) {
        let x = map(i, 0, width, 0, width * 8);
        let rectHeight = map(cells[i], 0, 1, height * 0.2, height * 0.8);
        fill(cells[i] ? 0 : 'rgba(0, 0, 0, 0.1)');
        noStroke();
        rect(x, height / 2 - rectHeight / 2, 8, rectHeight);
    }
}



