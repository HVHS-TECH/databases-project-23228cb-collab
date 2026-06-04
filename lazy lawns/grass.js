/*******************************************************/
//variables
/*******************************************************/
//timer elapsed
let timer = 0;
//amount of grass
let grassCount = 0;
//the amount of grass on start
let grassCountStart = 1657;
//canvas size
let canvasWidth = 700;
let canvasHeight = 645;
//game state
let gameState = "menu";
/*******************************************************/
//functions
/*******************************************************/

//grass delete function
function grassCutFunc(_ssss, _mower) {
	_ssss.remove();
};

//spawn grass function
function grassSpawn() {
	for (var i = 0; i < 38; i++) {

		for (var x = 0; x < 44; x++) {
			var grass = new Sprite(x * 15 + 30, i * 15 + 66, 15, 15, 'k');

			grassGroup.add(grass);
			grass.image = (grassIMG);
		}
	};
};

//image preload
function preload() {
	mowerSpriteIMG = loadImage('assets/lawnMower.png');
	grassIMG = loadImage('assets/grassSprite.png')
}

/*******************************************************/
// setup fuction
/*******************************************************/
function setup() {

	//setup
	console.log("setup: ");
	world.gravity.y = 0;

	//canvas setup
	let Canvas = createCanvas(canvasWidth, canvasHeight);
	Canvas.position(windowWidth / 4, 50);
	frameRate(60);

	//grass code
	grassGroup = new Group();
	grassIMG.resize(45, 45);

	//wall sprites code
	wallLH = new Sprite(0, canvasHeight / 2 + 20, 8, 600, 'k');
	wallRH = new Sprite(canvasWidth, canvasHeight / 2 + 20, 8, 605, 'k');
	wallTop = new Sprite(canvasWidth / 2, 40, 800, 8, 'k');
	wallBot = new Sprite(canvasWidth / 2, canvasHeight, 800, 8, 'k');
	wallGroup = new Group();
	wallGroup.add(wallBot, wallLH, wallRH, wallTop);
	wallGroup.color = ('black');

	//mower sprite code 
	mower = new Sprite(45, canvasHeight - 25, 80, 45, 'd');
	mower.image = (mowerSpriteIMG);
	mower.friction = 20;


	//grass overlap = cut
	grassGroup.overlaps(mower, grassCutFunc);

};

/*******************************************************/
// draw loops
/*******************************************************/
function draw() {
	//alow for the 'gameState' variable to switch draw loops
	if (gameState === "menu") {

		drawStart();

	} else if (gameState === "game") {

		drawGame();

	} else if (gameState === "end") {

		drawEnd();

	};
	//ensure that the correct amount of grass is on the screen
	if (grassCount > grassCountStart) {
		grassCutFunc();
	};
	//ensure no movement if no imput
	if (kb.released('w')&&kb.released('s')&&kb.released('a')&&kb.released('d')) {
		mower.vel.x = 0;
		mower.vel.y = 0;
	};
};

function drawStart() {
	background("white");
	//sprite visability
	mower.visible = false;
	grassGroup.visible = false;
	wallGroup.visible = false;
	//start game button
	if (kb.pressed('enter')) {
		//change game state
		gameState = "game";
		//respawn grass
		grassSpawn();
		//reset the sprite
		mower.x = 45; // original x
		mower.y = canvasHeight - 25; // original y
		mower.vel.x = 0;
		mower.vel.y = 0;
		mower.speed = 0;
		mower.rotation = 0;
		frameCount = 0;
	};
	//tital
	text('LAZY LAWNS', canvasWidth / 4, 40)
	//text
	text('Press Enter To Start', canvasWidth / 4, canvasHeight / 4 + 2 * canvasHeight / 4);
	//controls
	text('W/S = Up/Down', canvasWidth / 4, canvasHeight / 4 + 40);
	text('A/D = Left/Right', canvasWidth / 4, canvasHeight / 4 + 80);
	textSize(40);
};

function drawGame() {
	//background
	background("green");
	//sprite visablitiy 
	mower.visible = true;
	grassGroup.visible = true;
	wallGroup.visible = true;
	//setups
	mower.rotationSpeed = 0;
	grassCount = grassGroup.length;

	//grass left
	let grassPersent = grassCount / grassCountStart * 100;
	grassPersent = Math.round(grassPersent * 100) / 100;


	//if grass on screen
	if (grassCount > 0) {
		timer = frameCount / 60;
		timer = Math.round(timer * 1000) / 1000;
		//timer
		text(timer, 400, 20);
		textSize(20);
		//percent text
		text(grassPersent + '%', 300, 20);
	};

	//end
	if (grassCount === 0) {
		gameState = "end";
	};

	//mower left/right
	if (kb.pressing('a')) {
		mower.rotation = 270;
		mower.vel.x = -4;
	};

	if (kb.pressing('d')) {
		mower.rotation = 90;
		mower.vel.x = 4;

	};

	if (kb.released('a')) {
		mower.rotation = 180;
		mower.vel.x = 0;
		mower.rotation = 270;
	}

	else if (kb.released('d')) {
		mower.rotation = 0;
		mower.vel.x = 0;
		mower.rotation = 90;
	};

	//mower Up/down
	if (kb.pressing('s')) {
		mower.vel.y = 4;
		mower.rotation = 180;
	}
	else if (kb.released('s')) {
		mower.vel.y = 0;
		mower.rotation = 180;
	};

	if (kb.pressing('w')) {
		mower.vel.y = -4;
		mower.rotation = 0;
	}
	else if (kb.released('w')) {
		mower.vel.y = 0;
		mower.rotation = 0;
	};

	//mower diagonal
	if (kb.pressing('w') && kb.pressing('d')) {
		mower.rotation = 45;
		mower.vel.y = -2;
		mower.vel.x = 2;
	}
	else if (kb.released('w') && kb.released('d')) {
		mower.rotation = 45;
		mower.vel.y = 0;
		mower.vel.x = 0;
	};

	if (kb.pressing('w') && kb.pressing('a')) {
		mower.rotation = 315;
		mower.vel.y = -2;
		mower.vel.x = -2;
	}
	else if (kb.released('w') && kb.released('a')) {
		mower.rotation = 315;
		mower.vel.y = 0;
		mower.vel.x = 0;
	};

	if (kb.pressing('s') && kb.pressing('d')) {
		mower.rotation = 135;
		mower.vel.y = 2;
		mower.vel.x = 2;
	}
	else if (kb.released('s') && kb.released('d')) {
		mower.rotation = 135;
		mower.vel.y = 0;
		mower.vel.x = 0;
	};

	if (kb.pressing('s') && kb.pressing('a')) {
		mower.rotation = 225;
		mower.vel.y = 2;
		mower.vel.x = -2;
	}
	else if (kb.released('s') && kb.released('a')) {
		mower.rotation = 225;
		mower.vel.y = 0;
		mower.vel.x = 0;
	};
};

function drawEnd() {
	//background
	background("white");
	//text
	text('Your Time Was ' + timer + ' Seconds', canvasWidth / 8, 200);
	textSize(40);
	text('Press Enter To Restart', canvasWidth / 8, 400);
	//restart button
	if (kb.pressed('enter')) {
		gameState = "menu";

	};
	//sprite visability
	mower.visible = false;
	grassGroup.visible = false;
	wallGroup.visible = false;
};

/*******************************************************/
//  END OF APP
/*******************************************************/