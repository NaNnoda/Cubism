import {Point2D} from "../Datatypes/Point";
import {CanvasDrawer} from "../CanvasDrawer";
import {LayoutValues} from "../Constants/Constants";
import CubismPart from "../CubismPart";
import {Cubism} from "../Cubism";

/**
 * Base class for all elements that can be rendered on the canvas
 * With size, position, and global events
 */
export class CubismElement extends CubismPart implements IRenderable {
    _position: Point2D;
    _size: Point2D;
    _absSize: Point2D; // Absolute size is the size of the element

    get c(): CanvasDrawer {
        if (!this.cubism) {
            console.log(this.cubism)
            throw new Error("Cubism is not set for " + this);
        }
        return this.cubism.canvasDrawer;
    }

    elementId: string | null = null;
    needsResize: boolean = true;

    constructor(elementId: string | null = null) {
        super();
        this._position = new Point2D(0, 0);
        this._size = new Point2D(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT);
        this._absSize = new Point2D(0, 0);
        // Optional id
        this.elementId = elementId;
    }

    // set needsResize(needsResize: boolean) {
    //     this._needsResize = needsResize;
    //     if (this._needsResize) {
    //         this.c.setRedraw(true);
    //     }
    // }

    setId(id: string): this {
        this.elementId = id;
        return this;
    }

    setCubism(cubism: Cubism): void {
        super.setCubism(cubism);
        if (this.elementId !== null) {
            this.cubism.registerElementId(this.elementId, this);
        }
    }

    set position(pos: Point2D) {
        this._position = pos;
        this.c.setRedraw(true);
    }


    get position(): Point2D {
        return this._position;
    }

    get size(): Point2D {
        return this._size;
    }

    set size(size: Point2D) {
        this._size = size;
        this.needsResize = true;
    }


    get absSize(): Point2D {
        return this._absSize;
    }

    set absSize(size: Point2D) {
        this._absSize = size;
        this.c.setRedraw(true);
    }

    initElement(parentSize: Point2D): void {
        this.updateShape(parentSize.x, parentSize.y);
    }

    updateShape(x: number, y: number): void {
        this.absWidth = x;
        this.absHeight = y;
        this.needsResize = false;
    }


    get height(): number {
        return this.size.y;
    }

    set height(y: number) {
        this.size.y = y;
        this.needsResize = true;
    }

    get width(): number {
        return this.size.x;
    }

    set width(x: number) {
        this.size.x = x;
        this.needsResize = true;
    }

    get absWidth(): number {
        return this.absSize.x;
    }

    set absWidth(x: number) {
        this.absSize.x = x;
    }


    get absHeight(): number {
        return this.absSize.y;
    }

    set absHeight(y: number) {
        this.absSize.y = y;
    }

    setWidth(width: number) {
        this.width = width;
        this.needsResize = true;
        return this;
    }

    setHeight(height: number) {
        this.height = height;
        return this;
    }

    setPosFromPoint(pos: Point2D): this {
        this.position = pos;
        return this;
    }

    setPosFromXY(x: number, y: number): this {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    render(): void {
        if (this.c === null) {
            throw new Error("Drawer is null");
        }
    }

    toString(): string {
        return `${this.elementId ? this.elementId : "NO ID"}: ${this.className} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
    }

}
