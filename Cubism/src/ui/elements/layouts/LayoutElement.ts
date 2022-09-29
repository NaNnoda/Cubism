import {CubismElement} from "../CubismElement";
import {CanvasDrawer} from "../../CanvasDrawer";

export class LayoutElement extends CubismElement {
    children: CubismElement[] = [];

    constructor(...children: CubismElement[]) {
        super();
        this.children = children;
    }

    render() {
        super.render();
        for (let child of this.children) {
            child.render();
        }
    }
    setCanvasDrawer(c: CanvasDrawer) {
        super.setCanvasDrawer(c);
        for (let child of this.children) {
            child.setCanvasDrawer(c);
        }
    }
}
