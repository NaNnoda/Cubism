/**
 * An Element with children
 */
import {CubismElement} from "./CubismElement";
import {Cubism} from "../Cubism";
import {Point2D} from "../Datatypes/Point";
import {LayoutValues} from "../Constants/Constants";

export default class CubismParentElement extends CubismElement {
    children: CubismElement[];

    constructor( elementId: string | null = null, ...children: CubismElement[] ) {
        super(elementId);
        this.children = [];
        this.addChildren(...children);
    }


    resize(targetSize: Point2D) {
        super.resize(targetSize);
        this.updateChildrenShape()
    }

    updateChildrenShape() {
        this.updateChildrenSize();
        this.updateChildrenPosition();
    }
    updateChildrenPosition() {

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

    addChildren(...children: CubismElement[]):this {
        for (let child of children) {
            this.children.push(child);
            if (this._cubism) {
                child.setCubism(this.cubism);
            }
        }
        return this;
    }
    removeChild(child: CubismElement): void {
        let index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    removeChildren(children: CubismElement[]): void {
        for (let child of children) {
            this.removeChild(child);
        }
    }

    draw() {
        super.draw();
        this.renderChildren();
    }

    renderChildren() {
        this.c.translate(this.position);
        for (let child of this.children) {
            child.draw();
        }
        this.c.restoreTranslate();
    }

    setCubism(cubism: Cubism) {
        super.setCubism(cubism);
        this.setChildrenCubism(cubism);
    }

    setChildrenCubism(cubism: Cubism) {
        for (let child of this.children) {
            child.setCubism(cubism);
        }
    }

    initElement(parentSize: Point2D) {
        super.initElement(parentSize);
        this.initChildren(parentSize);
    }

    initChildren(parentSize: Point2D) {
        for (let child of this.children) {
            child.initElement(parentSize);
        }
    }

}