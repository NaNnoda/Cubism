import {GEventKeys} from "./Constants/Constants";
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
        this.eventSystem.triggerGlobalEvent(GEventKeys.FIX_UPDATE);
    }

    public initializeFrameUpdate() {
        this.eventSystem.triggerGlobalEvent(GEventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));

        return this;
    }

    doFrameUpdate() {
        this.eventSystem.triggerGlobalEvent(GEventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    }
}