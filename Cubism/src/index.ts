import {CubismCanvasManager} from "./ui/Cubism";
import {RectangleElement} from "./ui/elements/RectangleElement";
import {LayoutElement} from "./ui/elements/layouts/LayoutElement";
import {InteractiveElement} from "./ui/elements/InteractiveElement";
import {Point2D} from "./datatypes/point";
import {PointerPoint} from "./datatypes/PointerPoint";

console.log("loading index.ts");


/**
 * entry point
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = CubismCanvasManager.createFromCanvas(canvas);

    let interactive = new InteractiveElement()
        .setOnMove((point: PointerPoint) => {
            console.log("move", point);
        })
        .setWidth(100)
        .setHeight(100)
        .setBackgroundColor("green")
        .setPosFromXY(40, 40)

    canvas.onpointermove = (e) => {
        interactive.moveEvent(new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    }

    c.init(
        new LayoutElement(
            new RectangleElement()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("red")
                .setPosFromXY(0, 0),
            new RectangleElement()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("blue")
                .setPosFromXY(40, 40)
                .setLineWidth(5),
            interactive
        )
    )


}

/**
 * Initialize the game
 */
export function init() {
    console.log("init");
    // initConsole();
    // initCanvas();
    // initWindows();
}

//
// function initCanvas() {
//     // canvas.width = window.innerWidth;
//     // canvas.height = window.innerHeight;
//
//     canvas.addEventListener("pointermove", onMove, false);
//     canvas.addEventListener("pointerdown", onDown, false);
//     canvas.addEventListener("pointerup", onUp, false);
//     // return ctx;
// }
//
// function initWindows() {
//     rootWindow.addWindows
//     (
//         newWindow(500, 200)
//             .setTitle("Sub Window 1")
//             .setOffsetNum(50, 50)
//             .addWindows(
//                 new WindowScene(100, 100)
//                     .setTitle("Sub Window 2")
//                     .setOffsetNum(50, 50)
//             ),
//         newWindow(100, 200)
//             .setTitle("Sub Window 3")
//             .setOffsetX(600)
//     )
// }
//

main()
