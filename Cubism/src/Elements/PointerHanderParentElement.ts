import CubismParentElement from "./CubismParentElement";
import {Point2D} from "../Datatypes/Point";
import {EventKeys} from "../Constants/Constants";
import {PointerPoint} from "../Datatypes/PointerPoint";
import {CubismElement} from "./CubismElement";

export default class PointerHandlerParentElement extends CubismParentElement {
    _pointerWasInRange: boolean = false;
    _hovered: boolean = false;
    _pressed: boolean = false;

    get pressed(): boolean {
        return this._pressed;
    }

    set pressed(value: boolean) {
        this._pressed = value;
    }

    get hovered(): boolean {
        return this._hovered;
    }

    set hovered(value: boolean) {
        this._hovered = value;
    }

    constructor(id: string | null, ...children: CubismElement[]) {
        super(id, ...children);

        this.registerEvent(EventKeys.ON_POINTER_EVENT, this.onPointerEvent.bind(this));
    }

    onDown(point: PointerPoint) {
        // console.log("onDown");
    }

    onUp(point: PointerPoint) {
        // console.log("onUp");
    }

    onLeave(point: PointerPoint) {
        // console.log("onLeave");

    }

    onEnter(point: PointerPoint) {
        // console.log("onEnter");

    }

    onMove(point: PointerPoint) {
        // console.log("onMove");
    }


    onPointerEvent(point: PointerPoint) {
        this.triggerThisPointerEvent(point);
        this.triggerChildrenPointerEvent(point.sub(this.position));
    }

    triggerThisPointerEvent(point: PointerPoint) {
        console.log("triggerThisPointerEvent");
        /**
         * If the pointer is in range of the element
         */
        if (this.pointerInRange(point)) {
            console.log("inRange");
            if (!this._pointerWasInRange) {
                this.onEnter(point);
            }
            this._pointerWasInRange = true;
            this.onMove(point);

            if (point.pressure !== 0 && !this._pressed) {
                this.onDown(point);
                this._pressed = true;
            }
            if (point.pressure === 0 && this._pressed) {
                this.onUp(point);
                this._pressed = false;
            }
        }
        /**
         * Not in range
         */
        else {
            // console.log(`Not in range of ${this}`);
            if (this._pointerWasInRange) {
                this.onLeave(point);
                this._pointerWasInRange = false;
            }
        }
    }

    triggerChildrenPointerEvent(point: PointerPoint) {
        for (let child of this.children) {
            if (child instanceof PointerHandlerParentElement) {
                child.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
            }
        }
    }


    private pointerInRange(point: PointerPoint) {


        if (point.x >= this.position.x && point.x <= this.absWidth) {

            if (point.y >= this.position.y && point.y <= this.absHeight) {
                return true;
            }
        }
        //
        return false;
    }
}
