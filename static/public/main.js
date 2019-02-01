function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main_loop() {
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;

    const CHAR_RADIUS = 25;

    var canvas = document.getElementById('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Draw a 'player'
    // should be a circle, not rectangle
    var context = canvas.getContext('2d');
    context.fillStyle = 'red';
    context.fillRect(
        (CANVAS_WIDTH/2) - (CHAR_RADIUS),
        (CANVAS_HEIGHT/2) - (CHAR_RADIUS),
        CHAR_RADIUS*2,
        CHAR_RADIUS*2
    );

    /* Const for reference in calculations
    *  - current desired framerate is ~30 fps
    */  
    const DESIRED_FPS = 30;
    const FRAME_DELAY_MS = 1000/DESIRED_FPS;
    var state_last_utc_ms;
    var frame_delay_diff;

    // FPS calculation
    const fps_sample_num = 3;

    console.log("[INFO] Game loop starting");
    while (true) {
        // parse new game state if it exists

        // render (relevant) objects to canvas

        // TEMP: fake workload
        //await sleep(Math.floor(Math.random()*FRAME_DELAY_MS)+(FRAME_DELAY_MS/2));


        // if (state_last_utc_ms != null)
        if (state_last_utc_ms) {
            frame_delay_diff = FRAME_DELAY_MS-(Date.now()-state_last_utc_ms);
            
            if (frame_delay_diff > 0) {
                console.log("[DEBUG] Pausing to maintain framerate");
                await sleep(frame_delay_diff);
            } else {
                console.log("[WARN] Framerate warning: late by " + frame_delay_diff*(-1) + "ms");
            }
        }

        state_last_utc_ms=Date.now();
        console.log("Frame UTC: " + state_last_utc_ms);
    }
}

main_loop();
