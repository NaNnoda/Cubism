import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";
import {CubismElement} from "./Basic/CubismElement";
import {Point2D} from "../Utils/Math/Point";
import {cubic, hermite} from "../Curve/Curve2D/Cubic";
import {IJMatrix} from "../Utils/Math/NNMatrix";

export class CurveElement extends CubismElement {
    // controlPoints: IPoint2D[] = [new Point2D(0, 0), new Point2D(20, 20), new Point2D(-40, 40), new Point2D(60, 60)];
    p0: IPoint2D = new Point2D(0, 0);
    d0: IPoint2D = new Point2D(0, 50);
    p1: IPoint2D = new Point2D(50, 20);
    d1: IPoint2D = new Point2D(20, 40);

    setD0(d0: IPoint2D) {
        this.d0 = d0;
        return this;
    }

    setD1(d1: IPoint2D) {
        this.d1 = d1;
        return this;
    }

    setP0(p0: IPoint2D) {
        this.p0 = p0;
        return this;
    }

    setP1(p1: IPoint2D) {
        this.p1 = p1;
        return this;
    }

    draw() {
        super.draw();

        let step = 0.01;
        let t = 0;
        let lastPoint = this.p0;

        this.c.drawCircle(this.p0.x, this.p0.y, 5);
        this.c.drawCircle(this.p1.x, this.p1.y, 5);
        this.c.drawCircle(this.d0.x, this.d0.y, 5);
        this.c.drawCircle(this.d1.x, this.d1.y, 5);

        while (t < 1) {
            let point = this.getPoint(t);
            this.c.drawRectWithPoints(lastPoint, point);
            lastPoint = point;
            t += step;
        }
    }

    getPoint(t: number): IPoint2D {
    let pointMatrix = new IJMatrix(4, 2)
        .set([
            this.p0.x, this.p0.y,
            this.d0.x, this.d0.y,
            this.p1.x, this.p1.y,
            this.d1.x, this.d1.y
        ]);

        let out = cubic(hermite,
            pointMatrix,
            t);

        return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
    }

    drawCurve() {

    }
}
