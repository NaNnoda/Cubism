import {Point2D} from "../../datatypes/point";
import {CanvasDrawer} from "../CanvasDrawer";

export class CubismElement implements IRenderable {
    position: Point2D;
    size: Point2D;
    c: CanvasDrawer | null;

    constructor() {
        this.position = new Point2D(0, 0);
        this.size = new Point2D(0, 0);
        this.c = null;
    }

    setCanvasDrawer(c: CanvasDrawer) {
        this.c = c;
    }

    setWidth(width: number) {
        this.size.x = width;
        return this;
    }

    setHeight(height: number) {
        this.size.y = height;
        return this;
    }

    setPosFromPoint(pos: Point2D) {
        this.position = pos;
        return this;
    }
    setPosFromXY(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    render(): void {
        if (this.c === null) {
            throw new Error("CubismElement.render(): CubismCanvasManager is null");
        }
    }
}
