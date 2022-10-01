import {CanvasDrawer} from "./CanvasDrawer";
import {CubismGlobalEventSystem} from "./Events/CubismGlobalEventSystem";
import {CubismEventManager} from "./Events/CubismEventManager";
import {Values} from "./Constants/Constants";
import {Point2D} from "./Datatypes/Point";
import {PointerHandleableElement} from "./UI/Elements/PointerHandleableElement";
import {PointerPoint} from "./Datatypes/PointerPoint";

export class Cubism {
    root: PointerHandleableElement;
    canvasDrawer: CanvasDrawer;
    globalEvent: CubismGlobalEventSystem;
    eventManger: CubismEventManager;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.root = new PointerHandleableElement();
        this.globalEvent = new CubismGlobalEventSystem();
        this.canvasDrawer = new CanvasDrawer(canvas, this.globalEvent);
        this.eventManger = new CubismEventManager(this.globalEvent);
        this.canvas = canvas;


        this.registerRedraw();
        this.registerPointerEvents();
    }

    /**
     * Register pointer events
     */
    registerPointerEvents() {
        // on move
        this.canvas.onpointermove = (e) => {
            this.globalEvent.triggerGlobalEvent(Values.ON_MOVE, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }

        this.globalEvent.registerGlobalEvent(Values.ON_MOVE, (point: PointerPoint) => {
            this.root.triggerOnMove(point);
        });
        // on down
        this.canvas.onpointerdown = (e) => {
            this.globalEvent.triggerGlobalEvent(Values.ON_DOWN, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }

        this.globalEvent.registerGlobalEvent(Values.ON_DOWN, (point: PointerPoint) => {
            this.root.triggerOnDown(point);
        });
        // on up
        this.canvas.onpointerup = (e) => {
            this.globalEvent.triggerGlobalEvent(Values.ON_UP, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }

        this.globalEvent.registerGlobalEvent(Values.ON_UP, (point: PointerPoint) => {
            this.root.triggerOnUp(point);
        });
    }


    registerRedraw() {
        this.globalEvent.registerGlobalEvent(Values.REDRAW, this.update.bind(this));
    }

    registerOnMove() {
        this.globalEvent.registerGlobalEvent(Values.ON_MOVE, this.registerOnMove.bind(this));
    }

    // onMoveTrigger() {
    //     this.root.triggerOnParentMove();
    // }

    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new Cubism(canvas);
    }

    static createFromId(id: string) {
        return Cubism.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: PointerHandleableElement) {
        this.setRootElement(root);
        this.initRootElement();
        this.canvasDrawer.state.needsRedraw = true;
    }

    initRootElement() {
        this.root.init(
            this.canvasDrawer,
            new Point2D(this.canvas.width, this.canvas.height),
            this.globalEvent

        );
    }

    setRootElement(root: PointerHandleableElement) {
        this.root = root;
    }

    update() {
        this.canvasDrawer.clear();
        if (this.root) {
            this.root.render();
        }
    }
}

