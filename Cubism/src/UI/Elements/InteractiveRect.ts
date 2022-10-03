import {InteractiveElement} from "./InteractiveElement";
import {CanvasDrawer} from "../../CanvasDrawer";
import {PointerHandleableElement} from "./PointerHandleableElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Log} from "../../Debug/Log";
import {Values} from "../../Constants/Constants";

export class InteractiveRect extends PointerHandleableElement {
    constructor() {
        super();
    }

    onMove(point: PointerPoint) {
        super.onMove(point);
    }

    onDown(point: PointerPoint) {
        super.onDown(point);
        Log.logDebug("down on", this);
    }

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        // c.setFillStyle(currBackground)
        // c.setStrokeStyle(this.theme["stroke"]);
        // c.setStrokeWidth(this.theme["strokeWidth"]);
        c.translate(this.position);
        c.drawRectWithPoints(this.absSize);
        c.restoreTranslate();
    }
}