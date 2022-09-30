import {PointerPoint} from "../../datatypes/PointerPoint";
import {RectangleElement} from "./RectangleElement";

export class InteractiveElement extends RectangleElement {
    private events: { [key: string]: Function[] } = {};

    pushOn(event: string, ...callbacks: Function[]): void {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        }
        this.events[event].push(...callbacks);
    }

    getOn(event: string): Function[] {
        return this.events[event];
    }

    removeOn(event: string, callback: Function): void {
        this.events[event].splice(this.events[event].indexOf(callback), 1);
    }

    public triggerOnMove(point: PointerPoint): void {
        for (let callback of this.onMove) {
            callback(point);
        }
    }

    pushOnMove(...callbacks: Function[]): InteractiveElement {
        this.pushOn("move", ...callbacks);
        return this;
    }

    removeOnMove(callback: Function): void {
        this.removeOn("move", callback);
    }

    get onMove(): Function[] {
        return this.getOn("move");
    }
}