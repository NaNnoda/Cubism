import {DraggableRect} from "./DraggableRect";
import {InteractiveElement} from "./InteractiveElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {PointerHandleableElement} from "./PointerHandleableElement";
import {CubismGlobalEventSystem} from "../../Events/CubismGlobalEventSystem";
import {CanvasDrawer} from "../../CanvasDrawer";
import {Point2D} from "../../Datatypes/Point";
import {PointerHandleableLayout} from "./Layouts/PointerHandleableLayout";

export class RectWithChild extends PointerHandleableLayout {
    background: string = "white";
    lineWidth: number = 1;

    setChild(child: PointerHandleableElement) {
        this.child = child;
        return this;
    }

    set child(child: PointerHandleableElement) {
        this.children = [child];
    }

    get child(): PointerHandleableElement {
        return this.children[0];
    }

    setLineWidth(lineWidth: number) {
        this.lineWidth = lineWidth;
        return this;
    }

    setBackgroundColor(color: string) {
        this.background = color;
        return this;
    }

    render() {

        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.background);
        c.setStrokeStyle("black");
        c.setStrokeWidth(this.lineWidth);
        c.translate(this.position);
        c.drawRect(0, 0, this.absWidth, this.absHeight);
        c.restoreTranslate();
        super.render();
    }
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