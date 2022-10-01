import {InteractiveElement} from "./InteractiveElement";
import {PointerHandleableElement} from "./PointerHandleableElement";
import {CanvasDrawer} from "../../CanvasDrawer";

export class TextElement extends PointerHandleableElement {
    constructor(public text: string) {
        super();
    }
    render() {
        super.render();
        let c = this.c as CanvasDrawer;
        let ctx = c.ctx;
        ctx.font = "30px Arial";

        c.translate(this.position);

        // ctx.fillText("width:" + ctx.measureText(this.text).width, 10, 50)
        let textWidth = ctx.measureText(this.text).width;
        let textHeight = 30;
        ctx.fillText(this.text, 0, textHeight);
        c.restoreTranslate();
    }
}