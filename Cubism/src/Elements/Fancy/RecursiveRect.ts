import PointerHandlerParentElement from "../PointerHanderParentElement";
import {Colors} from "../../Theme/Colors";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Point2D} from "../../Datatypes/Point";
import {CubismElement} from "../CubismElement";
import PhysicalPoint2D from "../../Physics/Physics2D/PhysicalPoint2D";

export default class RecursiveRect extends PointerHandlerParentElement {
    lastPoint: PointerPoint | null = null;
    relativePosition: Point2D = new Point2D(200, 200);

    frameCount: number = 0;

    _position: PhysicalPoint2D = new PhysicalPoint2D(0, 0).setResistance(0.001);
    get position(): PhysicalPoint2D {
        if (this._cubism) {
            this.c.setRedraw(true);
        }

        return this._position;
    }

    set position(point: PhysicalPoint2D) {
        if (this._cubism) {
            this.c.setRedraw(true);
        }
        // this.c.setRedraw(true);
        this._position = point;
    }

    recursionCount: number = 0;
    wiggleStrength: number = 0.1;

    setRecursionCount(recursionCount: number) {
        this.recursionCount = recursionCount;
        return this;
    }

    wiggle() {
        if (this.frameCount % 120 == 0) {
            let range = this.wiggleStrength * Math.random();
            this.position.impulse(new Point2D(range * (Math.random() - 0.5), range * (Math.random() - 0.5)));
        }
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
        this.frameCount++;
        this.c.translate(this.position);

        this.position.update();
        if (!this.pressed) {
            this.wiggle();
        }
        if (this.pressed) {
            this.frameCount = 0;
        }

        // this.wiggle();
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
        if (point.pressure > 0) {
            if (!this.lastPoint) {
                this.lastPoint = point.sub(this.position);
            }
            this.position.set(point.sub(this.lastPoint));
        } else {
            this.lastPoint = null;
        }
    }
}