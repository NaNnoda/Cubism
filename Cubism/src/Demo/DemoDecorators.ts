import {StaticDemo} from "./StaticDemo";

export function demoFunction() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // descriptor.enumerable = value;
        let demo = StaticDemo.i;
        let currFunction = target[propertyKey];
        demo.addDemoFunction(propertyKey, currFunction);
        console.log("target is:" +target);
        console.log("propertyKey is:" +propertyKey);
        console.log(propertyKey);
        console.log(target[propertyKey]);
        console.log("descriptor is:" +descriptor);
        console.log(descriptor);
    };
}
