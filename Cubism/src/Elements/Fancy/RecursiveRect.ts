import PointerHandlerParentElement from "../PointerHanderParentElement";
import {Colors} from "../../Theme/Colors";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Point2D} from "../../Datatypes/Point";
import {CubismElement} from "../CubismElement";

export default class RecursiveRect extends PointerHandlerParentElement {
    lastPoint: PointerPoint | null = null;
    relativePosition: Point2D = new Point2D(200, 200);

    recursionCount: number = 0;
    wiggleStrength: number = 0.1;

    setRecursionCount(recursionCount: number) {
        this.recursionCount = recursionCount;
        return this;
    }

    wiggle() {
        let range = this.wiggleStrength;
        this.position = this.position.add(new Point2D(range * (Math.random() - 0.5), range * (Math.random() - 0.5)));
    }

    setWiggleStrength(strength: number) {
        this.wiggleStrength = strength;
        return this;
    }

    setRelativePosition(point: Point2D) {
        this.relativePosition = point;
        return this;
    }

    draw() {
        this.c.translate(
            this.position
        );
        this.wiggle();
        this.c.setFillStyle(Colors.green100);
        this.c.setStrokeWidth(2);
        this.c.setStrokeStyle(Colors.green700);
        let relaPos = this.position.sub(this.relativePosition);
        let relaSpeed = 0.2;
        let relaSize = 10;
        this.c.drawRect(0, 0, this.width, this.height);
        for (let i = 1; i < this.recursionCount + 1; i++) {
            let relaSpeedI = relaSpeed * i;
            let relaSizeI = relaSize * i;
            this.c.translate(relaPos.scale(relaSpeedI));
            this.c.drawRect(relaSizeI, relaSizeI, this.width - relaSizeI, this.height - relaSizeI);
            this.c.restoreTranslate();
        }
        this.c.restoreTranslate();
    }

    onMove(point: PointerPoint) {
        // console.log("onMove");
        if (point.pressure > 0) {
            if (!this.lastPoint) {
                this.lastPoint = point.sub(this.position);
            }
            this.position = point.sub(this.lastPoint);
        } else {
            this.lastPoint = null;
        }
    }
}
