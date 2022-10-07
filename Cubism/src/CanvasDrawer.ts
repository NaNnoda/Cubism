import {Point2D} from "./Datatypes/Point";
import {CubismCanvasState} from "./State";
import {GEventKeys} from "./Constants/Constants";
import CubismPart from "./CubismPart";
import {Cubism} from "./Cubism";

/**
 * Adaptor class for the canvas
 * with the ability to draw on it
 * and handle events
 */
export class CanvasDrawer extends CubismPart {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    get eventSystem() {
        return this.cubism.eventSystem;
    }

    state: CubismCanvasState; // the state of the canvas

    /**
     * Constructor of the CanvasDrawer
     * @param canvas the canvas to draw on
     */
    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.state = new CubismCanvasState(canvas, this.ctx);
    }
    setCubism(cubism: Cubism) {
        super.setCubism(cubism);

        this.registerFrameUpdate();
    }
    get width() {
        return this.canvas.width;
    }

    set width(width: number) {
        this.canvas.width = width;
    }

    get height() {
        return this.canvas.height;
    }

    set height(height: number) {
        this.canvas.height = height;
    }

    /**
     * Register the frame update event
     * @private
     */
    private registerFrameUpdate() {
        console.log("Registering frame update");
        this.eventSystem.registerGlobalEvent(GEventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
    }

    /**
     * Things to do on every frame update
     * @private
     */
    private frameUpdate() {
        // console.log("Frame update");
        if (this.state.needsRedraw) {
            this.triggerRedraw();
            this.state.needsRedraw = false;
        }
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Set the fill style(color) of the canvas
     * @param style the style to set
     */
    setFillStyle(style: string) {
        this.ctx.fillStyle = style;
    }

    /**
     * Set the stroke style(color) of the canvas
     * @param style the style to set
     */
    setStrokeStyle(style: string) {
        this.ctx.strokeStyle = style;
    }

    /**
     * Set the line width of the canvas
     * @param width
     */
    setStrokeWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    /**
     * Translate the canvas
     * @param offset
     */
    translate(offset: Point2D) {
        this.state.translate = offset;
    }

    /**
     * Restore translation and rotation to previous state
     */
    restoreTranslate() {
        this.state.restoreTranslate();
    }

    /**
     * Draw text on the canvas
     * @param text the text to draw
     * @param x the x position of the text
     * @param y the y position of the text
     */
    fillText(text: string, x: number, y: number) {
        this.ctx.fillText(text, x, y);
    }

    /**
     * Draw a line with two Point2Ds
     * @param begin the beginning of the line
     * @param end the end of the line
     */
    drawLineWithPoints(begin: Point2D, end: Point2D) {
        this.drawLine(begin.x, begin.y, end.x, end.y);
    }

    /**
     * Draw a line with four numbers
     * @param beginX the x position of the beginning of the line
     * @param beginY the y position of the beginning of the line
     * @param endX the x position of the end of the line
     * @param endY the y position of the end of the line
     */
    drawLine(beginX: number, beginY: number, endX: number, endY: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.closeDraw();
    }

    drawCircle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
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

    drawRectWithPoints(p1: Point2D, p2: Point2D | null = null) {
        if (p2 === null) {
            this.drawRect(0, 0, p1.x, p1.y);
        } else {
            this.drawRect(p1.x, p1.y, p2.x, p2.y);
        }
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

    /**
     * Draw an HTML Canvas Path on the canvas
     * @param path
     */
    drawPath(path: Path2D) {
        this.ctx.stroke(path);
    }

    /**
     * Close the drawing path
     */
    closeDraw() {
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    /**
     * Set the need redraw flag
     * @param redraw
     */
    setRedraw(redraw: boolean) {
        this.state.needsRedraw = redraw;
    }

    /**
     * Trigger a redraw event
     * Seems more responsive than setRedraw()
     */
    triggerRedraw() {
        this.eventSystem.triggerGlobalEvent(GEventKeys.REDRAW);
    }
}
