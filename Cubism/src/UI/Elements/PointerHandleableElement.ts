import {InteractiveElement} from "./InteractiveElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Values} from "../../Constants/Constants";

export class PointerHandleableElement extends InteractiveElement {
    pointerWasNotInRange: boolean = true;

    constructor() {
        super();
        this.pushOnParentMove((point: PointerPoint) => {
            this.onParentMove(point);
        });
        this.pushOnParentDown((point: PointerPoint) => {
            this.onParentDown(point);
        });
        this.pushOn(Values.ON_MOVE, (point: PointerPoint) => {
            this.onMove(point);
        });
        this.pushOn(Values.ON_PARENT_DOWN, (point: PointerPoint) => {
            this.onParentDown(point);
        });
        this.pushOn(Values.ON_DOWN, (point: PointerPoint) => {
            this.onDown(point);
        });
        this.pushOn(Values.ON_PARENT_UP, (point: PointerPoint) => {
            this.onParentUp(point);
        });
        this.pushOn(Values.ON_UP, (point: PointerPoint) => {
            this.onUp(point);
        });
        this.pushOn(Values.ON_ENTER, (point: PointerPoint) => {
            this.onEnter(point);
        });
        this.pushOn(Values.ON_LEAVE, (point: PointerPoint) => {
            this.onLeave(point);
        });
    }

    public triggerOnParentDown(point: PointerPoint): void {
        let e = this.getOn(Values.ON_PARENT_DOWN);
        for (let callback of e) {
            callback(point);
        }
    }

    public onParentDown(point: PointerPoint): void {
        if (this.inRange(point)) {
            this.triggerOnDown(point);
        }
    }

    public triggerOnParentUp(point: PointerPoint): void {
        let e = this.getOn(Values.ON_PARENT_UP);
        for (let callback of e) {
            callback(point);
        }
    }

    public onParentUp(point: PointerPoint): void {
        if (this.inRange(point)) {
            this.triggerOnUp(point);
        }
    }

    public triggerOnUp(point: PointerPoint): void {
        let e = this.getOn(Values.ON_UP);
        for (let callback of e) {
            callback(point);
        }
    }

    public onUp(point: PointerPoint): void {

    }

    public triggerOnDown(point: PointerPoint): void {
        let e = this.getOn(Values.ON_DOWN);
        for (let callback of e) {
            callback(point);
        }
    }

    public onDown(point: PointerPoint): void {

    }

    public triggerOnMove(point: PointerPoint): void {
        let e = this.getOn(Values.ON_MOVE);
        for (let callback of e) {
            callback(point);
        }
    }

    public onMove(point: PointerPoint): void {

    }

    public pushOnMove(...callbacks: Function[]): InteractiveElement {
        this.pushOn(Values.ON_MOVE, ...callbacks);
        return this;
    }

    public removeOnMove(callback: Function): void {
        this.removeOn(Values.ON_MOVE, callback);
    }

    public onParentMove(point: PointerPoint): void {
        if (this.inRange(point)) {
            this.triggerOnMove(point);
        }
        if (this.inRange(point) && this.pointerWasNotInRange) {
            this.pointerWasNotInRange = false;
            this.triggerOnEnter(point);
        }
        if (!this.inRange(point) && !this.pointerWasNotInRange) {
            this.pointerWasNotInRange = true;
            this.triggerOnLeave(point);
        }
    }

    pushOnParentMove(...callbacks: Function[]): InteractiveElement {
        this.pushOn(Values.ON_PARENT_MOVE, ...callbacks);
        return this;
    }

    triggerOnParentMove(point: PointerPoint): void {
        let e = this.getOn(Values.ON_PARENT_MOVE);
        for (let callback of e) {
            callback(point);
        }
    }

    inRange(point: PointerPoint): boolean {
        return point.x >= this.position.x &&
            point.x <= this.position.x + this.absWidth &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.absHeight;
    }

    public onEnter(point: PointerPoint): void {

    }

    triggerOnEnter(point: PointerPoint): void {
        let e = this.getOn(Values.ON_ENTER);
        for (let callback of e) {
            callback(point);
        }
    }

    private pushOnParentDown(...callbacks: Function[]): InteractiveElement {
        this.pushOn(Values.ON_PARENT_DOWN, ...callbacks);
        return this;
    }

    triggerOnLeave(point: PointerPoint): void {
        let e = this.getOn(Values.ON_LEAVE);
        for (let callback of e) {
            callback(point);
        }
    }

    onLeave(point: PointerPoint): void {

    }
}