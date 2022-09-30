import {Point2D} from "./point";

export class PointerPoint extends Point2D {

    constructor(x: number, y: number, public pressure: number) {
        super(x, y);
    }
    toString(): string {
        return `(x:${this.x}, y:${this.y}, p:${this.pressure})`;
    }
}