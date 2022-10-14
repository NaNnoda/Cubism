import {Cubism} from "../Cubism";
import {initConsole} from "../Debug/DebugConsole";
import PointerHandlerParentElement from "../Elements/PointerHanderParentElement";
import RecursiveRect from "../Elements/Fancy/RecursiveRect";
import {ChangingRainbowBackground} from "../Elements/Fancy/ChangingRainbowBackground";
import {Point2D} from "../Datatypes/Point";
import {demoFunction} from "./DemoDecorators";
import {EventKeys} from "../Constants/EventKeys";
import SizeKeys from "../Constants/SizeKeys";
import CanvasRecorder from "../CanvasRecorder";

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
            console.log(fps);
        });
        app.initializer.initializeAlwaysRedraw(); // Redraw every frame, by default it only redraws when the elements change
        app.initializer.initializeFPSCounter(); // Show FPS
    }
}

let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
let canvasRecorder: CanvasRecorder = new CanvasRecorder(canvas, 30);

function main() {
    initConsole();
    let recordBtn = document.getElementById("recordBtn") as HTMLButtonElement;
    let recordText = "Start Recording";
    let stopText = "Stop";
    recordBtn.innerText = recordText;
    recordBtn.onclick = () => {
        if (canvasRecorder.isRecording) {
            canvasRecorder.stopRecording();
            recordBtn.innerText = recordText;
        } else {
            canvasRecorder.startRecording("canvasRecording");
            recordBtn.innerText = stopText;
        }
    }
}

main();