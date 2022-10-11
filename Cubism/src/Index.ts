import {CubismBuilder} from "./CubismBuilder";
import {Cubism} from "./Cubism";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {DraggableRect} from "./Elements/DraggableRect";
import {ButtonElement} from "./Elements/ButtonElement";
import {HorizontalLayout} from "./Elements/Layouts/HorizontalLayout";
import CubismParentElement from "./Elements/CubismParentElement";


console.log("loading Index.ts");


class LiveDemo {
    builder: CubismBuilder
    codeText: HTMLTextAreaElement;

    constructor() {
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.getFormattedFunctionString();
        this.builder = new CubismBuilder();
        this.userFunction = this.getUserFunction();
    }

    /**
     * Placeholder for the user function
     */
    userFunction() {
        // override this
    }

    main() {
        let updateButton = document.getElementById("update") as HTMLButtonElement;
        updateButton.onclick = this.updateCubism.bind(this);
        this.updateCubism();
    }

    updateCubism() {
        console.log("update");
        this.updateUserFunction();
        this.runUserFunction();
    }

    getFormattedFunctionString() {
        let s = defaultInitCode.toString();
        // Remove the first and last line
        s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
        // Remove first 2 spaces
        s = s.replace(/^ {2}/gm, "");
        return s;
    }

    getUserFunction() {
        let code = this.codeText.value;
        // console.log(`code: ${code}`);
        return new Function(code) as () => void;
    }

    updateUserFunction() {
        this.userFunction = this.getUserFunction();
    }

    runUserFunction() {
        this.userFunction();
    }
}

/**
 * Default user function
 */
function defaultInitCode() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
        new CubismParentElement(
            null,
            new DraggableRect()
                .setWidth(100)
                .setHeight(50)
        )
    )
}

new LiveDemo().main();