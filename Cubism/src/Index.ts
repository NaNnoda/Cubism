import {CubismBuilder} from "./CubismBuilder";
import {Cubism} from "./Cubism";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {DraggableRect} from "./Elements/DraggableRect";
import {ButtonElement} from "./Elements/ButtonElement";

console.log("loading Index.ts");

class LiveDemo {
    builder: CubismBuilder
    environmentName = "b";
    codeText: HTMLTextAreaElement;

    constructor() {
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.initFunctionToString();
        this.builder = new CubismBuilder();
        this.userFunction = this.getUserFunction();
    }

    userFunction: (e: any) => void;

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

    initFunctionToString() {
        let s = defaultInitCode.toString();
        // Remove the first and last line
        s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
        // Remove first 2 spaces
        s = s.replace(/^ {2}/gm, "");
        // Replace dot with new line and dot
        // s = s.replace(/\./gm, ".\r");
        return s;
    }

    getUserFunction() {
        let code = this.codeText.value;
        // console.log(`code: ${code}`);
        return new Function(this.environmentName, code) as (e: any) => void;
    }

    updateUserFunction() {
        this.userFunction = this.getUserFunction();
    }

    runUserFunction() {
        this.userFunction(this.builder);
    }
}

function defaultInitCode() {
    let app = Cubism.createFromId("mainCanvas");
    app.init(
        new VerticalLayout(
            new DraggableRect()
                .setWidth(100)
                .setHeight(100),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100),
            new ButtonElement()
                .setText("Button")
                .setHeight(50)
                .setWidth(100)
        )
    )
}

new LiveDemo().main();