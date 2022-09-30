import {PointerHandleableElement} from "./PointerHandleableElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {CanvasDrawer} from "../../CanvasDrawer";
import {InteractiveRect} from "./InteractiveRect";

export class ButtonElement extends InteractiveRect {
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    updateShape(x: number, y: number) {
        super.updateShape(x, y);
    }

    onMove(point: PointerPoint) {
        super.onMove(point);
    }

    onEnter(point: PointerPoint) {
        super.onEnter(point);
        this.background = "gray";
        this.c?.setRedraw(true);
    }

    onLeave(point: PointerPoint) {
        super.onLeave(point);
        this.background = "white";
        this.c?.setRedraw(true);
    }

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.fillText("hello", 0, 0);
    }
}