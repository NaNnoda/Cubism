import {PointerPoint} from "../../Datatypes/PointerPoint";

import {CubismElement} from "./CubismElement";

export class InteractiveElement extends CubismElement {
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
}