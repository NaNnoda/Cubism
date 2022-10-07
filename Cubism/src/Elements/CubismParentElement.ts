/**
 * An Element with children
 */
import {CubismElement} from "./CubismElement";
import {Cubism} from "../Cubism";

class CubismParentElement extends CubismElement {
    children: CubismElement[];

    constructor(children: CubismElement[] = [], elementId: string | null = null) {
        super(elementId);
        this.children = children;
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

    render() {
        super.render();
        this.renderChildren();
    }

    renderChildren() {
        for (let child of this.children) {
            child.render();
        }
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
}