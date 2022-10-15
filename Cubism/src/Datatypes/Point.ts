/**
 * A representation of a point in 2D space.
 */
export class Point2D {
    arr: number[]

    constructor(x: number, y: number) {
        this.arr = [x, y];
    }

    get x() {
        return this.arr[0];
    }

    set x(value: number) {
        this.arr[0] = value;
    }

    get y() {
        return this.arr[1];
    }

    set y(value: number) {
        this.arr[1] = value;
    }

    clone(): Point2D {
        return new Point2D(this.x, this.y);
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    get max(){
        return Math.max(this.x, this.y);
    }
    get min(){
        return Math.min(this.x, this.y);
    }

    set(point: Point2D) {
        this.x = point.x;
        this.y = point.y;
        return this;
    }


    /**
     * Offset the point by the given amount.
     * @param offset
     */
    offset(offset: Point2D) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    }

    /**
     * Offset the point by the negative given amount.
     * @param offset
     */
    nOffset(offset: Point2D) {
        this.x -= offset.x;
        this.y -= offset.y;
        return this;
    }

    add(other: Point2D): Point2D {
        return this.clone().offset(other);
    }

    sub(other: Point2D): Point2D {
        return this.clone().nOffset(other);
    }

    subXY(x: number, y: number): Point2D {
        return this.sub(new Point2D(x, y));
    }

    mul(other: Point2D): Point2D {
        return new Point2D(this.x * other.x, this.y * other.y);
    }

    scale(n: number): Point2D {
        return new Point2D(this.x * n, this.y * n);
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    euclideanDistance(other: Point2D): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}
