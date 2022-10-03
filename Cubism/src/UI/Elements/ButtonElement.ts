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
        this.c?.setRedraw(true);
    }

    onEnter(point: PointerPoint) {
        super.onEnter(point);
        console.log("Enter" + this.elementName);
        this.c?.setRedraw(true);
    }

    //
    onDown(point: PointerPoint) {
        super.onDown(point);
        this.c?.setRedraw(true);
    }

    onUp(point: PointerPoint) {
        super.onUp(point);
        this.c?.setRedraw(true);
    }

    onLeave(point: PointerPoint) {
        super.onLeave(point);
        this.c?.setRedraw(true);
    }

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.fillText(this.text, 10, 30);
    }
}