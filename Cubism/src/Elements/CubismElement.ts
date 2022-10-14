import {Point2D} from "../Datatypes/Point";
import {CanvasDrawer} from "../CanvasDrawer";
import {Cubism} from "../Cubism";
import {CubismEventSystem} from "../Global/Inter/CubismEventSystem";
import SizeKeys from "../Constants/SizeKeys";
import {needsRedrawAccessor} from "../NeedsRedraw";

/**
 * Base class for all elements that can be rendered on the canvas
 * With size, position, and global events
 */
export class CubismElement extends CubismEventSystem implements IDrawable {
    _position: Point2D;
    _size: Point2D;
    _absSize: Point2D; // Absolute size is the size of the element


    elementId: string | null = null;
    needsResize: boolean = true;

    constructor(elementId: string | null = null) {
        super();
        this._position = new Point2D(0, 0);
        this._size = new Point2D(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT);
        this._absSize = new Point2D(0, 0);
        // Optional id
        this.elementId = elementId;
    }

    /**
     * Set id for this element so that it can be accessed by the id
     * @param id
     */
    setId(id: string): this {
        this.elementId = id;
        if (this._cubism) {
            this._cubism.registerElementId(id, this);
        }
        return this;
    }

    /**
     * Set cubism instance for this element
     * @param cubism
     */
    setCubism(cubism: Cubism): void {
        super.setCubism(cubism);
        if (this.elementId !== null) {
            this.setId(this.elementId);
        }
    }

    /**
     * Set position of this element relative to parent
     * @param pos
     */
    @needsRedrawAccessor()
    set position(pos: Point2D) {
        this._position = pos;
        // this.c.setRedraw(true);
    }

    /**
     * Get position of this element relative to parent
     */
    get position(): Point2D {
        return this._position;
    }

    /**
     * Get a size description of this element
     * Not necessarily the size of the element
     */

    get size(): Point2D {
        return this._size;
    }

    /**
     * Set size of this element
     *
     * @param size size description
     */
    set size(size: Point2D) {
        this.setSizeFromXY(size.x, size.y);
    }

    setSizeFromXY(x: number, y: number): this {
        this.size.x = x;
        this.size.y = y;
        this.needsResize = true;
        return this;
    }

    /**
     * Get the actual size of this element
     */
    get absSize(): Point2D {
        return this._absSize;
    }

    /**
     * Set the actual size of this element
     * @param size
     */
    set absSize(size: Point2D) {
        this._absSize = size;
        this.c.setRedraw(true);
    }

    get height(): number {
        return this.size.y;
    }

    set height(y: number) {
        this.setSizeFromXY(this.width, y);
    }

    get width(): number {
        return this.size.x;
    }

    set width(x: number) {
        this.setSizeFromXY(x, this.height);
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


    /**
     * Resize this element to targetSize size
     * and mark it as resized
     * @param targetSize
     */
    resize(targetSize: Point2D) {
        this.resizeFromXY(targetSize.x, targetSize.y);
    }

    /**
     * Resize this element to targetSize size
     * and mark it as resized
     * @param x width
     * @param y height
     */
    resizeFromXY(x: number, y: number): void {
        this.absWidth = x;
        this.absHeight = y;
        this.needsResize = false;
    }

    /**
     * Get canvas drawer
     */
    get c(): CanvasDrawer {
        if (!this.cubism) {
            console.log(this.cubism)
            throw new Error(`Cubism instance not set for ${this}`);
        }
        return this.cubism.canvasDrawer;
    }

    /**
     * Render this element
     */
    draw(): void {
    }

    /**
     * Get a string representation of this element
     */
    toString(): string {
        return `[${this.elementId ? this.elementId : "NO ID"}]: ${this.className} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
    }

}
