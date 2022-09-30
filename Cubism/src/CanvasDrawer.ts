import {Point2D} from "./Datatypes/Point";
import {CubismCanvasState} from "./State";
import {CubismGlobalEventSystem} from "./Events/CubismGlobalEventSystem";
import {Values} from "./Constants/Constants";

export class CanvasDrawer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    state: CubismCanvasState;

    globalEvent: CubismGlobalEventSystem;

    constructor(canvas: HTMLCanvasElement, globalEvent: CubismGlobalEventSystem) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.state = new CubismCanvasState(canvas, this.ctx);
        this.globalEvent = globalEvent;
        this.registerFrameUpdate();
    }

    private registerFrameUpdate() {
        this.globalEvent.registerGlobalEvent(Values.FRAME_UPDATE, this.frameUpdate.bind(this));
    }

    private frameUpdate() {
        // console.log("Frame update");
        if (this.state.needsRedraw) {
            console.log("this.state.needsRedraw: Redraw");
            this.globalEvent.triggerGlobalEvent(Values.REDRAW);
            this.state.needsRedraw = false;
        }
    }

    clear() {
        this.canvas.width = this.canvas.width;
    }

    setFillStyle(color: string) {
        this.ctx.fillStyle = color;
        this.state.fillStyle = color;
    }

    //
    // restoreFillStyle() {
    //     this.ctx.fillStyle = this.state.popFillStyle();
    // }

    translate(offset: Point2D) {
        this.state.translate = offset;
    }

    restoreTranslate() {
        this.state.restoreTranslate();
    }

    drawText(text: string, x: number, y: number) {
        this.ctx.fillText(text, x, y);
    }

    setStrokeStyle(color: string) {
        this.ctx.strokeStyle = color;
    }

    setStrokeWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    drawLineWithPoints(begin: Point2D, end: Point2D) {
        this.drawLine(begin.x, begin.y, end.x, end.y);
    }

    drawLine(beginX: number, beginY: number, endX: number, endY: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.closeDraw();
    }

    drawCircle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.state.lineWidth;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.closeDraw();
    }

    drawShape(points: Point2D[]) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.closeDraw();
    }

    drawRect(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.lineTo(width, height);
        this.ctx.lineTo(x, height);
        this.closeDraw();
    }

    drawPathString(path: string) {
        this.drawPath(new Path2D(path));
    }

    drawPath(path: Path2D) {
        this.ctx.stroke(path);
    }

    closeDraw() {
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }


    setRedraw(redraw: boolean) {
        this.state.needsRedraw = redraw;
    }

    triggerRedraw() {
        this.globalEvent.triggerGlobalEvent(Values.REDRAW);
    }
}
