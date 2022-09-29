import {Point2D} from "../../datatypes/point";
import {CubismElement} from "./CubismElement";
import {CanvasDrawer} from "../CanvasDrawer";

export class RectangleElement extends CubismElement {
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

    render(): void {
        super.render();
        let c = this.c as CanvasDrawer;
        c.setFillStyle(this.background);
        c.setStrokeStyle("black");
        c.setStrokeWidth(this.lineWidth);
        c.translate(this.position);
        c.drawRect(0, 0, this.size.x, this.size.y);
        c.restoreTranslate();
        c.restoreFillStyle();
    }
}
