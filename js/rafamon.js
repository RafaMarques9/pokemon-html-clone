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
var canvasLayers = [];
var FPS = 60;
var TILE_SIZE = 16;

// Person Object
var personHero;

// Map Object
var testMapObject;

// Collision Object
var collisionObject;

// Render Object
var renderObject;

/* Sprites */
var heroSpriteDown = new Image();
var heroSpriteUp = new Image();
var heroSpriteLeft = new Image();
var heroSpriteRight = new Image();
var profSprite = new Image();
var grass = new Image();
var longGrass = new Image();
var stoneOnGrass = new Image();
var treeBl = new Image();
var treeBr = new Image();
var treeMl = new Image();
var treeMr = new Image();
var treeTl0 = new Image();
var treeTl1 = new Image();
var treeTr0 = new Image();
var treeTr1 = new Image();
var pelO = new Image();
var pelU = new Image();
var perO = new Image();
var perU = new Image();
var pl = new Image();
var pr = new Image();
var pmO = new Image();
var pmU = new Image();
var pm = new Image();

var spritesToLoad = 25;

// Map Tiles Array
var tilesArray = [grass, stoneOnGrass, longGrass, treeBl, treeBr, treeMl, treeMr, treeTl0, treeTr0, treeTl1, treeTr1, pelO, pelU, perO, perU, pl, pr, pmO, pmU, pm];
// Tiles ID from none Walkable tiles like the tree's
var notWalkableId = [1, 3, 4, 5, 6, 9, 10];

/*
* 0 - grass
* 1 - stoneOnGrass
* 2 - longGrass
* 3 - treeBl
* 4 - treeBr
* 5 - treeMl
* 6 - treeMr
* 7 - treeTl0
* 8 - treeTr0
* 9 - treeTl1
* 10 - treeTr1
* 11 - Pfütze Ecke Links Oben
* 12 - Pfütze Ecke Links Unten
* 13 - Pfütze Ecke Rechts Oben
* 14 - Pfütze Ecke Rechts Unten
* 15 - Pfütze Links
* 16 - Pfütze Rechts
* 17 - Pfütze Mitte Oben
* 18 - Pfütze Mitte Unten
* 19 - Pfütze Mitte
*/
var testMap = [
    [9,10,3,4,3,4,3,4,9,10,3,4,3,4,3,4,3,4,3,4,9,10,9,10,9,10,9,10,9,10,9,10,9,10,9,10,9,10,3,4,9,10,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,11,17,13,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,3,4,9,10,9,10,9,10,9,10,9,10,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,3,4,9,10,9,10,9,10,9,10,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,7,8,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,2,2,2,2,2,2,5,6,2,2,2,2,2,2,3,4,9,10,9,10,9,10,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,2,2,2,2,2,2,9,10,2,2,2,2,2,2,2,2,5,6,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,2,2,2,2,2,2,5,6,2,2,2,2,2,2,2,2,3,4,9,10,9,10,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,2,2,2,2,2,2,9,10,2,2,2,2,2,2,2,2,2,2,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,2,2,2,2,2,2,5,6,2,2,2,2,2,2,2,2,2,2,3,4,9,10,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,2,2,2,2,2,2,9,10,2,2,2,2,2,2,2,2,2,2,2,2,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,2,2,2,2,2,2,5,6,2,2,2,2,2,2,2,2,2,2,2,2,3,4,9,10,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,0,0,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,9,10,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,0,0,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,9,10,0,0,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,0,0,3,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,5,6,0,0,0,0,0,0,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,19,19,19,17,17,17,17,17,17,17,17,17,17,17,17,17,17,13,5,6],
    [9,10,0,0,0,0,0,0,3,4,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,16,9,10],
    [5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,0,0,7,8,12,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,18,18,14,5,6],
    [9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,7,8,7,8,7,8,7,8,7,8,7,8,7,8,9,10,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,3,4,3,4,3,4,3,4,3,4,3,4,3,4,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,0,0,0,0,0,0,0,0,7,8,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10,0,0,9,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15,19,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,6,0,0,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,12,18,14,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,9,10,7,8,7,8,7,8,7,8,7,8,7,8,0,0,0,0,0,0,9,10,0,0,9,10,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,0,0,0,0,0,0,5,6,0,0,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,3,4,3,4,3,4,3,4,3,4,3,4,3,4,0,0,0,0,0,0,3,4,0,0,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,5,6],
    [9,10,2,2,2,2,2,2,2,2,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,10],
    [5,6,2,2,2,2,2,2,2,2,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],
    [9,10,7,8,7,8,7,8,7,8,9,10,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,7,8,9,10],
    [5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6,5,6],
    [3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4]
];

function startGame() {
    CANVAS = document.getElementById("canvas1");
    // Background Layer
    var canvas1 = document.getElementById("canvas1");
    // Player Layer
    var canvas2 = document.getElementById("canvas2");
    // Over Player & Ambient Animations
    var canvas3 = document.getElementById("canvas3");
    
    canvasLayers.push(canvas1);
    canvasLayers.push(canvas2);
    canvasLayers.push(canvas3);
    CTX = canvasLayers[0].getContext("2d");
    
    loadImages();
    
    renderObject = new RenderHandler(canvasLayers);
    testMapObject = new MapHandler(testMap, TILE_SIZE, notWalkableId, CANVAS_WIDTH, CANVAS_HEIGHT);
    collisionObject = new CollisionMap(testMapObject);
    personHero = new Person("Brendan", 48, 32, [heroSpriteDown, heroSpriteUp, heroSpriteLeft, heroSpriteRight], 0, collisionObject);
}

