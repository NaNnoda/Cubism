import {CanvasDrawer} from "./CanvasDrawer";
import {CubismElement} from "./elements/CubismElement";
import {CubismGlobalEventSystem} from "./CubismGlobalEventSystem";
import {CubismEventManager} from "./CubismEventManager";
import {Values} from "../constants/constants";

export class Cubism implements IUpdatable {
    root: CubismElement;
    canvasDrawer: CanvasDrawer;
    globalEvent: CubismGlobalEventSystem;
    eventManger: CubismEventManager;

    constructor(canvas: HTMLCanvasElement) {
        this.root = new CubismElement();

        this.globalEvent = new CubismGlobalEventSystem();

        this.canvasDrawer = new CanvasDrawer(canvas, this.globalEvent);
        this.eventManger = new CubismEventManager(this.globalEvent);

        this.registerRedraw();
    }

    registerRedraw() {
        this.globalEvent.registerGlobalEvent(Values.REDRAW, this.update.bind(this));
    }

    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new Cubism(canvas);
    }

    static createFromId(id: string) {
        return Cubism.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: CubismElement) {
        // this.canvasDrawer.clear();
        this.setRootElement(root);
        this.setElementCanvas();
        this.canvasDrawer.state.needsRedraw = true;

        // this.update();
    }

    setElementCanvas() {
        this.root.setCanvasDrawer(this.canvasDrawer);
    }

    setRootElement(root: CubismElement) {
        this.root = root;
    }

    update() {
        this.canvasDrawer.clear();
        if (this.root) {
            this.root.render();
        }
    }
}

