// Vars
// TODO: fetch dimensions from css external file

// Canvas
var canvas = document.getElementById('canvas');
const CANVAS_WIDTH = canvas.width-0;
const CANVAS_HEIGHT = canvas.height-0;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var context = canvas.getContext('2d');

// Player Char setup
const CHAR_RADIUS = 25;

// temp allow player char to move; no centered camera
var charPosX = (CANVAS_WIDTH/2) - (CHAR_RADIUS);
var charPosY = (CANVAS_HEIGHT/2) - (CHAR_RADIUS);


// Box2D World
var b2d =  Box2D()
var world = new b2d.b2World(new b2d.b2Vec2(0, 0)); // no-gravity; top-down

console.log(world);

// Walls
var fixDef = new b2d.b2FixtureDef;
fixDef.density = .5;
fixDef.friction = 0;
fixDef.restitution = 0.4;

var wallThickness = 25; // 25 px

var horWallDef = new b2d.b2BodyDef;
horWallDef.type = b2d.b2Body.b2_staticBody;
fixDef.shape = new b2d.b2PolygonShape;
fixDef.shape.SetAsBox(CANVAS_WIDTH/2, wallThickness);
console.log(horWallDef);
horWallDef.position.Set(CANVAS_WIDTH/2, 0);
world.CreateBody(horWallDef).CreateFixture(fixDef);
horWallDef.position.Set(CANVAS_WIDTH/2, CANVAS_HEIGHT-wallThickness);
world.CreateBody(horWallDef).CreateFixture(fixDef);

var vertWallDef = new b2d.b2BodyDef;
vertWallDef.type = b2d.b2Body.b2_staticBody;
fixDef.shape = new b2d.b2PolygonShape;
fixDef.shape.SetAsBox(wallThickness, CANVAS_HEIGHT/2);
vertWallDef.position.Set(0, CANVAS_HEIGHT/2);
world.CreateBody(vertWallDef).CreateFixture(fixDef);
vertWallDef.position.Set(CANVAS_WIDTH-wallThickness, CANVAS_HEIGHT/2);
world.CreateBody(vertWallDef).CreateFixture(fixDef);


// FPS management
var fpsDisplay = document.getElementById('fps_display');
var fpsLastUTC = performance.now();
var canvasNowUTC = fpsLastUTC;
let canvasLastUTC;


function getFPS() {
    // naive FPS calculation
    return Math.floor(1000/(canvasNowUTC - canvasLastUTC));
}

// WebSockets
var socket = io();

function gameLoop() {
    // parse new game state if it exists
    socket.on('message', (data) => {
        console.log(data);
    });

    // render (relevant) objects to canvas
    // clear canvas for redrawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player char
    // - should be a circle, not rectangle
    context.fillStyle = 'red';
    context.fillRect(
        charPosX,
        charPosY,
        CHAR_RADIUS*2,
        CHAR_RADIUS*2
    );

    // FPS management
    canvasNowUTC=performance.now();
    if ((canvasNowUTC - fpsLastUTC) >= 500) {
        // update FPS display every 500ms
        console.log('[DEBUG] Updating FPS display');
        fpsDisplay.innerHTML = '' + getFPS() + ' fps';
        fpsLastUTC = canvasNowUTC;
    }
    canvasLastUTC=canvasNowUTC;

    // Only execute loop once animation frame is available
    // (web browser W3C standard is 60hz)
    // console.log("[DEBUG] Waiting for animation frame...");
    window.requestAnimationFrame(() => {
        // console.log("[DEBUG] Animation frame received");
        gameLoop();
    });
}

console.log("[INFO] Game loop starting");
gameLoop();
