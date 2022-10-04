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

    mul(other: Point2D): Point2D {
        return new Point2D(this.x * other.x, this.y * other.y);
    }

    scale(n: number): Point2D {
        return new Point2D(this.x * n, this.y * n);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
