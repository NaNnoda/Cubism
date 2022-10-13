
import {CubismEventSystem} from "./Global/Inter/CubismEventSystem";
import IGlobalHandler from "./Interface/IGlobalHandler";
import IHasCubism from "./Interface/IGlobalHandler";
import CubismPart from "./CubismPart";
import {triggerAsyncId} from "async_hooks";
import {EventKeys} from "./Constants/EventKeys";

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


        this.eventSystem.registerEvent(EventKeys.FPS_UPDATE, this.doFPSUpdate.bind(this));
        setInterval(this.triggerFPSUpdate.bind(this), 1000);

        this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.incrementFPS.bind(this));
        return this;
    }

    triggerFPSUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FPS_UPDATE, this.fps);
        this.resetFPSCounter();
    }

    doFPSUpdate(fps: number) {
        // console.log("FPS: " + fps);
    }

    fps: number = 0;

    resetFPSCounter() {
        this.fps = 0;
    }

    incrementFPS() {
        this.fps++;
    }

    getFPS() {
        return this.fps;
    }

    doFrameUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    }
    public initializeAlwaysRedraw() {

        this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
        return this;
    }
    triggerRedraw() {
        this.eventSystem.triggerEvent(EventKeys.REDRAW);
    }
}
