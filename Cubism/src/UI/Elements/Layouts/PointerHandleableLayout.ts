import {CanvasDrawer} from "../../../CanvasDrawer";
import {PointerPoint} from "../../../Datatypes/PointerPoint";
import {LayoutValues} from "../../../Constants/Constants";
import {PointerHandleableElement} from "../PointerHandleableElement";
import {CubismGlobalEventSystem} from "../../../Events/CubismGlobalEventSystem";

export class PointerHandleableLayout extends PointerHandleableElement {
    private _children: PointerHandleableElement[] = [];

    constructor(...children: PointerHandleableElement[]) {
        super();
        this._children = children;
    }

    setGlobalEventSystem(globalEvent: CubismGlobalEventSystem) {
        super.setGlobalEventSystem(globalEvent);
        for (let child of this.children) {
            child.setGlobalEventSystem(globalEvent);
        }
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
        this.children.push(...children);
        return this;
    }

    removeChild(child: PointerHandleableElement): void {
        this.children.splice(this.children.indexOf(child), 1);
    }

    render() {
        super.render();
        this.c?.translate(this.position);
        for (let child of this.children) {
            child.render();
        }
        this.c?.restoreTranslate();
    }

    setCanvasDrawer(c: CanvasDrawer) {
        super.setCanvasDrawer(c);
        for (let child of this.children) {
            child.setCanvasDrawer(c);
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