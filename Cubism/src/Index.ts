import {Cubism} from "./Cubism";
import {DraggableRect} from "./Elements/DraggableRect";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ButtonElement} from "./Elements/ButtonElement";
import {Colors} from "./Theme/Colors";
import {ColorTheme, CubismElementThemeRoot} from "./Theme/Theme";
import {CubismBuilder} from "./CubismBuilder";

console.log("loading Index.ts");

console.log();


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
        // Remove all the spaces
        s = s.replace(/  /g, "");

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

function defaultInitCode(b: CubismBuilder) {
    console.log(`Builder is ${b}`)
    b
        .c
        .createFromId("mainCanvas")
        .init(
        b.v(
            b.draggableRect
                .setWidth(100)
                .setHeight(100),
            b.draggableRect
                .setWidth(100)
                .setHeight(100),
            b.button
                .setText("Button")
                .setHeight(50)
                .setWidth(100)
        )
    )
}

new LiveDemo().main();