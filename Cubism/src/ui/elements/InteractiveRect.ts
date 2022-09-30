import {InteractiveElement} from "./InteractiveElement";
import {CanvasDrawer} from "../CanvasDrawer";
import {PointerHandleableElement} from "./PointerHandleableElement";
import {PointerPoint} from "../../datatypes/PointerPoint";
import {Log} from "../../debug/Log";
import {Values} from "../../constants/constants";

export class InteractiveRect extends PointerHandleableElement {
    background: string;
    lineWidth: number;

    constructor() {
        super();
        this.background = "white";
        this.lineWidth = 10;
    }

    setLineWidth(width: number) {
        this.lineWidth = width;
        return this;
    }

    setBackgroundColor(color: string) {
        this.background = color;
        return this;
    }

    onMove(point: PointerPoint) {
        super.onMove(point);
        // Log.logDebug("hover on", this);

    }

    onDown(point: PointerPoint) {
        super.onDown(point);
        Log.logDebug("down on", this);
    }

    toString(): string {
        return super.toString() + ` background:${this.background} lineWidth:${this.lineWidth}`;
    }

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.background);
        c.setStrokeStyle("black");
        c.setStrokeWidth(this.lineWidth);
        c.translate(this.position);
        c.drawRect(0, 0, this.absWidth, this.absHeight);
        c.restoreTranslate();
        c.restoreFillStyle();
    }
}