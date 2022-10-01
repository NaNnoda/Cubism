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
import {TextElement} from "./UI/Elements/TextElement";
import {Colors} from "./Theme/Colors";

console.log("loading Index.ts");


/**
 * Demo of a simple layout
 */
function main() {
    let canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    let c = Cubism.createFromCanvas(canvas);
    c.init(
        new VerticalLayout(
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor(Colors.blue500),
            new DraggableRect()
                .setWidth(100)
                .setHeight(100)
                .setBackgroundColor(Colors.green200),
            new ButtonElement("Button")
                .setHeight(50)
                .setWidth(100)
        )
    );
}

main()
