import {Point2D} from "./Datatypes/Point";
import {TwoDTransformMatrix} from "./Datatypes/Two2DTransform";

export class CubismCanvasState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        // this.lineWidths = [1];
        // this.fillStyles = ['black'];
        // this.strokeStyles = ['black'];
    }

    private lineWidths: number[] = [10];

    set lineWidth(lineWidth: number) {
        this.lineWidths.push(lineWidth);
    }

    get lineWidth() {
        return this.lineWidths[this.lineWidths.length - 1];
    }

    popLineWidth() {
        if (this.lineWidths.length > 1) {
            this.lineWidths.pop();
        }
        return this.lineWidth;
    }

    private fillStyles: string[] = ["gray"];

    set fillStyle(style: string) {
        this.fillStyles.push(style);
    }

    get fillStyle() {
        return this.fillStyles[this.fillStyles.length - 1];
    }


    private translates: TwoDTransformMatrix[] = [TwoDTransformMatrix.identity()];

    set translate(offset: Point2D) {
        console.log("set translate", offset.x, offset.y);
        let newTranslate = TwoDTransformMatrix.translation(offset.x, offset.y);
        // let translateMatrix = this.translateMatrix.clone().translate(offset.x, offset.y);
        let translateMatrix = this.translateMatrix.clone().multiply(newTranslate);
        this.translates.push(translateMatrix);
        console.log("translate matrix: \n"+ translateMatrix);
        this.setCtxTransform(translateMatrix);
    }

    setCtxTransform(t: TwoDTransformMatrix) {
        this.ctx.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
    }

    restoreTranslate() {
        let lastTranslate = this.popTranslate();
        console.log("restore translate", lastTranslate);
        this.setCtxTransform(lastTranslate);
    }

    get translateMatrix(): TwoDTransformMatrix {
        return this.translates[this.translates.length - 1];
    }

    popTranslate(): TwoDTransformMatrix {
        if (this.translates.length > 1) {
            console.log("pop translate");
            return this.translates.pop() as TwoDTransformMatrix;
        }
        return this.translates[0];
    }

    _needsRedraw: boolean = true;
    get needsRedraw() {
        return this._needsRedraw;
    }

    set needsRedraw(value: boolean) {
        this._needsRedraw = value;
    }

}
