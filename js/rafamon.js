/**
* Pokemon HTML Clone
* @author Rafa Marques
* @version 1.0
* @datum 30.01.2017
*/

var CANVAS;
var CTX;
var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 720;
var FPS = 60;
var hero;
var heroSprite = new Image();

function startGame() {
    CANVAS = document.getElementById("canvas");
    CTX = CANVAS.getContext("2d");
    
    heroSprite.src = "bilder/trainer.png";
    
    hero = {
        speed: 2,
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        moveLeft: false,
        moveUp: false,
        moveRight: false,
        moveDown: false,
        sprite: heroSprite
    };
    
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
}

function draw() {
	CTX.clearRect(0, 0, 1280, 720);
	CTX.drawImage(hero.sprite, hero.x, hero.y);
}

function update() {
	if(hero.moveLeft && hero.x > 0)    { hero.x -= hero.speed; }
	if(hero.moveRight && hero.x < CANVAS_WIDTH - 15) { hero.x += hero.speed; }
	if(hero.moveUp && hero.y > 0)      { hero.y -= hero.speed; }
	if(hero.moveDown && hero.y < CANVAS_HEIGHT - 22)  { hero.y += hero.speed; }
}

function onKeyDown(evt) {
    switch(evt.keyCode) {
		case 37:
			hero.moveLeft = true;
			break;
		case 38:
			hero.moveUp = true;
			break;
		case 39:
			hero.moveRight = true;
			break;
		case 40:
			hero.moveDown = true;
			break;
	}
	update();
}

function onKeyUp(evt) {
    	switch(evt.keyCode) {
		case 37:
			hero.moveLeft = false;
			break;
		case 38:
			hero.moveUp = false;
			break;
		case 39:
			hero.moveRight = false;
			break;
		case 40:
			hero.moveDown = false;
			break;
	}

} 
