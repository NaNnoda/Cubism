import PointerHandlerParentElement from "../Basic/PointerHanderParentElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Point2D} from "../../Utils/Math/Point";
import {IJMatrix} from "../../Utils/Math/NNMatrix";
import {cubic, dHermite, hermite} from "../../Curve/Curve2D/Cubic";
import {Colors} from "../../Constants/Colors";
import {CubismAnimation} from "../../Animation/Animation";

export class CurveCanvas extends PointerHandlerParentElement {
    _curves: IPoint2D[][] = [];
    _drawing: boolean = false;

    _isPlayingAnimation: boolean = false;
    animationLength: number = 300;

    circleSize = 10;

    mode = {
        draw: 0,
        move: 1
    }

    _currMode: number = this.mode.draw;

    set currMode(mode: number) {
        console.log("Setting mode to: ", mode);

        this._currMode = mode;
    }

    get currMode() {
        return this._currMode;
    }

    set drawing(drawing: boolean) {
        this._drawing = drawing;
    }

    changeToMoveMode() {
        this.currMode = this.mode.move;
    }

    changeToDrawMode() {
        this.currMode = this.mode.draw;
    }

    get drawing(): boolean {
        return this._drawing;
    }

    onDown(point: PointerPoint) {
        super.onDown(point);
        this.drawing = true;
        if (this._currMode === this.mode.draw) {
            this._curves.push([point.sub(this.position)]);
        }
    }

    onUp(point: PointerPoint) {
        super.onUp(point);
        this.drawing = false;
    }

    playAnimation() {
        console.log("Playing animation");
        if (this._isPlayingAnimation) {
            return;
        }
        let animation = new CubismAnimation(this.cubism, this.animationLength);
        this._isPlayingAnimation = true;
        animation.setAnimationEvent(this.animationCallback.bind(this));
        animation.setPlaying(true);
        this.c.setRedraw(true);
    }

    animationCallback(t: number) {
        // console.log("Animation callback: ", t);
        if (t === this.animationLength) {
            this._isPlayingAnimation = false;
            return;
        }
        let ratio = t / this.animationLength;

        if (this._curves.length === 0) {
            return;
        }


        this.c.offset(this.position);
        for (let i = 0; i < this._curves.length; i++) {
            let curve = this._curves[i];
            // for (let i = 0; i < Math.floor(curve.length * ratio); i++) {
            let point = curve[i];
            this.drawHermitCurve(curve, ratio);
            //     this.c.drawPoint(point, this.circleSize);
            // }
        }

        this.c.restoreTranslate();
    }

    onMove(point: PointerPoint) {
        super.onMove(point);
        // console.log("Drawing: ", this.drawing);
        let relaPoint = point.sub(this.position);
        if (this.drawing) {
            if (this._currMode === this.mode.draw) {
                let lastCurve = this._curves[this._curves.length - 1];
                let lastPoint = lastCurve[lastCurve.length - 1];
                if (Point2D.fromIPoint(lastPoint).manhattanDistance(relaPoint) > 80) {
                    lastCurve.push(relaPoint);
                }
            }
            if (this._currMode === this.mode.move) {
                let dragPoint = null;
                for (let curve of this._curves) {
                    for (let point of curve) {
                        if (Point2D.fromIPoint(point).euclideanDistance(relaPoint) < this.circleSize) {
                            dragPoint = point;
                            break;
                        }
                    }
                }

                if (dragPoint !== null) {
                    dragPoint.x = relaPoint.x;
                    dragPoint.y = relaPoint.y;
                }
            }
        }
        this.c.setRedraw(true);
    }

    undo() {
        if (this._curves.length > 0) {
            this._curves.pop();
            console.log(this._curves);
            console.log("Undoing");
        }
        this.c.setRedraw(true);
    }

    draw() {

        // console.log("Drawing curves: ", this._curves);
        super.draw();
        if (this._isPlayingAnimation) {
            console.log("Is playing");
            return;
        }

        this.c.offset(this.position);
        // this.c.setFillStyle("black");
        this.c.setStrokeStyle(Colors.white);
        this.c.setFillStyle(Colors.white);
        this.c.drawRect(0, 0, this.size.x, this.size.y);
        this.c.setStrokeStyle(Colors.black);
        if (this.currMode === this.mode.move) {
            this.c.setStrokeStyle(Colors.blue700);
            this.c.setStrokeWidth(3);
        }
        if (this.currMode === this.mode.draw) {
            this.c.setStrokeWidth(10);
        }
        for (let curve of this._curves) {
            this.drawHermitCurve(curve);

            if (this._currMode === this.mode.move) {
                for (let point of curve) {
                    this.c.drawPoint(point, this.circleSize);
                }
            }
        }
        this.c.restoreTranslate();
    }

    drawHermitCurve(points: IPoint2D[], ratio: number = 1) {
        let step = 0.01;
        let lastD = Point2D.zero;
        let fullEnd = points.length;
        let end = Math.floor(fullEnd * ratio);
        for (let i = 0; i < end - 1; i++) {
            let p0 = Point2D.fromIPoint(points[i]);
            let p1 = Point2D.fromIPoint(points[i + 1]);
            let t = 0;
            let lastPoint: IPoint2D = p0;

            let d0 = lastD;
            let d1 = null;
            if (i < end - 2) {
                let p2 = Point2D.fromIPoint(points[i + 2]);
                d1 = p2.sub(p0).scale(0.5);
            } else {
                d1 = p1.sub(p0).scale(0.5);
            }
            let segEnd = 1;
            let isEdge = false;
            if (i >= end - 2) {
                // console.log("Edge");
                isEdge = true;
                segEnd = fullEnd * ratio - end;
                // console.log("Seg end: ", segEnd);
            }
            while (t < segEnd) {
                if (isEdge) {
                    // console.log("Edge: ", t);
                    // this.c.setStrokeWidth(40 * (t));

                }
                if (this._isPlayingAnimation){
                    this.c.setStrokeWidth(10);
                    let currColor = `hsl(${ratio * 100}, ${100}%, ${50}%)`;
                    this.c.setStrokeStyle(currColor);
                }
                let point = this.getPoint(t, p0, p1, d0, d1);
                this.c.drawLineWithPoints(lastPoint, point);
                lastPoint = point;
                t += step;
            }
            lastD = d1;
        }
    }


    getTangent(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D): Point2D {
        let pointMatrix = new IJMatrix(4, 2)
            .set([
                p0.x, p0.y,
                d0.x, d0.y,
                p1.x, p1.y,
                d1.x, d1.y
            ]);
        let out = cubic(dHermite, pointMatrix, t);
        return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
    }

    getPoint(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D): IPoint2D {
        let pointMatrix = new IJMatrix(4, 2)
            .set([
                p0.x, p0.y,
                d0.x, d0.y,
                p1.x, p1.y,
                d1.x, d1.y
            ]);
        let out = cubic(hermite, pointMatrix, t);
        return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
    }

}