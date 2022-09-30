import {Log} from "../debug/Log";

export class CubismGlobalEventSystem {
    private _globalEventListeners: { [key: string]: Function[] } = {};

    constructor() {
    }

    registerGlobalEvent(event: string, callback: Function): void {
        this.getEvent(event).push(callback);
    }

    unregisterGlobalEvent(event: string, callback: Function): void {
        this._globalEventListeners[event].splice(this._globalEventListeners[event].indexOf(callback), 1);
    }

    getEvent(event: string): Function[] {
        if (this._globalEventListeners[event] === undefined) {
            this._globalEventListeners[event] = [];
            this._globalEventListeners[event].push(() => {
                // Log.logDebug(`Event ${event} triggered`);
            });

        }
        return this._globalEventListeners[event];
    }

    triggerGlobalEvent(event: string, ...args: any[]): void {
        this.getEvent(event).forEach((callback) => {
            callback(...args);
        });
    }
}