import {CubismBuilder} from "./CubismBuilder";
import {Cubism} from "./Cubism";
import {VerticalLayout} from "./Elements/Layouts/VerticalLayout";
import {DraggableRect} from "./Elements/DraggableRect";
import {ButtonElement} from "./Elements/ButtonElement";
import {GEventKeys} from "./Constants/Constants";


console.log("loading Index.ts");


class LiveDemo {
    builder: CubismBuilder
    codeText: HTMLTextAreaElement;

    constructor() {
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.initFunctionToString();
        this.builder = new CubismBuilder();
        this.userFunction = this.getUserFunction();
    }

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
        return new Function(code) as () => void;
    }

    updateUserFunction() {
        this.userFunction = this.getUserFunction();
    }

    runUserFunction() {
        this.userFunction();
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
                .pushOnUp(() => {
                    console.log("Button clicked");
                    console.log("app is ", app);

                    let v = app.getElementById("VerticalLayout") as VerticalLayout
                    console.log("v is ", v);
                    v.pushChildren(
                        new DraggableRect()
                            .setWidth(100)
                            .setHeight(100)
                    )
                })
        ).setId("VerticalLayout")
    )
}

new LiveDemo().main();