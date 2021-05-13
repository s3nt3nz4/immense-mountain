var song;
var fft;
var histLowBass = [];
var histBass = [];
var histMid = [];
var histTreble = [];
var resolution = 512;

var w = window.innerWidth;
var h = window.innerHeight;

function preload() {
	song = loadSound("data/immense mountain.mp3")
}

function clic() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function setup() {
	var canva = createCanvas(w, h);
	colorMode(HSB);
	angleMode(DEGREES);
	fft = new p5.FFT(0.7, resolution);
	canva.mousePressed(clic);
}

function draw() {
	background('#051923');
	var spectrum = fft.analyze();
	var lowBass = fft.getEnergy('bass');
	histLowBass.push(lowBass);
	var bass = fft.getEnergy('lowMid');
	histBass.push(bass);
	var mid = fft.getEnergy('mid');
	histMid.push(mid);
	var treble = fft.getEnergy('highMid');
	histTreble.push(treble);
	noFill();
	strokeWeight(1);

	if (song.isPlaying() && touches.length == 1) {
		song.pause();
	}
	if (!song.isPlaying() && touches.length == 1) {
		song.play();
	}

	textAlign(LEFT, TOP);
	textFont('Helvetica');
	stroke('#00A6FB');
	textSize(10);

	if (song.isPlaying()) {
		text('Pause', 10, 10);
	} else {
		text('Play', 10, 10);
	}

	translate(w / 2, h / 2);

	beginShape();
	for (var i = 1; i < histLowBass.length; i++) {
		stroke('#003554');
		r = map(histLowBass[i], 0, 255, 10, h / 2);
		var x = r * cos(i);
		var y = r * sin(i);
		vertex(x, y);
	}
	endShape()

	beginShape();
	for (var i = 1; i < histBass.length; i++) {
		stroke('#006494');
		r = map(histBass[i], 0, 255, 10, height / 2);
		var x = r * cos(i);
		var y = r * sin(i);
		vertex(x, y);
	}
	endShape()

	beginShape();
	for (var i = 1; i < histMid.length; i++) {
		stroke('#0582CA');
		r = map(histMid[i], 0, 255, 10, height / 2);
		var x = r * cos(i);
		var y = r * sin(i);
		vertex(x, y);
	}
	endShape()

	beginShape();
	for (var i = 1; i < histTreble.length; i++) {
		stroke('#00A6FB');
		r = map(histTreble[i], 0, 255, 10, height / 2);
		var x = r * cos(i);
		var y = r * sin(i);
		vertex(x, y);
	}
	endShape()
}

window.onresize = function () {
	// assigns new values for width and height variables
	w = window.innerWidth;
	h = window.innerHeight;
	canvas.size(w, h);
}