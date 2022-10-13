import {StaticDemo} from "./StaticDemo";

/**
 * Decorator for demo functions
 * adds the function to the StaticDemo instance
 */
export function demoFunction() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let demo = StaticDemo.i;
        let currFunction = target[propertyKey];
        demo.addDemoFunction(propertyKey, currFunction);
    };
}
