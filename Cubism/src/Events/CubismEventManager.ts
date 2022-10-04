import {GEventKeys, Values} from "../Constants/Constants";
import {CubismGlobalEventSystem} from "./CubismGlobalEventSystem";

export class CubismEventManager{
    globalEvent: CubismGlobalEventSystem;
    constructor(globalEvent: CubismGlobalEventSystem) {
        this.globalEvent = globalEvent;
        this.startFixedUpdate();
        this.startFrameUpdate();
    }
    startFixedUpdate() {
        setInterval(this.doFixUpdate.bind(this), 1000 / 60);
    }
    doFixUpdate() {
        this.globalEvent.triggerGlobalEvent(GEventKeys.FIX_UPDATE);
    }

    startFrameUpdate() {
        this.globalEvent.triggerGlobalEvent(GEventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.startFrameUpdate.bind(this));
    }
}