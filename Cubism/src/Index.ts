import {Cubism} from "./Cubism";
import {DraggableRect} from "./Elements/DraggableRect";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {ButtonElement} from "./Elements/ButtonElement";
import {Colors} from "./Theme/Colors";
import {ColorTheme, CubismElementThemeRoot} from "./Theme/Theme";

console.log("loading Index.ts");


(() => {

    function main() {
        // this.createApp();
        let updateButton = document.getElementById("update") as HTMLButtonElement;
        updateButton.onclick = this.runUserFunction;

        let w = window as any;

        w.c = Cubism.createFromId("mainCanvas");
    }
})();



class Test {
    codeText: HTMLTextAreaElement;

    constructor() {
        console.log("Test");
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.getFunctionBody(this.initCode);
    }



    runUserFunction() {
        let codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        let userFunction = new Function(codeText.value).bind(this);
        Cubism.createFromId("mainCanvas").init(
            userFunction.call(this)
        );
        // userFunction();
    }
    getFunctionBody(func: Function): string {
        let funcString = func.toString();
        let start = funcString.indexOf("{") + 1;
        let end = funcString.lastIndexOf("}");
        return funcString.substring(start, end);
    }
    initCode() {
        return new VerticalLayout(
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
    }
}

new Test().main();