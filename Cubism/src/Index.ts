import {InteractiveElement} from "./UI/Elements/InteractiveElement";
import {Point2D} from "./Datatypes/Point";
import {PointerPoint} from "./Datatypes/PointerPoint";
import {Cubism} from "./Cubism";
import {Log} from "./Debug/Log";
import {LayoutValues} from "./Constants/Constants";
import {InteractiveRect} from "./UI/Elements/InteractiveRect";
import {PointerHandleableLayout} from "./UI/Elements/Layouts/PointerHandleableLayout";
import {DraggableRect} from "./UI/Elements/DraggableRect";
import {VerticalLayout} from "./UI/Elements/Layouts/VerticalLayout";
import {HorizontalLayout} from "./UI/Elements/Layouts/HorizontalLayout";
import {ButtonElement} from "./UI/Elements/ButtonElement";
import {RectWithChild} from "./UI/Elements/RectWithChild";

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
        new HorizontalLayout(
            // new InteractiveRect()
            //     .setWidth(LayoutValues.MATCH_PARENT)
            //     .setHeight(LayoutValues.MATCH_PARENT)
            //     .setBackgroundColor("red")
            //     .setPosFromXY(0, 0),
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
                .setPosFromXY(80, 80)
                .setLineWidth(5),
            new ButtonElement("Button")
                .setHeight(50)
                .setWidth(100)
                .setPosFromXY(120, 120)
                .setLineWidth(5),
            new RectWithChild()
                .setHeight(200)
                .setWidth(200)
                .setPosFromXY(160, 160)
                .setLineWidth(5)
                .setBackgroundColor("yellow")
                .setChild(
                    new HorizontalLayout(
                        new DraggableRect()
                            .setWidth(100)
                            .setHeight(100)
                            .setBackgroundColor("blue")
                    )
                )
        )
    );
}

main()
