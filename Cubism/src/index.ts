import {CubismCanvasManager} from "./ui/Cubism";
import {RectangleElement} from "./ui/elements/RectangleElement";
import {LayoutElement} from "./ui/elements/layouts/LayoutElement";
import {InteractiveElement} from "./ui/elements/InteractiveElement";
import {Point2D} from "./datatypes/point";
import {PointerPoint} from "./datatypes/PointerPoint";

console.log("loading index.ts");


/**
 * Demo of a simple layout
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = CubismCanvasManager.createFromCanvas(canvas);

    let interactive = new InteractiveElement()
        .pushOnMove((point: PointerPoint) => {
            console.log("move" + point);
        })
        .setWidth(100)
        .setHeight(100)
        .setBackgroundColor("green")
        .setPosFromXY(40, 40);

    canvas.onpointermove = (e) => {
        interactive.triggerOnMove(new PointerPoint(e.offsetX, e.offsetY, e.pressure));
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
    );
}

main()
