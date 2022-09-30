import {Point2D} from "../datatypes/point";
import {CubismState} from "./State";
import {CubismGlobalEventSystem} from "./CubismGlobalEventSystem";
import {Values} from "../constants/constants";

export class CanvasDrawer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    state: CubismState;

    globalEvent: CubismGlobalEventSystem;

    constructor(canvas: HTMLCanvasElement, globalEvent: CubismGlobalEventSystem) {
        this.state = new CubismState();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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

    // fixedUpdate() {
    //     // this.state.needsRedraw = true;
    //     console.log("Fixed update");
    // }

    clear() {
        this.canvas.width = this.canvas.width;
    }

    setFillStyle(color: string) {
        this.ctx.fillStyle = color;
        this.state.fillStyle = color;
    }

    restoreFillStyle() {
        this.ctx.fillStyle = this.state.popFillStyle();
    }

    translate(offset: Point2D) {
        console.log("translate", offset);
        this.state.translate = offset;
        this.ctx.translate(offset.x, offset.y);
    }

    restoreTranslate() {
        let lastTranslate = this.state.popTranslate();
        console.log("restoreTranslate", lastTranslate.x, lastTranslate.y);
        this.ctx.translate(-lastTranslate.x, -lastTranslate.y);
    }

    drawText(text: string, x: number, y: number) {
        this.ctx.fillText(text, x, y);
    }

    setStrokeStyle(color: string) {
        this.ctx.strokeStyle = color;
        this.state.strokeStyle = color;
    }

    restoreStrokeStyle() {
        this.ctx.strokeStyle = this.state.popStrokeStyle();
    }

    setStrokeWidth(width: number) {
        this.ctx.lineWidth = width;
        this.state.lineWidth = width;
    }

    restoreStrokeWidth() {
        this.ctx.lineWidth = this.state.popLineWidth();
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
}
