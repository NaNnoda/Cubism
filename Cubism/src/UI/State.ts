import {Point2D} from "../Datatypes/Point";

export class CubismState {
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

    popFillStyle() {
        if (this.fillStyles.length > 1) {
            this.fillStyles.pop();
        }
        return this.fillStyle;
    }


    private strokeStyles: string[] = ["black"];

    set strokeStyle(style: string) {
        this.strokeStyles.push(style);
    }

    get strokeStyle() {
        return this.strokeStyles[this.strokeStyles.length - 1];
    }

    popStrokeStyle() {
        if (this.strokeStyles.length > 1) {
            this.strokeStyles.pop();
        }
        return this.strokeStyle;
    }

    private translates: Point2D[] = [new Point2D(0, 0)];

    set translate(offset: Point2D) {
        console.log("set translate", offset.x, offset.y);
        this.translates.push(offset);
        console.log("Current translates", this.translates);
        console.log("Size", this.translates.length);
    }

    get translate() {
        return this.translates[this.translates.length - 1];
    }

    popTranslate() {
        if (this.translates.length > 1) {
            this.translates.pop();
        }
        return this.translate;
    }

    _needsRedraw: boolean = true;
    get needsRedraw() {
        return this._needsRedraw;
    }

    set needsRedraw(value: boolean) {
        this._needsRedraw = value;
    }
}
