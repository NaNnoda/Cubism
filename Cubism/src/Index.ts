import {Cubism} from "./Cubism";
import {DraggableRect} from "./Elements/DraggableRect";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ButtonElement} from "./Elements/ButtonElement";
import {Colors} from "./Theme/Colors";
import {ColorTheme, CubismElementThemeRoot} from "./Theme/Theme";

console.log("loading Index.ts");

console.log();

class Test {

    Cubism = Cubism;
    VerticalLayout = VerticalLayout;
    ButtonElement = ButtonElement;
    DraggableRect = DraggableRect;
    CubismElementThemeRoot = CubismElementThemeRoot;
    ColorTheme = ColorTheme;
    Colors = Colors;
    global

    codeText: HTMLTextAreaElement;

    constructor(global: any) {
        console.log("Test");
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.initFunctionToString();

        this.global = global;
        this.userFunction = this.getUserFunction();
    }

    userFunction: (e: any) => void;

    main() {
        let updateButton = document.getElementById("update") as HTMLButtonElement;
        updateButton.onclick = () => {
            console.log("update");
            this.updateUserFunction();
            this.runUserFunction();
        };
    }

    initFunctionToString() {

        let s = defaultInitCode.toString();
        // Remove the first and last line
        s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
        // Remove the first 4 spaces
        s = s.replace(/^ {4}/gm, "");
        // Add e. after new
        s = s.replace(/new /gm, "new e.");
        // Add e. before upper case and not after .
        s = s.replace(/([^\.])\b([A-Z][a-z]+)\b/gm, "$1e.$2");

        return s;
    }

    getUserFunction() {
        let code = this.codeText.value;
        console.log(`code: ${code}`);
        return new Function("e", code) as (e: any) => void;
    }

    updateUserFunction() {
        this.userFunction = this.getUserFunction();
    }

    runUserFunction() {
        this.userFunction(this);
    }
}

function defaultInitCode(e: any) {
    console.log(`exports is ${e}`)
    console.log(e)
    let c = Cubism.createFromId("mainCanvas");
    console.log(e.VerticalLayout);

    c.init(
        new VerticalLayout(
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setDefaultTheme(
                    new CubismElementThemeRoot(
                        new ColorTheme()
                            .setBorder(Colors.red200)
                            .setBackground(Colors.blue700)
                    )
                ),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100),
            new ButtonElement("Button")
                .setHeight(50)
                .setWidth(100)
        )
    )
}

function getCode(funcString: string) {
    return funcString.substring(funcString.indexOf("{") + 1, funcString.lastIndexOf("}"));
}

let test = new Test(this);
test.main();