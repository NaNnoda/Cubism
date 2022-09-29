import {CanvasDrawer} from "./CanvasDrawer";
import {CubismElement} from "./elements/CubismElement";

export class CubismCanvasManager extends CanvasDrawer implements IUpdatable {
    root: CubismElement;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.root = new CubismElement();
    }

    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new CubismCanvasManager(canvas);
    }

    static createFromId(id: string) {
        return CubismCanvasManager.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: CubismElement) {
        this.clear();
        this.setRootElement(root);
        this.setElementCanvas();
        this.update();
    }

    setElementCanvas() {
        this.root.setCanvasDrawer(this);
    }

    setRootElement(root: CubismElement) {
        this.root = root;
    }

    update() {
        if (this.root) {
            this.root.render();
        }
    }
}

