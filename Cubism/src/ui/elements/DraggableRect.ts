import {InteractiveRect} from "./InteractiveRect";
import {PointerPoint} from "../../datatypes/PointerPoint";
import {Point2D} from "../../datatypes/point";
import {Log} from "../../debug/Log";

export class DraggableRect extends InteractiveRect {
    private pointerRelativePosition: Point2D | null = null;

    onDown(point: PointerPoint) {
        super.onDown(point);
        this.pointerRelativePosition = new Point2D(point.x - this.position.x, point.y - this.position.y);
        // Log.logDebug("down on", this.pointerRelativePosition);
    }

    onParentMove(point: PointerPoint) {
        super.onParentMove(point);
        if (this.pointerRelativePosition !== null) {
            this.position = point.sub(this.pointerRelativePosition);
            // this.triggerOnMove(point);
            // this.globalEvent?.triggerGlobalEvent(Values.REDRAW, this);
            this.c?.triggerRedraw();
        }
        // this.position = point;
    }
    onUp(point: PointerPoint) {
        super.onUp(point);
        Log.logDebug("up on", this);
        this.pointerRelativePosition = null;
    }
}