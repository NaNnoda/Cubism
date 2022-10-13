import CubismParentElement from "./CubismParentElement";
import {Point2D} from "../Datatypes/Point";
import {EventKeys} from "../Constants/EventKeys";
import {PointerPoint} from "../Datatypes/PointerPoint";
import {CubismElement} from "./CubismElement";

export default class PointerHandlerParentElement extends CubismParentElement {
    _dragPoint: PointerPoint | null = null;
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

    constructor(id: string | null = null, ...children: CubismElement[]) {
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

    onParentMove(point: PointerPoint) {

    }


    onPointerEvent(point: PointerPoint) {
        this.triggerThisPointerEvent(point);
        this.triggerChildrenPointerEvent(point.sub(this.position));
    }

    triggerThisPointerEvent(point: PointerPoint) {
        this.onParentMove(point);
        /**
         * If the pointer is in range of the element
         */
        if (this.pointerInRange(point)) {
            if (!this._pointerWasInRange) {
                this.onEnter(point);
            }
            this._pointerWasInRange = true;
            this.onMove(point);

            if (!point.pressed) {
                this.hovered = true;
            }

            if (point.pressed && !this.pressed) {
                this.onDown(point);
                this._dragPoint = point;
                this.pressed = true;
            }
            if (!point.pressed && this.pressed) {
                this.onUp(point);
                this._dragPoint = null;
                this.pressed = false;
            }
        }
        /**
         * Not in range
         */
        else {
            this.hovered = false;
            if (this._pointerWasInRange) {
                this.onLeave(point);
                this._pointerWasInRange = false;
            }
        }
    }

    triggerChildrenPointerEvent(point: PointerPoint) {
        if (this.pointerInRange(point)) {
            let childrenPointerPoint = point.sub(this.position);
            for (let child of this.children) {
                child.triggerEvent(EventKeys.ON_POINTER_EVENT, childrenPointerPoint);
            }
        }
    }

    /**
     * Checks if the pointer is in range of the element
     * @param point The pointer point
     */
    pointerInRange(point: Point2D): boolean {
        if (point.x >= this.position.x && point.x <= this.absWidth + this.position.x) {
            if (point.y >= this.position.y && point.y <= this.absHeight + this.position.y) {
                return true;
            }
        }
        return false;
    }
}
