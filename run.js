var five = require("johnny-five");

var board = new five.Board();
var leds = [];
var position = 0;
var direction = 1;

board.on("ready", function () {

	//initilizes leds from output 2 to 10
	for (var i = 0; i < 8; i++) {
		leds.push(five.Led(i + 2));
	}

	loop();
});

loop = function () {
	board.wait(100, function () {
		leds[position].on();

		for (var i = 0; i < 8; i++) {
			if (i != position)
				leds[i].off();
		}

		setNewPosition();
		loop();
	});
}

function setNewPosition() {
	position = position + direction;

	if (position == 8) {
		position = 6;
		direction = -1;
	}

	if (position == -1) {
		position = 1;
		direction = 1;
	}
}
