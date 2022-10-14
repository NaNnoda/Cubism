import CubismPart from "./CubismPart";
import {Runtime} from "inspector";

export function needsRedrawAccessor(needsRedrawGet = false, needsRedrawSet = true) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (descriptor) {
            if (descriptor.set && needsRedrawSet) {
                console.log("descriptor.set is:");
                console.log(descriptor.set);
                let oldSet = descriptor.set;
                descriptor.set = function (value: any) {
                    oldSet.call(this, value);
                    setRedrawHelper(this);
                }
            }
            if (descriptor.get && needsRedrawGet) {
                let oldGet = descriptor.get;
                descriptor.get = function () {
                    setRedrawHelper(this);
                    return oldGet.call(this);
                }
            }
        }
    };
}

function setRedrawHelper(descriptor: any) {
    if (descriptor instanceof CubismPart) {
        if (descriptor._cubism) {
            descriptor._cubism.canvasDrawer.setRedraw(true);
        }
    } else {
        console.log("this is not a CubismPart");
        throw new Error("this is not a CubismPart");
    }
}