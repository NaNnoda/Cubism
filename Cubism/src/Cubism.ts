import {CanvasDrawer} from "./CanvasDrawer";
import {CubismEventSystem} from "./Global/Inter/CubismEventSystem";
import {EventKeys} from "./Constants/Constants";
import {Point2D} from "./Datatypes/Point";
import {PointerPoint} from "./Datatypes/PointerPoint";
import {CubismOuterGlobal} from "./Global/Outer/CubismOuterGlobal";
import CubismPart from "./CubismPart";
import CubismInitializer from "./CubismInitializer";
import CubismElementManger from "./CubismElementManger";
import {CubismElement} from "./Elements/CubismElement";

/**
 * Entry point of the application
 * Initializes different parts of the application
 */
export class Cubism extends CubismElementManger {
    _root: CubismElement | null = null;
    readonly canvas: HTMLCanvasElement;
    readonly cubismId: string;
    readonly canvasDrawer: CanvasDrawer;
    readonly eventSystem: CubismEventSystem;

    _initializer: CubismInitializer;
    get initializer() {
        return this._initializer;
    }

    get rootElement(): CubismElement {
        if (this._root === null) {
            throw new Error("Root is not set");
        }
        return this._root;
    }

    set rootElement(root) {

        this.initParts(root);
        this._root = root;
    }


    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.eventSystem = new CubismEventSystem();
        this.canvasDrawer = new CanvasDrawer(canvas);
        this._initializer = new CubismInitializer();

        this.initParts(this.canvasDrawer, this.eventSystem, this.initializer);
        this.registerRedraw();
        this.registerPointerEvents();


        if (canvas.id === null || canvas.id === undefined || canvas.id === "") {
            throw new Error("Canvas must have an id");
        }
        this.cubismId = canvas.id;

        CubismOuterGlobal.registerCubismInstance(this.cubismId, this);
    }

    initParts(...handlers: CubismPart[]) {
        handlers.forEach(handler => {
                handler.cubism = this;
                console.log("Init " + handler.constructor.name);
            }
        );
    }

    /**
     * Register pointer events
     */
    registerPointerEvents() {
        // on move
        this.canvas.onpointermove = (e) => {
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT,
                new PointerPoint(e.offsetX, e.offsetY, e.pressure)
            );
        }

        this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, (point: PointerPoint) => {
            this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
        });
        // on down
        this.canvas.onpointerdown = (e) => {
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }

        this.eventSystem.registerEvent(EventKeys.ON_POINTER_EVENT, (point: PointerPoint) => {
            this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
        });
        // on up
        this.canvas.onpointerup = (e) => {
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }

        this.eventSystem.registerEvent(EventKeys.ON_POINTER_EVENT, (point: PointerPoint) => {
            this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
        });
    }

    registerRedraw() {
        this.eventSystem.registerEvent(EventKeys.REDRAW, this.redraw.bind(this));
    }

    // registerOnMove() {
    //     this.eventSystem.registerEvent(EventKeys.ON_MOVE, this.registerOnMove.bind(this));
    // }

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

    init(root: CubismElement) {
        this.rootElement = root;
        this.initRootElement();
        this.canvasDrawer.setRedraw(true);
        this.initializer.initializeFrameUpdate();

        // this.initializer.initializeFPSCounter();
    }

    private initRootElement() {
        console.log("init root element");
        this.rootElement.initElement(
            new Point2D(this.canvas.width, this.canvas.height)
        );
    }

    /**
     * Redraw the whole canvas from the root element
     */
    redraw() {
        this.canvasDrawer.clear();
        if (this.rootElement) {
            this.rootElement.render();
        }
    }
}

