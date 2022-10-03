import {CanvasDrawer} from "./CanvasDrawer";
import {CubismGlobalEventSystem} from "./Events/CubismGlobalEventSystem";
import {CubismEventManager} from "./Events/CubismEventManager";
import {Values} from "./Constants/Constants";
import {Point2D} from "./Datatypes/Point";
import {PointerHandleableElement} from "./UI/Elements/PointerHandleableElement";
import {PointerPoint} from "./Datatypes/PointerPoint";

/**
 * Entry point of the application
 */
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
        this.globalEvent.registerGlobalEvent(Values.REDRAW, this.redraw.bind(this));
    }

    registerOnMove() {
        this.globalEvent.registerGlobalEvent(Values.ON_MOVE, this.registerOnMove.bind(this));
    }

    /**
     * Create a new Cubism object from a canvas object
     * @param canvas the canvas to draw on
     */
    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new Cubism(canvas);
    }

    /**
     * Create a new Cubism object from a canvas id
     * @param id the id of the canvas
     */
    static createFromId(id: string) {
        return Cubism.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: PointerHandleableElement) {
        this.setRootElement(root);
        this.initRootElement();
        this.canvasDrawer.setRedraw(true);
    }

    private initRootElement() {
        this.root.init(
            this.canvasDrawer,
            new Point2D(this.canvas.width, this.canvas.height),
            this.globalEvent
        );
    }

    /**
     * Set the root element of the application
     * @param root
     * @private
     */
    private setRootElement(root: PointerHandleableElement) {
        this.root = root;
    }

    /**
     * Redraw the whole canvas from the root element
     */
    redraw() {
        this.canvasDrawer.clear();
        if (this.root) {
            this.root.render();
        }
    }
}

