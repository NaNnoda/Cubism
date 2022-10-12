import {Cubism} from "./Cubism";
import {ButtonElement} from "./Elements/ButtonElement";
import {initConsole} from "./Debug/Console";
import {EventKeys, LayoutValues, Values} from "./Constants/Constants";
import PointerHandlerParentElement from "./Elements/PointerHanderParentElement";
import RecursiveRect from "./Elements/Fancy/RecursiveRect";
import {ChangingRainbowBackground} from "./Elements/Fancy/ChangingRainbowBackground";


console.log("loading Index.ts");


class LiveDemo {
    codeText: HTMLTextAreaElement;

    constructor() {
        this.codeText = document.getElementById("codeText") as HTMLTextAreaElement;
        this.codeText.value = this.getFormattedFunctionString();
        this.userFunction = this.getUserFunction();
    }

    /**
     * Placeholder for the user function
     */
    userFunction() {
        // override this
    }

    main() {
        initConsole();
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
        new PointerHandlerParentElement(
            null,
            new ChangingRainbowBackground()
                .setSizeFromXY(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT)
                .setLightness(70).setSaturation(80)
            ,
            new RecursiveRect(10, 200, 200)
                .setPosFromXY(100, 100)
        )

    )
    app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
        let fpsCounter = document.getElementById("fpsCounter") as HTMLParagraphElement;
        fpsCounter.innerText = `FPS: ${fps}`;
    });
}

new LiveDemo().main();
