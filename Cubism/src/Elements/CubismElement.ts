import {Point2D} from "../Datatypes/Point";
import {CanvasDrawer} from "../CanvasDrawer";
import {CubismGlobalEventSystem} from "../Events/CubismGlobalEventSystem";
import {LayoutValues} from "../Constants/Constants";

/**
 * Base class for all elements that can be rendered on the canvas
 * With size, position, and global events
 */
export class CubismElement implements IRenderable {
    _position: Point2D;
    _size: Point2D;
    _absSize: Point2D; // Absolute size is the size of the element
    c: CanvasDrawer | null;
    globalEvent: CubismGlobalEventSystem | null = null;

    needsResize: boolean;

    constructor() {
        this._position = new Point2D(0, 0);
        this._size = new Point2D(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT);
        this._absSize = new Point2D(0, 0);
        this.c = null;

        this.needsResize = true;
    }

    set position(pos: Point2D) {
        this._position = pos;
        this.c?.setRedraw(true);
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
        this.c?.setRedraw(true);
    }

    get absSize(): Point2D {
        return this._absSize;
    }

    set absSize(size: Point2D) {
        this._absSize = size;
        this.c?.setRedraw(true);
    }

    init(c: CanvasDrawer, parentSize: Point2D, globalEvent: CubismGlobalEventSystem): void {
        this.setCanvasDrawer(c);
        this.updateShape(parentSize.x, parentSize.y);
        this.setGlobalEventSystem(globalEvent);
    }

    setGlobalEventSystem(globalEvent: CubismGlobalEventSystem): void {
        this.globalEvent = globalEvent;
    }

    updateShape(x: number, y: number): void {
        this.absWidth = x;
        this.absHeight = y;
        this.needsResize = false;
    }


    get height(): number {
        return this.size.y;
    }

    set height(y:number) {
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

    setCanvasDrawer(c: CanvasDrawer): void {
        this.c = c;
    }

    setWidth(width: number){
        this.width = width;
        // this.absWidth = -1;
        return this;
    }

    setHeight(height: number) {
        this.height = height;
        // this.absHeight = -1;
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
    toString(): string {
        return `${this.elementName} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
    }

    get elementName(): string {
        return this.constructor.name;
    }
}