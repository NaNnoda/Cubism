import {CanvasDrawer} from "./CanvasDrawer";
import {CubismElement} from "./elements/CubismElement";
import {CubismGlobalEventSystem} from "./CubismGlobalEventSystem";

export class CubismCanvasManager implements IUpdatable {
    root: CubismElement;

    canvasDrawer: CanvasDrawer;
    globalEvent: CubismGlobalEventSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.root = new CubismElement();
        this.canvasDrawer = new CanvasDrawer(canvas);
        this.globalEvent = new CubismGlobalEventSystem();
    }

    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new CubismCanvasManager(canvas);
    }

    static createFromId(id: string) {
        return CubismCanvasManager.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: CubismElement) {
        this.canvasDrawer.clear();
        this.setRootElement(root);
        this.setElementCanvas();
        this.update();
    }

    setElementCanvas() {
        this.root.setCanvasDrawer(this.canvasDrawer);
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

