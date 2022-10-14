import {Cubism} from "../Cubism";
import {initConsole} from "../Debug/DebugConsole";
import PointerHandlerParentElement from "../Elements/Basic/PointerHanderParentElement";
import RecursiveRect from "../Elements/Fancy/RecursiveRect";
import {ChangingRainbowBackground} from "../Elements/Fancy/ChangingRainbowBackground";
import {Point2D} from "../Datatypes/Point";
import {demoFunction} from "./DemoDecorators";
import {EventKeys} from "../Constants/EventKeys";
import SizeKeys from "../Constants/SizeKeys";
import CanvasRecorder from "../CanvasRecorder";
import {PointerInteractThemeElement} from "../Elements/Basic/PointerInteractThemeElement";
import {VerticalLayout} from "../Elements/Layouts/VerticalLayout";
import {RectElement} from "../Elements/RectElement";
import {CircleElement} from "../Elements/CircleElement";
import {HorizontalLayout} from "../Elements/Layouts/HorizontalLayout";
import {Background} from "../Elements/Background";
import {Colors} from "../Constants/Colors";

console.log("loading DemoFunctions.ts");

class DemoFunctions {
    @demoFunction()
    testFunction() {
        console.log("demoFunction");
        console.log();
    }

    @demoFunction("This is a demo function")
    staticRecursiveRect() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(SizeKeys
                        .MATCH_PARENT, SizeKeys.MATCH_PARENT)
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
    }

    @demoFunction(
        "This is an animated recursive rectangle.",
        "Try to drag it around and see what happens."
    )
    animatedRecursiveRect() {
        let app = Cubism.createFromId("mainCanvas");

        app.init(
            new PointerHandlerParentElement(
                null,
                new ChangingRainbowBackground()
                    .setSizeFromXY(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT)
                    .setLightness(70).setSaturation(80)
                    .setChangingSpeed(0.1)
                ,
                new RecursiveRect()
                    .setWiggleStrength(2)
                    .setSizeFromXY(200, 200)
                    .setPosFromXY(100, 100)
                    .setRelativePosition(new Point2D(100, 100))
                    .setRecursionCount(10)
            ).setId("parent")
        )

        app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
            if (document.getElementById("fps") === null) {
                let fpsCounter = document.createElement("div");
                fpsCounter.id = "fps";
                document.getElementById("controlDiv")?.appendChild(fpsCounter);
            }
            document.getElementById("fps")!.innerHTML = "FPS: " + fps;
            //
            // StaticDemo.i.controlDiv.appendChild(fpsCounter);
            // fpsCounter.innerText = `FPS: ${fps}`;
            // console.log(fps);
        });
        app.initializer.initializeAlwaysRedraw(); // Redraw every frame, by default it only redraws when the elements change
        app.initializer.initializeFPSCounter(); // Show FPS
    }


    @demoFunction("Demo function for events")
    eventDemo() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                null,
                new PointerInteractThemeElement()
                    .setWidth(100).setHeight(100)
            )
        )
        app.initializer.initializeFPSCounter();
        app.eventSystem.registerEvent(EventKeys.FPS_UPDATE, (fps: number) => {
            // console.log(fps);
            if (document.getElementById("fps") === null) {
                let fpsCounter = document.createElement("div");
                fpsCounter.id = "fps";
                document.getElementById("controlDiv")?.appendChild(fpsCounter);
            }
            document.getElementById("fps")!.innerHTML = "FPS: " + fps;
        });
        app.initializer.initializeDrawsPerSecondCounter();
        app.eventSystem.registerEvent(EventKeys.DRAW_COUNT_UPDATE, (draws: number) => {
            // console.log(draws);
            if (document.getElementById("draws") === null) {
                let drawsCounter = document.createElement("div");
                drawsCounter.id = "draws";
                document.getElementById("controlDiv")?.appendChild(drawsCounter);
            }
            document.getElementById("draws")!.innerHTML = "DFS(Draws per second): " + draws;
        });
    }


    @demoFunction("Demo function for theme changing")
    themedElements() {
        let app = Cubism.createFromId("mainCanvas");
        app.init(
            new PointerHandlerParentElement(
                "PointerHandlerParentElement",
                new Background().setColor(Colors.blue700),
                new VerticalLayout("Outer Vertical Layout",
                    new RectElement()
                        .setWidth(100).setHeight(100),
                    new CircleElement()
                        .setWidth(100).setHeight(100),
                    new HorizontalLayout(
                        "Inner Horizontal Layout",
                        new RectElement()
                            .setWidth(100).setHeight(100),
                        new RectElement()
                            .setWidth(100).setHeight(100),
                        new CircleElement()
                            .setWidth(100).setHeight(100),
                    )
                ).setPosFromXY(50, 50)
            ).setPosFromXY(0, 0)
        )
    }

}

let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
let canvasRecorder: CanvasRecorder = new CanvasRecorder(canvas, 60);

function main() {
    initConsole();

}

main();
