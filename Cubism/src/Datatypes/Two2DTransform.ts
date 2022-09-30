/**
 * A class representing a 2D transformation matrix.
 */
export class TwoDTransformMatrix {
    arr: number[][] = [];

    /**
     * Creates a new 2D transform matrix.
     * @param m11 Horizontal scaling. A value of 1 results in no scaling.
     * @param m12 Vertical skewing.
     * @param m21 Horizontal skewing.
     * @param m22 Vertical scaling. A value of 1 results in no scaling.
     * @param dx  Horizontal translation (moving).
     * @param dy Vertical translation (moving).
     */
    constructor(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
        this.arr = [
            [m11, m12, dx],
            [m21, m22, dy],
            [0, 0, 1]
        ];
    }

    get m11(): number {
        return this.arr[0][0];
    }

    set m11(value: number) {
        this.arr[0][0] = value;
    }

    get m12(): number {
        return this.arr[0][1];
    }

    set m12(value: number) {
        this.arr[0][1] = value;
    }

    get m21(): number {
        return this.arr[1][0];
    }

    set m21(value: number) {
        this.arr[1][0] = value;
    }

    get m22(): number {
        return this.arr[1][1];
    }

    set m22(value: number) {
        this.arr[1][1] = value;
    }

    get dx(): number {
        return this.arr[0][2];
    }

    set dx(value: number) {
        this.arr[0][2] = value;
    }

    get dy(): number {
        return this.arr[1][2];
    }

    set dy(value: number) {
        this.arr[1][2] = value;
    }


    static makeFromArray(arr: number[][]): TwoDTransformMatrix {
        return new TwoDTransformMatrix(arr[0][0], arr[0][1], arr[1][0], arr[1][1], arr[0][2], arr[1][2]);
    }

    get(x: number, y: number): number {
        return this.arr[x][y];
    }

    set(x: number, y: number, value: number) {
        // console.log(`Setting ${x}, ${y} to ${value}`);
        this.arr[x][y] = value;
    }

    static identity(): TwoDTransformMatrix {
        return new TwoDTransformMatrix(1, 0, 0, 1, 0, 0);
    }

    static zero(): TwoDTransformMatrix {
        return new TwoDTransformMatrix(0, 0, 0, 0, 0, 0);
    }

    static translation(x: number, y: number): TwoDTransformMatrix {
        return new TwoDTransformMatrix(1, 0, 0, 1, x, y);
    }

    static rotation(angle: number): TwoDTransformMatrix {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return new TwoDTransformMatrix(cos, -sin, sin, cos, 0, 0);
    }

    static scale(x: number, y: number): TwoDTransformMatrix {
        return new TwoDTransformMatrix(x, 0, 0, y, 0, 0);
    }

    clone(): TwoDTransformMatrix {
        return new TwoDTransformMatrix(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy);
    }

    multiply(other: TwoDTransformMatrix): TwoDTransformMatrix {
        let newMatrix = TwoDTransformMatrix.zero();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let dotProduct = 0;
                for (let k = 0; k < 3; k++) {
                    dotProduct += this.get(i, k) * other.get(k, j);
                }
                newMatrix.set(i, j, dotProduct);
            }
        }
        return newMatrix;
    }

    translate(x: number, y: number): TwoDTransformMatrix {
        return this.multiply(TwoDTransformMatrix.translation(x, y));
    }

    rotate(angle: number): TwoDTransformMatrix {
        return this.multiply(TwoDTransformMatrix.rotation(angle));
    }

    scale(x: number, y: number): TwoDTransformMatrix {
        return this.multiply(TwoDTransformMatrix.scale(x, y));
    }

    toString(): string {
        return `(${this.m11}, ${this.m12}, ${this.dx})\n(${this.m21}, ${this.m22}, ${this.dy})`;
    }
}