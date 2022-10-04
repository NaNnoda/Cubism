import {ThemedElement} from "./ThemedElement";
import {PointerPoint} from "../Datatypes/PointerPoint";
import {Point2D} from "../Datatypes/Point";

export class DraggableRect extends ThemedElement {
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
            this.c?.triggerRedraw();
        }
    }
    onUp(point: PointerPoint) {
        super.onUp(point);
        // Log.logDebug("up on", this);
        this.pointerRelativePosition = null;
    }
}