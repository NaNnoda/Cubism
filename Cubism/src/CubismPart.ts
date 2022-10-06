import IHasCubism from "./Interface/IGlobalHandler";
import {Cubism} from "./Cubism";

export default class CubismPart implements IHasCubism {
    _cubism: Cubism | null = null;
    get cubism(): Cubism {
        // console.log("getting cubism from " + this.className);
        if (this._cubism === null) {
            throw new Error(`Cubism is not set for ${this.className}`);
        }
        return this._cubism as Cubism;
    }

    set cubism(cubism: Cubism) {
        this._cubism = cubism;
        this.afterSetCubism(cubism);
    }

    afterSetCubism(cubism: Cubism) {
        // override this
    }

    get className(): string {
        return this.constructor.name;
    }
}