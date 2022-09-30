export class CubismGlobalEventSystem{
    private _globalEventListeners: {[key: string]: Function[]} = {};
    constructor() {
    }
    registerGlobalEvent(event: string, callback: Function): void {
        if (this._globalEventListeners[event] === undefined) {
            this._globalEventListeners[event] = [];
        }
        this._globalEventListeners[event].push(callback);
    }
    unregisterGlobalEvent(event: string, callback: Function): void {
        this._globalEventListeners[event].splice(this._globalEventListeners[event].indexOf(callback), 1);
    }
    triggerGlobalEvent(event: string, ...args: any[]): void {
        this._globalEventListeners[event].forEach((callback) => {
            callback(...args);
        });
    }
}