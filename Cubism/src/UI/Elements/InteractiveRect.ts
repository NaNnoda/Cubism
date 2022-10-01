import {InteractiveElement} from "./InteractiveElement";
import {CanvasDrawer} from "../../CanvasDrawer";
import {PointerHandleableElement} from "./PointerHandleableElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Log} from "../../Debug/Log";
import {Values} from "../../Constants/Constants";
import {TName} from "../../Theme/Theme";

export class InteractiveRect extends PointerHandleableElement {
    constructor() {
        super();
    }

    setLineWidth(width: number) {
        this.theme[TName.STROKE_WIDTH] = width;
        return this;
    }

    setBackgroundColor(color: string) {
        this.theme[TName.BACKGROUND] = color;
        return this;
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
        c.setFillStyle(this.theme[TName.BACKGROUND]);
        if (this.hovered) {
            c.setFillStyle(this.theme[TName.HOVER]);
        }
        if (this.pressed) {
            c.setFillStyle(this.theme[TName.ON_CLICK]);
        }
        // c.setFillStyle(currBackground)
        c.setStrokeStyle(this.theme["stroke"]);
        c.setStrokeWidth(this.theme["strokeWidth"]);
        c.translate(this.position);
        c.drawRect(0, 0, this.absWidth, this.absHeight);
        c.restoreTranslate();
    }
}