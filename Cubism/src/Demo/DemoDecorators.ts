import {StaticDemo} from "./StaticDemo";

/**
 * Decorator for demo functions
 * adds the function to the StaticDemo instance
 */
export function demoFunction(description: string = "[No description]") {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let demo = StaticDemo.i;
        let currFunction = target[propertyKey];



        // Add space before capital letters
        let name = propertyKey.replace(/([A-Z])/g, ' $1').trim();
        // name += "  ";
        // Capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1);
        // name = `[ ${name} ]`;

        demo.addDemoFunction(name, currFunction, description);
    };
}
