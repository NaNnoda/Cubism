/**
 * An Element with children
 */
import {CubismElement} from "./CubismElement";
import {Cubism} from "../Cubism";

export default class CubismParentElement extends CubismElement {
    children: CubismElement[];

    constructor( elementId: string | null = null, ...children: CubismElement[] ) {
        super(elementId);
        this.children = [];
        this.addChildren(...children);
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