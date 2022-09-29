import {PointerPoint} from "../../datatypes/PointerPoint";
import {RectangleElement} from "./RectangleElement";

export class InteractiveElement extends RectangleElement{
    // ...
    private events: {[key: string]: Function} = {};

    setOn(event: string, callback: Function): void {
        this.events[event] = callback;
    }
    getOn(event: string): Function {
        return this.events[event];
    }

    public moveEvent(point:PointerPoint): void {
        this.onMove(point);
    }
    set onMove(callback: Function) {
        this.setOn("move", callback);
    }
    setOnMove(callback: Function): InteractiveElement {
        this.onMove = callback;
        return this;
    }
    get onMove(): Function {
        return this.getOn("move");
    }
}