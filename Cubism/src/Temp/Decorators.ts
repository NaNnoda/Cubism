export function methodDecorator() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // descriptor.enumerable = value;
        console.log("methodDecorator(): called");
        console.log("target is:" +target);
        console.log("propertyKey is:" +propertyKey);
        console.log(propertyKey);
        console.log(target[propertyKey]);
        console.log("descriptor is:" +descriptor);
        console.log(descriptor);

    };
}



export function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log("classDecorator");
    console.log(constructor);
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}
