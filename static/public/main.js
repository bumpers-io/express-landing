// Vars
// TODO: fetch dimensions from css external file
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const CHAR_RADIUS = 25;

// temp allow player char to move; no centered camera
var charPosX = (CANVAS_WIDTH/2) - (CHAR_RADIUS);
var charPosY = (CANVAS_HEIGHT/2) - (CHAR_RADIUS);

// Canvas
var canvas = document.getElementById('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var context = canvas.getContext('2d');

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
