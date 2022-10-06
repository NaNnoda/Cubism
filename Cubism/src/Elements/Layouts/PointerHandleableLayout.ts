import {PointerPoint} from "../../Datatypes/PointerPoint";
import {LayoutValues} from "../../Constants/Constants";
import {PointerHandleableElement} from "../PointerHandleableElement";
import {Cubism} from "../../Cubism";

export class PointerHandleableLayout extends PointerHandleableElement {
    private _children: PointerHandleableElement[] = [];

    constructor(...children: PointerHandleableElement[]) {
        super();
        this._children.push(...children);
    }

    updateShape(x: number, y: number) {
        super.updateShape(x, y);
        this.updateChildrenShape()
    }

    updateChildrenShape() {
        this.updateChildrenSize();
        this.updateChildrenPosition();
    }

    updateChildrenSize() {
        for (let child of this.children) {
            let x = child.width;
            let y = child.height;
            if (x === LayoutValues.MATCH_PARENT) {
                x = this.absWidth;
            }
            if (y === LayoutValues.MATCH_PARENT) {
                y = this.absHeight;
                console.log("this.absHeight", this.absHeight);
            }
            child.updateShape(x, y);
        }
    }

    updateChildrenPosition() {

    }

    get children(): PointerHandleableElement[] {
        return this._children;
    }

    set children(children: PointerHandleableElement[]) {
        this._children = children;
    }

    pushChildren(...children: PointerHandleableElement[]): PointerHandleableLayout {
        for (let child of children) {
            child.cubism = this.cubism;
            this.children.push(child);
        }
        this.updateChildrenShape();
        return this;
    }

    removeChild(child: PointerHandleableElement): void {
        this.children.splice(this.children.indexOf(child), 1);
    }

    render() {
        super.render();
        this.c.translate(this.position);
        for (let child of this.children) {
            child.render();
        }
        this.c.restoreTranslate();
    }

    set cubism(cubism: Cubism) {
        super.cubism = cubism;

        this._cubism = cubism;
        if (this.cubismId){
            // this.cubism.registerElementId(this.cubismId, this);
        }
        // console.log("set cubism", this.cubism);
        for (let child of this.children) {
            child.cubism = cubism;
        }
    }

    /**
     * It seems like I have to override both getter and setter
     */
    get cubism() {
        if (!this._cubism) {
            throw new Error("cubism is not set in " + this.constructor.name);
        }
        return this._cubism;
    }


    triggerOnMove(point: PointerPoint): void {
        super.triggerOnMove(point);
        let pointInChild = point.sub(this.position);
        for (let child of this.children) {
            child.triggerOnParentMove(pointInChild);
        }
    }

    triggerOnDown(point: PointerPoint): void {
        super.triggerOnDown(point);
        let pointInChild = new PointerPoint(point.x - this.position.x, point.y - this.position.y, point.pressure);
        for (let child of this.children) {
            child.triggerOnParentDown(pointInChild);
        }
    }

    triggerOnUp(point: PointerPoint): void {
        super.triggerOnUp(point);
        let pointInChild = point.sub(this.position);
        for (let child of this.children) {
            child.triggerOnParentUp(pointInChild);
        }
    }
}