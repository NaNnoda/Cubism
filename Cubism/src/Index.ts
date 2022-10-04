import {Cubism} from "./Cubism";
import {DraggableRect} from "./Elements/DraggableRect";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ButtonElement} from "./Elements/ButtonElement";
import {Colors} from "./Theme/Colors";
import {ColorTheme, CubismElementThemeRoot} from "./Theme/Theme";
import {CubismBuilder} from "./CubismBuilder";
import {build} from "esbuild";


console.log("loading Index.ts");

console.log();


class LiveDemo {

    Cubism = Cubism;

    VerticalLayout = VerticalLayout;
    ButtonElement = ButtonElement;
    DraggableRect = DraggableRect;
    CubismElementThemeRoot = CubismElementThemeRoot;
    ColorTheme = ColorTheme;
    Colors = Colors;
    // global

    builder: CubismBuilder

     environmentName = "b";

    codeText: HTMLTextAreaElement;

    constructor(global: any) {
        console.log("Test");
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.initFunctionToString();
        this.builder = new CubismBuilder();
        // this.global = global;
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


        // s = s.replace(/([^\.])\b([A-Z][a-z]+)\b/gm, "$1e.$2");

        return s;
    }

    getUserFunction() {
        let code = this.codeText.value;
        console.log(`code: ${code}`);
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
    let c = b.cubism.createFromId("mainCanvas");
    c.init(
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

function getCode(funcString: string) {
    return funcString.substring(funcString.indexOf("{") + 1, funcString.lastIndexOf("}"));
}

let test = new LiveDemo(this);
test.main();