/* Loads all Sprites and calls the CB function */
function loadImages() {
    heroSpriteDown.src = "bilder/trainerFaceDown.png";
    heroSpriteDown.onload = function() {spriteLoadCB();}
    
    heroSpriteUp.src = "bilder/trainerFaceUp.png";
    heroSpriteUp.onload = function() {spriteLoadCB();}
    
    heroSpriteLeft.src = "bilder/trainerFaceLeft.png";
    heroSpriteLeft.onload = function() {spriteLoadCB();}
    
    heroSpriteRight.src = "bilder/trainerFaceRight.png";
    heroSpriteRight.onload = function() {spriteLoadCB();}
    
    profSprite.src = "bilder/prof.png";
    profSprite.onload = function() {spriteLoadCB();}
    
    grass.src = "bilder/grass.png";
    grass.onload = function() {spriteLoadCB();}
    
    longGrass.src = "bilder/longGrass.png";
    longGrass.onload = function() {spriteLoadCB();}
    
    stoneOnGrass.src = "bilder/stoneOnGrass.png";
    stoneOnGrass.onload = function() {spriteLoadCB();}
    
    treeBl.src = "bilder/treeBl.png";
    treeBl.onload = function() {spriteLoadCB();}
    
    treeBr.src = "bilder/treeBr.png";
    treeBr.onload = function() {spriteLoadCB();}
    
    treeMl.src = "bilder/treeMl.png";
    treeMl.onload = function() {spriteLoadCB();}
    
    treeMr.src = "bilder/treeMr.png";
    treeMr.onload = function() {spriteLoadCB();}
    
    treeTl0.src = "bilder/treeTl0.png";
    treeTl0.onload = function() {spriteLoadCB();}
    
    treeTl1.src = "bilder/treeTl1.png";
    treeTl1.onload = function() {spriteLoadCB();}
    
    treeTr0.src = "bilder/treeTr0.png";
    treeTr0.onload = function() {spriteLoadCB();}
    
    treeTr1.src = "bilder/treeTr1.png";
    treeTr1.onload = function() {spriteLoadCB();}
    
    pelO.src = "bilder/pfützeEckeLinksOben.png";
    pelO.onload = function() {spriteLoadCB();}
    
    pelU.src = "bilder/pfützeEckeLinksUnten.png";
    pelU.onload = function() {spriteLoadCB();}
    
    perO.src = "bilder/pfützeEckeRechtsOben.png";
    perO.onload = function() {spriteLoadCB();}
    
    perU.src = "bilder/pfützeEckeRechtsUnten.png";
    perU.onload = function() {spriteLoadCB();}
    
    pl.src = "bilder/pfützeLinks.png";
    pl.onload = function() {spriteLoadCB();}
    
    pr.src = "bilder/pfützeRechts.png";
    pr.onload = function() {spriteLoadCB();}
    
    pmO.src = "bilder/pfützeMitteOben.png";
    pmO.onload = function() {spriteLoadCB();}
    
    pmU.src = "bilder/pfützeMitteUnten.png";
    pmU.onload = function() {spriteLoadCB();}
    
    pm.src = "bilder/pfützeMitte.png";
    pm.onload = function() {spriteLoadCB();}
}

/* The CB function, when all Sprites are loaded calls the drawing functions */
function spriteLoadCB() {
    spritesToLoad--;
    if(!spritesToLoad) {
        // renderBg(canvasLayers[0], testMapObject);
        renderObject.drawBg(0, testMapObject);
        
        renderCharacters(canvasLayers[1]);
    }
}

/* Renders the background on to the canvasLayer[0] */
/*function renderBg(canvasLayer, map) {
    var layerContext = canvasLayer.getContext("2d");
    layerContext.clearRect(0, 0, map.getCanvasWidth(), map.getCanvasHeight());
    
    
    for(var y = 0; y < map.getMap().length; y++) {
        // console.log(map[y].length);
        for(var x = 0; x < map.getMap()[y].length; x++) {
            var tile = map.getMap()[y][x];
            drawTile(layerContext, tile, x, y);
        }
    }
}*/

/* This is called by the renderBg function to draw the tile sprite to the canvasLayer */
function drawTile(layerContext, tileId, x, y) {
    if(tileId === 7 || tileId === 8) {
        canvasLayers[2].getContext("2d").drawImage(tilesArray[tileId], x * TILE_SIZE, y * TILE_SIZE);
        layerContext.drawImage(tilesArray[0], x * TILE_SIZE, y * TILE_SIZE);
    } else {
        layerContext.drawImage(tilesArray[tileId], x * TILE_SIZE, y * TILE_SIZE);
    }
}

/* 
* Renders the Character to the canvasLayer[1] 
*/
function renderCharacters(canvasLayer) {
    var layerContext = canvasLayer.getContext("2d");
    layerContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    layerContext.drawImage(personHero.getSprite(), personHero.getXPos(), personHero.getYPos() - 5);
    
    layerContext.drawImage(profSprite, 13 * TILE_SIZE, (15 * TILE_SIZE) - 5);
}

function onKeyDown(evt) {
    switch(evt.keyCode) {
		case 37:
            personHero.move(-TILE_SIZE, 0);
            personHero.setShowSpriteId(2);
			break;
		case 38:
            personHero.move(0, -TILE_SIZE);
            personHero.setShowSpriteId(1);
			break;
		case 39:
            personHero.move(TILE_SIZE, 0);
            personHero.setShowSpriteId(3);
			break;
		case 40:
            personHero.move(0, TILE_SIZE);
            personHero.setShowSpriteId(0);
			break;
	}
    renderCharacters(canvasLayers[1]);
}

// TODO:
// http://www.creativebloq.com/html5/build-tile-based-html5-game-31410992