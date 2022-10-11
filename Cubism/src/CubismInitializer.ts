import {EventKeys} from "./Constants/Constants";
import {CubismEventSystem} from "./Global/Inter/CubismEventSystem";
import IGlobalHandler from "./Interface/IGlobalHandler";
import IHasCubism from "./Interface/IGlobalHandler";
import CubismPart from "./CubismPart";

export default class CubismInitializer extends CubismPart {
    get eventSystem(): CubismEventSystem {
        return this.cubism.eventSystem;
    }

    initializeFixedUpdate(timeInterval: number = 1000 / 60) {
        setInterval(this.doFixUpdate.bind(this), timeInterval);

        return this;
    }

    doFixUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FIX_UPDATE);
    }

    public initializeFrameUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
        return this;
    }

    public initializeFPSCounter() {
        setInterval(this.printFPS.bind(this), 1000);

        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE, this.incrementFPS.bind(this));
        return this;
    }

    fps: number = 0;

    resetFPSCounter() {
        this.fps = 0;
    }

    incrementFPS() {
        this.fps++;
    }

    printFPS() {
        console.log("FPS: " + this.getFPS());
        this.resetFPSCounter();
    }

    getFPS() {
        return this.fps;
    }

    doFrameUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    }
}