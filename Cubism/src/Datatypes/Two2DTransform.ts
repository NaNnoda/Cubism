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
    constructor(public m11: number, public m12: number, public m21: number, public m22: number, public dx: number, public dy: number) {
        this.arr = [
            [m11, m12, dx],
            [m21, m22, dy],
            [0, 0, 1]
        ];
    }

    static makeFromArray(arr: number[][]): TwoDTransformMatrix {
        return new TwoDTransformMatrix(arr[0][0], arr[0][1], arr[1][0], arr[1][1], arr[0][2], arr[1][2]);
    }

    get(x: number, y: number): number {
        return this.arr[x][y];
    }

    set(x: number, y: number, value: number) {
        console.log(`Setting ${x}, ${y} to ${value}`);
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
        console.log(`Multiplying\n${this.toString()}\n with\n${other.toString()}`);
        let test:number[][] = [];
        for (let i = 0; i < 3; i++) {
            test.push([]);
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let dotProduct = 0;
                for (let k = 0; k < 3; k++) {
                    dotProduct += this.get(i, k) * other.get(k, j);
                }
                test[i].push(dotProduct);
                // newMatrix.set(i, j, dotProduct);
            }
        }

        console.log(`Result:\n${test[0]}\n${test[1]}\n${test[2]}`);
        let newMatrix = TwoDTransformMatrix.makeFromArray(test);
        console.log(`Result:\n${newMatrix.toString()}`);
        return newMatrix;
        // return this;
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

    static nMultiply(a: TwoDTransformMatrix, others: TwoDTransformMatrix): TwoDTransformMatrix {
        return a.clone().multiply(others);
    }

    toString(): string {
        return `(${this.m11}, ${this.m12}, ${this.dx})\n(${this.m21}, ${this.m22}, ${this.dy})`;
    }
}