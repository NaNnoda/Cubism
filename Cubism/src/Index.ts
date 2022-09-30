import {InteractiveElement} from "./ui/elements/InteractiveElement";
import {Point2D} from "./datatypes/Point";
import {PointerPoint} from "./datatypes/PointerPoint";
import {Cubism} from "./ui/Cubism";
import {Log} from "./debug/Log";
import {LayoutValues} from "./constants/Constants";
import {InteractiveRect} from "./ui/elements/InteractiveRect";
import {PointerHandleableLayout} from "./ui/elements/layouts/PointerHandleableLayout";
import {DraggableRect} from "./ui/elements/DraggableRect";

console.log("loading Index.ts");


/**
 * Demo of a simple layout
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = Cubism.createFromCanvas(canvas);

    // let interactive = new InteractiveRect()
    //     .pushOnMove((point: PointerPoint) => {
    //         // Log.logDebug("onMove", point);
    //     })
    //     .setWidth(100)
    //     .setHeight(100)
    //     .setBackgroundColor("green")
    //     .setPosFromXY(40, 40);

    // canvas.onpointermove = (e) => {
    //     interactive.triggerOnMove(new PointerPoint(e.offsetX, e.offsetY, e.pressure));
    // }

    c.init(
        new PointerHandleableLayout(
            new InteractiveRect()
                .setWidth(LayoutValues.MATCH_PARENT)
                .setHeight(LayoutValues.MATCH_PARENT)
                .setBackgroundColor("red")
                .setPosFromXY(0, 0),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("blue")
                .setPosFromXY(40, 40)
                .setLineWidth(5),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor("green")
                .setPosFromXY(200, 200)
                .setLineWidth(5)
        )
    );
}

main()
