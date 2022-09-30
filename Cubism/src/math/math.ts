let seed = 0;

export function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function setSeed(newSeed: number) {
    seed = newSeed;
}


export class Matrix3D {
    arr: number[][] = [];

    constructor(
        public a: number, public b: number, public c: number,
        public d: number, public e: number, public f: number,
        public g: number, public h: number, public i: number
    ) {
        this.arr = [
            [a, b, c],
            [d, e, f],
            [g, h, i]
        ];
    }

    get(x: number, y: number): number {
        return this.arr[x][y];
    }

    set(x: number, y: number, value: number) {
        this.arr[x][y] = value;
    }

    static identity(): Matrix3D {
        return new Matrix3D(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    static translation(x: number, y: number): Matrix3D {
        return new Matrix3D(1, 0, 0, 0, 1, 0, x, y, 1);
    }

    static rotation(angle: number): Matrix3D {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return new Matrix3D(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
    }

    static scale(x: number, y: number): Matrix3D {
        return new Matrix3D(x, 0, 0, 0, y, 0, 0, 0, 1);
    }

    static multiply(a: Matrix3D, b: Matrix3D): Matrix3D {
        let newMatrix = Matrix3D.identity();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += a.get(i, k) * b.get(k, j);
                }
                newMatrix.set(i, j, sum);
            }
        }
        return newMatrix;
    }
}