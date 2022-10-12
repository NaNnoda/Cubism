import {Cubism} from "../Cubism";
import {ButtonElement} from "../Elements/ButtonElement";
import {initConsole} from "../Debug/Console";
import {EventKeys, LayoutValues, Values} from "../Constants/Constants";
import PointerHandlerParentElement from "../Elements/PointerHanderParentElement";
import RecursiveRect from "../Elements/Fancy/RecursiveRect";
import {ChangingRainbowBackground} from "../Elements/Fancy/ChangingRainbowBackground";
import {Point2D} from "../Datatypes/Point";
import {demoFunction} from "./DemoDecorators";


console.log("loading Demo.ts");

class DemoFunctions {
    @demoFunction()
    d(target: any) {
        console.log("demoFunction");
        console.log(target);
    }

    @demoFunction()
    function2() {
        console.log("function2");

        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT)
                    .setLightness(70).setSaturation(80)
                    .setChangingSpeed(0.1)
                ,
                new RecursiveRect()
                    .setWiggleStrength(2)
                    .setSizeFromXY(200, 200)
                    .setPosFromXY(100, 100)
                    .setRelativePosition(new Point2D(100, 100))
                    .setRecursionCount(20)
            )
        )
        // app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
        //     let fpsCounter = document.getElementById("fpsCounter") as HTMLParagraphElement;
        //     fpsCounter.innerText = `FPS: ${fps}`;
        // });
        //
        // app.initializer.initializeAlwaysRedraw(); // Redraw every frame, by default it only redraws when the elements change
        // app.initializer.initializeFPSCounter(); // Show FPS
    }

    @demoFunction()
    defaultInitCode() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(LayoutValues.MATCH_PARENT, LayoutValues.MATCH_PARENT)
                    .setLightness(70).setSaturation(80)
                    .setChangingSpeed(0.1)
                ,
                new RecursiveRect()
                    .setWiggleStrength(2)
                    .setSizeFromXY(200, 200)
                    .setPosFromXY(100, 100)
                    .setRelativePosition(new Point2D(100, 100))
                    .setRecursionCount(10)
            )
        )
        app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
            let fpsCounter = document.getElementById("fpsCounter") as HTMLParagraphElement;
            fpsCounter.innerText = `FPS: ${fps}`;
        });

        app.initializer.initializeAlwaysRedraw(); // Redraw every frame, by default it only redraws when the elements change
        app.initializer.initializeFPSCounter(); // Show FPS
    }
}


function main() {
    initConsole();
}

main();
