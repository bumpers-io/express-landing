function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mainLoop() {
    /* Const for reference in calculations
    *  - current desired framerate is ~30 fps
    */  
    const desiredFramerateMs = 33;
    var stateLastUTCMs;
    var frameDelay;

    console.log("[INFO] Game loop starting");
    while (true) {
        // parse new game state if it exists

        // render (relevant) objects to canvas

        // TEMP: fake workload
        //await sleep(Math.floor(Math.random()*desiredFramerateMs)+(desiredFramerateMs/2));


        // if (stateLastUTCMs != null)
        if (stateLastUTCMs) {
            frameDelay = desiredFramerateMs-(Date.now()-stateLastUTCMs);
            
            if (frameDelay > 0) {
                console.log("[DEBUG] Pausing to maintain framerate");
                await sleep(frameDelay);
            } else {
                console.log("[WARN] Framerate warning: late by " + frameDelay*(-1) + "ms");
            }
        }

        stateLastUTCMs=Date.now();
    }
}

mainLoop();
