import {PointerPoint} from "../../Datatypes/PointerPoint";
import {LayoutValues} from "../../Constants/Constants";
import {PointerHandleableElement} from "../PointerHandleableElement";
import {Cubism} from "../../Cubism";
import {Point2D} from "../../Datatypes/Point";

export class PointerHandleableLayout extends PointerHandleableElement {
    private _children: PointerHandleableElement[] = [];

    constructor(...children: PointerHandleableElement[]) {
        super();
        this._children.push(...children);
    }

    resize(targetSize: Point2D) {
        super.resize(targetSize);
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
            child.resize(new Point2D(x, y));
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

    draw() {
        super.draw();
        this.c.translate(this.position);
        for (let child of this.children) {
            child.draw();
        }
        this.c.restoreTranslate();
    }

    setCubism(cubism: Cubism) {
        super.setCubism(cubism);
        for (let child of this.children) {
            child.cubism = cubism;
        }
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